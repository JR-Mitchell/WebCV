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

//Local imports
import { SectionObject, PageObject, Pages } from './structure';
import SectionList from './navigation-section';

//Setup imports
const pages = new Pages(require('setup/structure.json'));

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
    closeDrawerCallback: ()=>void
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
        this.state = {selectedPage:0};
    }

    /**
     * React render method
     */
    render() {
        //Access state variables
        const selectedPage: number = this.state.selectedPage;

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
                {pages.map((page,index)=>{
                    let pageTitle: string = page.pageTitle;
                    let isSelected: boolean = index === selectedPage;
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

}

export default NavigationDrawer;
