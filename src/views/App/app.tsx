//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Box from '@material-ui/core/Box';

//Local component imports
import Drawer from 'components/NavigationDrawer/navigation-drawer'

/**
 * Basic <App> component for frontend
 */
class App extends React.Component<{},{}> {
    render() {
        return (
            <Box
                width="100%"
                height="100%"
            >
                <Drawer />
            </Box>
        );
    }
}

export default App;
