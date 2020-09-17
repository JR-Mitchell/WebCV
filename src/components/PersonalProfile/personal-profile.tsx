//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { GridSize } from '@material-ui/core/Grid';

//Local imports
import ContactInfo from 'components/ContactInfo';
import { ContactInfoProps } from 'components/ContactInfo';

/**
 * Interface with info about any of the three non-contact-info quadrants
 */
interface Quadrant {
    title?: string,
    body: string
}

/**
 * Interface with info about the contact info quadrant
 */
interface TopLeftQuadrant extends ContactInfoProps {
    title?: string
}

/**
 * Props for the <PersonalProfile> component.
 * More detail is given in comments alongside prop type definitions.
 */
interface PersonalProfileProps {
    /**
     * Info to render the ContactInfo section
     */
    topLeft: TopLeftQuadrant;
    /**
     * Text to render to the right of the ContactInfo section
     */
    topRight?: Quadrant,
    /**
     * Text to render below & to the left of the ContactInfo section
     */
    bottomLeft?: Quadrant,
    /**
     * Text to render below & to the right of the ContactInfo section
     */
    bottomRight?: Quadrant,
    /**
     * Approximate split ratio of the top left element. Defaults to 0.5
     */
    topSplitRatio?: number,
    /**
     * Approximate split ratio of the bottom left element. Defaults to 0.5
     */
    bottomSplitRatio?: number,
    /**
     * Any children elements of the component
     */
    children?: React.ReactNode
}

/**
 * Basic <PersonalProfile> component.
 * Shows contact information, alongside an optional avatar, and three text areas.
 */
function PersonalProfile(props: PersonalProfileProps) {
    let {title, ...contactProps} = props.topLeft;

    let topLeftWidth = props.topSplitRatio
        ? (props.topSplitRatio >= 0 && props.topSplitRatio <= 1 ? Math.round(12*props.topSplitRatio) : 6)
        : 6;

    let bottomLeftWidth = props.bottomSplitRatio
        ? (props.bottomSplitRatio >= 0 && props.bottomSplitRatio <= 1 ? Math.round(12*props.bottomSplitRatio) : 6)
        : 6;

    return <Grid container>
        <Grid item xs={topLeftWidth as GridSize}>
            <Typography variant='h6'>{props.topLeft.title}</Typography>
            <ContactInfo {...contactProps} />
        </Grid>
        <Grid item xs={12-topLeftWidth as GridSize}>
            <Typography variant='h6'>{props.topRight?.title}</Typography>
            <Typography>{props.topRight?.body}</Typography>
        </Grid>
        <Grid item xs={bottomLeftWidth as GridSize}>
            <Typography variant='h6'>{props.bottomLeft?.title}</Typography>
            <Typography>{props.bottomLeft?.body}</Typography>
        </Grid>
        <Grid item xs={12-bottomLeftWidth as GridSize}>
            <Typography variant='h6'>{props.bottomRight?.title}</Typography>
            <Typography>{props.bottomRight?.body}</Typography>
        </Grid>
        {props.children}
    </Grid>
}

export default PersonalProfile;
