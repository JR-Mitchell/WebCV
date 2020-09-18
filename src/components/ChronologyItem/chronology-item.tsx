//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Typography from '@material-ui/core/Typography';

/**
 * Props for the <ChronologyItem> component.
 * More detail is given in comments alongside prop type definitions.
 */
interface ChronologyItemProps {
    /**
     * The title of this item
     */
    title: string,
    /**
     * The date associated with this item
     */
    date: string,
    /**
     * The subtitle for this item
     */
    subtitle?: string,
    /**
     * Any children elements of the component
     */
    children?: React.ReactNode
}

/**
 * Basic <ChronologyItem> component.
 * Shows a top title with date, then a bold subtitle.
 */
function ChronologyItem(props: ChronologyItemProps) {
    return <div>
        <div style={{display:"flex"}}>
            <Typography variant='h6' component='span'>
                {props.title}
            </Typography>
            <Typography variant='overline' component='span' style={{marginLeft:"auto"}}>
                {props.date}
            </Typography>
        </div>
        <Typography>
            <b><i>{props.subtitle}</i></b>
        </Typography>
        {props.children}
    </div>
}

export default ChronologyItem;
