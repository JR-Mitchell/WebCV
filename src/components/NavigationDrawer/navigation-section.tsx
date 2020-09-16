//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

/**
 * Props for the <NavigationSectionList> component.
 * More detail is given in comments alongside prop type definitions.
 */
interface NavigationSectionListProps {
    /**
     * Whether or not the list should be visible.
     * Named 'in' rather than 'open' for consistency with material-ui's
     * <Collapse> element.
     * Toggling this will smoothly animate between open and closed states.
     */
    in: boolean,
    /**
     * The sections to be listed
     */
    sections: string[]
}

/**
 * Basic <NavigationSectionList> component.
 * Provides indented buttons for navigating the sections of the given
 * page, for use in the <NavigationDrawer> component.
 */
function NavigationSectionList(props) {
    return <Collapse in={props.in}>
        <List>
            {props.sections.map((title:string)=>{
                return <ListItem
                    button
                    style={{paddingLeft:32}}
                    key={title}
                >
                    <Typography variant="overline">
                        {title}
                    </Typography>
                </ListItem>
            })}
        </List>
    </Collapse>
}

export default NavigationSectionList;
