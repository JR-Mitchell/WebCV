//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Box from '@material-ui/core/Box';

//Local component imports
import Drawer from 'components/NavigationDrawer/navigation-drawer';
import TitleBar from 'components/TitleBar/title-bar';

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
    /**
     * Constructor method
     *
     * @param {AppProps} props: the component props
     */
    constructor(props) {
        super(props);
        this.state = {drawerOpen:true};
    }

    /**
     * React render method
     */
    render() {
        //Access state variables
        const drawerOpen = this.state.drawerOpen;

        //Setup to ensure that the drawer smoothly pushes the body content across
        let bodyStyle = {
            transition: 'margin-left 225ms cubic-bezier(0, 0, 0.2, 1)',
            marginLeft: drawerOpen ? 256 : 0
        }

        return (
            <Box
                width="100%"
                height="100%"
            >
                <Drawer
                    open={drawerOpen}
                    width={this.props.drawerWidth}
                    closeDrawerCallback={()=>{this.toggleDrawer();}}
                />
                <div style={bodyStyle}>
                    <TitleBar
                        cvTitle={this.props.cvTitle}
                        sectionTitle="TODO: implement current section"
                        menuButtonCallback={()=>{this.toggleDrawer();}}
                    />
                </div>
            </Box>
        );
    }

    /**
     * Toggles the open state of the drawer
     */
    toggleDrawer() {
        const drawerOpen = this.state.drawerOpen;
        this.setState({drawerOpen:!drawerOpen});
    }
}

export default App;
