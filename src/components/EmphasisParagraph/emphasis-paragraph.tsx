//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Typography from '@material-ui/core/Typography';

/**
 * Props for the <EmphasisParagraph> component.
 * More detail is given in comments alongside prop type definitions.
 */
interface EmphasisParagraphProps {
    /**
     * The paragraph's text
     */
    text: string,
    /**
     * Any words or phrases to emphasise
     */
    emphasise?: string[],
    /**
     * Any children elements of the component
     */
    children?: React.ReactNode
}

/**
 * Basic <EmphasisParagraph> component.
 * A paragraph of text, with all words in props.emphasise emphasised.
 */
function EmphasisParagraph(props: EmphasisParagraphProps) {
    //Enforce lower case matches
    let emphasise = props.emphasise?.map((item)=>{
        return item.toLowerCase();
    });

    let text: any = props.text;
    let formatted: React.ReactNode;
    if (emphasise?.length > 0) {
        const regexp = new RegExp("("+emphasise.join("|")+"|.)","ig");
        text = Array.from(text.matchAll(regexp)).map((match,index) => {
            return emphasise.includes(match[0].toLowerCase())
                ? <b key={index}><i>{match[0]}</i></b>
                : match[0]
        });
    }
    return <Typography>
        {text}
    </Typography>
}

export default EmphasisParagraph;
