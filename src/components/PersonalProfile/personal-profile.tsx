//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Typography from '@material-ui/core/Typography';

//Local imports
import ContactInfo from 'components/ContactInfo';
import { ContactInfoProps } from 'components/ContactInfo';
import TwoColumn from 'components/TwoColumn';

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

    let topSplitRatio = props.topSplitRatio || 0.5;
    let bottomSplitRatio = props.bottomSplitRatio || 0.5;

    return <TwoColumn splitRatio={[topSplitRatio,bottomSplitRatio]}>
        <>
            <Typography variant='h6'>{props.topLeft.title}</Typography>
            <ContactInfo {...contactProps} />
        </>
        <>
            <Typography variant='h6'>{props.topRight?.title}</Typography>
            <Typography>{props.topRight?.body}</Typography>
        </>
        <>
            <Typography variant='h6'>{props.bottomLeft?.title}</Typography>
            <Typography>{props.bottomLeft?.body}</Typography>
        </>
        <>
            <Typography variant='h6'>{props.bottomRight?.title}</Typography>
            <Typography>{props.bottomRight?.body}</Typography>
        </>
        {props.children}
    </TwoColumn>
}

export default PersonalProfile;
