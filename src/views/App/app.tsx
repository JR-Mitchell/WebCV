//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Box from '@material-ui/core/Box';

//Local component imports
import Drawer from 'components/NavigationDrawer/navigation-drawer'

/**
 * Props for the <App> component.
 * More detail is given in comments alongside prop type definitions.
 */
interface AppProps {
    /**
     * Width of the drawer, in px
     */
    drawerWidth: number
}

/**
 * State for the <App> component.
 * More detail is given in comments alongside type definitions.
 */
interface AppState {
    /**
     * Whether or not the navigational drawer should be open/visible.
     */
    drawerOpen: boolean
}

/**
 * Basic <App> component for CV.
 * Provides the full CV frontend experience:
 * - a title bar with the CV title, section name and navdraw toggle button
 * - a side navigation drawer (navdraw) allowing easy section / page access
 * - a main section for each page of the CV to be rendered in
 */
class App extends React.Component<AppProps,AppState> {
    constructor(props) {
        super(props);
        this.state = {drawerOpen:true};
    }

    render() {
        return (
            <Box
                width="100%"
                height="100%"
            >
                <Drawer open={this.state.drawerOpen} width={this.props.drawerWidth}/>
            </Box>
        );
    }
}

export default App;
