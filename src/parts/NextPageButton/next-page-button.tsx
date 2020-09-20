//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Button from '@material-ui/core/Button';

//Imports from @material-ui/icons module
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

/**
 * Props for the <NextPageButton> component.
 * More detail is given in comments alongside prop type definitions.
 */
interface NextPageButtonProps {
    /**
     * The function to call when the button is clicked
     */
    onClickCallback: ()=>void
}

/**
 * Basic <NextPageButton> component.
 * Moves to the start of the next page.
 */
function NextPageButton(props: NextPageButtonProps) {
    return <div style={{display: "flex"}}>
        <Button
            variant="contained"
            color="secondary"
            endIcon={<NavigateNextIcon />}
            size="large"
            onClick={()=>{props.onClickCallback();}}
            style={{flexGrow:1}}
        >
            Next page!
        </Button>
    </div>
}

export default NextPageButton
