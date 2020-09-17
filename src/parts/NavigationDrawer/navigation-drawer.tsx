//Imports from React module
import React from 'react';
import { Fragment } from 'react';

//Imports from @material-ui/core module
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

//Imports from @material-ui/icons module
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

//Local components import
import SectionList from './navigation-section';

//Other local imports
import { Pages } from 'views/App/structure';

/**
 * Props for the <NavigationDrawer> component.
 * More detail is given in comments alongside prop type definitions.
 */
interface NavigationDrawerProps {
    /**
     * Whether or not the drawer should be open/visible.
     * Toggling this will smoothly animate between open and closed states.
     */
    open: boolean,
    /**
     * Width of the drawer
     */
    width: number,
    /**
     * Callback to call when the 'close drawer' chevron button is pressed
     */
    closeDrawerCallback: ()=>void,
    /**
     * Pages object representing the CV's pages
     */
    pages: Pages,
    /**
     * Index of the active CV page
     */
    activePage: number,
    /**
     * Callback to call when a section outside of the current page is selected
     */
    sectionRedirectCallback: (pageIndex: number, sectionIndex: number) => void
}

/**
 * State for the <NavigationDrawer> component.
 * More detail is given in comments alongside the definitions.
 */
interface NavigationDrawerState {
    /**
     * The index of the currently selected page
     */
    selectedPage: number
    /**
     * The index of the currently selected section
     */
    selectedSection: number
}


/**
 * Basic <NavigationDrawer> component.
 * Provides a toggleable drawer from the left side of the screen which shows
 * all visible pages and sections, allowing easy navigation, and uses
 * react-scroll to track the currently viewed section or allow scrolling to
 * different sections.
 */
class NavigationDrawer extends React.Component<NavigationDrawerProps,NavigationDrawerState> {
    /**
     * Constructor method
     *
     * @param {NavigationDrawerProps} props: the component props
     */
    constructor(props) {
        super(props);
        this.state = {selectedPage: 0, selectedSection: 0};
    }

    /**
     * React componentDidUpdate method
     *
     * Used to check if the active page has changed and thus should be selected
     */
    componentDidUpdate(newProps) {
        const oldActive = this.props.activePage;
        if (oldActive !== newProps.activePage) {
            this.setSelectedPage(oldActive);
        }
    }

    /**
     * React render method
     */
    render() {
        //Access state variables
        const selectedPage: number = this.state.selectedPage;
        const selectedSection: number = this.state.selectedSection;

        return <Drawer
            variant="persistent"
            open={this.props.open}
            style={{width:this.props.width}}
            PaperProps={{style:{width:this.props.width}}}
        >
            <div style={{display:'flex', justifyContent: 'flex-end'}}>
                <IconButton onClick={()=>{this.props.closeDrawerCallback();}}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <List>
                {this.props.pages.map((page,index)=>{
                    let pageTitle: string = page.pageTitle;
                    let isSelected: boolean = index === selectedPage;
                    let isActive: boolean = index === this.props.activePage;
                    return <Fragment key={pageTitle}>
                        <ListItem
                            button
                            onClick={()=>this.setSelectedPage(index)}
                            selected={isSelected}
                        >
                            <Typography variant={isSelected ? "button" : "overline"}>
                                {pageTitle}
                            </Typography>
                        </ListItem>
                        <SectionList
                            in={isSelected}
                            sections={page.getSectionTitleList()}
                            isActive={isActive}
                            selectedSection={isActive ? selectedSection : -1}
                            clickCallback={
                                isActive
                                ? (sectionIndex: number)=>{this.setSelectedSection(sectionIndex);}
                                : (sectionIndex: number)=>{this.props.sectionRedirectCallback(index,sectionIndex);}
                            }
                        />
                    </Fragment>
                })}
            </List>
        </Drawer>
    }

    /**
     * Sets the index of the selected page
     */
    setSelectedPage(index:number) {
        this.setState({selectedPage:index});
    }

    /**
     * Sets the index of the selected section
     */
    setSelectedSection(index:number) {
        this.setState({selectedSection:index});
    }

}

export default NavigationDrawer;
