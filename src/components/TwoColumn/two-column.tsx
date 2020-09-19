//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Grid from '@material-ui/core/Grid';
import { GridSize } from '@material-ui/core/Grid';

/**
 * Props for the <TwoColumn> component
 * More detail is given in comments alongside prop type definitions.
 */
interface TwoColumnProps {
    /**
     * Child elements of the component. Will be split into two columns.
     */
    children?: React.ReactNode,
    /**
     * Approximate split ratio of the left column(s).
     * If given as a single number, will apply uniformly across rows.
     * If given as a number array, each element is the left column width for one row.
     */
    splitRatio?: number | number[]
}

/**
 * Basic <TwoColumn> component
 */
function TwoColumn(props: TwoColumnProps) {
    let childrenLen = React.Children.count(props.children);

    let children = childrenLen % 2 === 1
        ? React.Children.toArray(props.children).concat([""])
        : React.Children.toArray(props.children);

    let splitRatio = props.splitRatio || 0.5;

    let splitWidths = Array.isArray(splitRatio)
        ? splitRatio.map((ratio: number) => {
                return ratio >= 0 && ratio <= 1
                    ? Math.round(12*ratio)
                    : 6;
            })
        : Array(childrenLen).fill(Math.round(12*splitRatio));

    return <Grid container>
        {children?.map((child, index) => {
            let leftWidth = splitWidths[Math.floor(index/2)] || 6;
            let thisWidth: GridSize = index % 2 == 1
                ? 12 - leftWidth
                : leftWidth;

            return <Grid item xs={thisWidth} key={index}>
                {child}
            </Grid>
        })}
    </Grid>
}

export default TwoColumn;
