//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
//Note to self: why do material-ui capitalise Bar in one but not the other?
//Imported Toolbar as ToolBar here for consistency
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

//Imports from @material-ui/icons module
import MenuIcon from '@material-ui/icons/Menu';

/**
 * Props for the <TitleBar> component.
 * More detail is given in comments alongside prop type definitions.
 */
interface TitleBarProps {
    /**
     * Title of the CV
     */
    cvTitle: string,
    /**
     * Title of the currently active section
     */
    sectionTitle: string,
    /**
     * Callback to call when the 'toggle drawer' menu button is pressed
     */
    menuButtonCallback: ()=>void
}

/**
 * Basic <TitleBar> component.
 * Allows toggling of the navdrawer, as well as showing the CV title and name
 * of the currently active section
 */
function TitleBar(props: TitleBarProps) {
    return <AppBar position="sticky">
        <ToolBar>
            <IconButton onClick={() => {props.menuButtonCallback()}}>
                <MenuIcon />
            </IconButton>
            <Typography
                variant="h4"
                style={{flexGrow: 1, paddingRight: 48}}
                align="center"
            >
                {props.cvTitle}
            </Typography>
        </ToolBar>
        <Typography
            variant="h5"
            style={{flexGrow: 1}}
            align="center"
        >
            {props.sectionTitle}
        </Typography>
    </AppBar>
}

export default TitleBar
