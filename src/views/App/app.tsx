//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

//Imports from @material-ui/core/styles module
import { createMuiTheme, ThemeProvider, ThemeOptions } from '@material-ui/core/styles';

//Imports from react-scroll
import { Element, scroller } from 'react-scroll'

//Local component imports
import NextPageButton from 'components/NextPageButton';

//Local part imports
import Drawer from 'parts/NavigationDrawer';
import TitleBar from 'parts/TitleBar';
import BodySection from 'parts/Section';

//Other local imports
import { Pages } from './structure';

//Setup imports
const pages = new Pages(require('setup/structure.json'));
const style = require('setup/style.json');

//Set default theme up
const theme = createMuiTheme(style.MUITheme || {} as ThemeOptions);

//Set up valid body elements


/**
 * Props for the <App> component.
 * More detail is given in comments alongside prop type definitions.
 */
interface AppProps {
    /**
     * Width of the drawer, in px
     */
    drawerWidth: number,
    /**
     * Title of the CV
     */
    cvTitle: string
}

/**
 * State for the <App> component.
 * More detail is given in comments alongside type definitions.
 */
interface AppState {
    /**
     * Whether or not the navigational drawer should be open/visible.
     */
    drawerOpen: boolean,
    /**
     * The index of the currently active page
     */
    activePage: number,
    /**
     * The title of the section to scroll to if a new page has just been switched to.
     * Is used in this.componentDidUpdate() and then set to undefined
     */
    sectionToScrollTo?: string
}

/**
 * Basic <App> component for CV.
 * Provides the full CV frontend experience:
 * - a title bar with the CV title, section name and navdraw toggle button
 * - a side navigation drawer (navdraw) allowing easy section / page access
 * - a main section for each page of the CV to be rendered in
 */
class App extends React.Component<AppProps,AppState> {
    /**
     * Constructor method
     *
     * @param {AppProps} props: the component props
     */
    constructor(props) {
        super(props);
        this.state = {drawerOpen: true, activePage: 0};
    }

    /**
     * React componentDidMount method
     * Scrolls to the first section in the page, if one exists
     */
    componentDidMount() {
        this.setActivePage(0,0);
    }

    /**
     * React componentDidUpdate method
     * If a new page has been loaded, scrolls to sectionToScrollTo
     */
    componentDidUpdate() {
        const sectionToScrollTo = this.state.sectionToScrollTo;
        if (sectionToScrollTo) {
            scroller.scrollTo(
                sectionToScrollTo,
                {
                    duration: 500,
                    offset: -96,
                    smooth: true
                }
            );
            this.setState({sectionToScrollTo: null});
        }
    }

    /**
     * React render method
     */
    render() {
        //Access state variables
        const drawerOpen = this.state.drawerOpen;
        const activePage = this.state.activePage;

        //Work out active page title
        const activeTitle = pages.getPageByIndex(activePage)?.pageTitle;

        //Setup to ensure that the drawer smoothly pushes the body content across
        let bodyStyle = {
            transition: 'margin-left 225ms cubic-bezier(0, 0, 0.2, 1)',
            marginLeft: drawerOpen ? 256 : 0
        }

        //Create next page button only if not the last page
        let nextPageButton = pages.getPageByIndex(activePage+1) && <NextPageButton onClickCallback={()=>{this.setActivePage(activePage+1);}} />

        return (
            <ThemeProvider theme={theme}>
            <Box
                width="100%"
                height="100%"
            >
                <Drawer
                    open={drawerOpen}
                    width={this.props.drawerWidth}
                    closeDrawerCallback={()=>{this.toggleDrawer();}}
                    pages={pages}
                    activePage={activePage}
                    sectionRedirectCallback={(pageIndex: number, sectionIndex: number) => {this.setActivePage(pageIndex,sectionIndex);}}
                />
                <div style={bodyStyle}>
                    <TitleBar
                        cvTitle={this.props.cvTitle}
                        sectionTitle={activeTitle}
                        menuButtonCallback={()=>{this.toggleDrawer();}}
                    />
                    <Container>
                        {pages.getPageByIndex(activePage).map((section) => {
                            let sectionTitle: string = section.sectionTitle;
                            return <Element
                                name={sectionTitle}
                                label={sectionTitle}
                                key={sectionTitle}
                            >
                                <Box>
                                    <Typography variant='h5'>
                                        {sectionTitle}
                                    </Typography>
                                    <BodySection {...section.element}/>
                                </Box>
                            </Element>
                        })}
                        {nextPageButton}
                    </Container>
                </div>
            </Box>
            </ThemeProvider>
        );
    }

    /**
     * Toggles the open state of the drawer
     */
    toggleDrawer() {
        const drawerOpen = this.state.drawerOpen;
        this.setState({drawerOpen:!drawerOpen});
    }

    /**
     * Sets the active page by page index, scrolling to the given section if
     * one is provided, or to the first section otherwise
     *
     * @param {number} pageIndex: the index of the page to open
     * @param {number} sectionIndex: the section of the page to autoscroll to,
     *      optional (defaults to 0)
     */
    setActivePage(pageIndex: number, sectionIndex: number = 0) {
        let sectionTitle = pages.getPageByIndex(pageIndex)
            ?.getSectionByIndex(sectionIndex)
            ?.sectionTitle;
        this.setState({activePage: pageIndex, sectionToScrollTo: sectionTitle});
    }
}

export { App, AppProps };
