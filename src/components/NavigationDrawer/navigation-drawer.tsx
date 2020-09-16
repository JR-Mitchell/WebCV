//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Drawer from '@material-ui/core/Drawer'

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
    width: number
}

/**
 * State for the <NavigationDrawer> component.
 * More detail is given in comments alongside the definitions.
 */
interface NavigationDrawerState {
}


/**
 * Basic <NavigationDrawer> component.
 * Provides a toggleable drawer from the left side of the screen which shows
 * all visible pages and sections, allowing easy navigation, and uses
 * react-scroll to track the currently viewed section or allow scrolling to
 * different sections.
 */
class NavigationDrawer extends React.Component<NavigationDrawerProps,NavigationDrawerState> {
    render() {
        return <Drawer open={this.props.open} style={{width:this.props.width}}/>
    }
}

export default NavigationDrawer;
