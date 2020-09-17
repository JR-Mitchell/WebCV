//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

//Imports from react-scroll module
import { Link } from 'react-scroll';

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
     * Whether the page is the currently active page
     */
    isActive: boolean,
    /**
     * The sections to be listed
     */
    sections: string[],
    /**
     * The index of the section which is selected
     */
    selectedSection: number,
    /**
     * The function to be called upon pressing a list item (if the current
     * section is not active) or upon scrolling to a section (if the current
     * section is active)
     */
    clickCallback: (sectionIndex: number) => void
}

/**
 * Basic <NavigationSectionList> component.
 * Provides indented buttons for navigating the sections of the given
 * page, for use in the <NavigationDrawer> component.
 */
function NavigationSectionList(props: NavigationSectionListProps) {
    return <Collapse in={props.in}>
        <List>
            {props.sections.map((title, index)=>{
                let additionalProps = props.isActive
                    ? {
                        component: Link,
                        to: title,
                        spy: true,
                        smooth: true,
                        onSetActive: () => {props.clickCallback(index);},
                        offset: -96,
                        duration: 500
                      }
                    : {
                        onClick: () => {props.clickCallback(index);}
                      };
                return <ListItem
                    button
                    style={{paddingLeft:32}}
                    key={title}
                    {...additionalProps}
                >
                    <Typography variant={index === props.selectedSection ? "button" : "overline"}>
                        {title}
                    </Typography>
                </ListItem>
            })}
        </List>
    </Collapse>
}

export default NavigationSectionList;
