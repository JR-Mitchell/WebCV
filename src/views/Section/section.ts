//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Typography from '@material-ui/core/Typography';

//Local component imports
import DefaultSection from 'components/DefaultSection/default-section';

//Lookup table
const elements = {
    default: DefaultSection
}

type SectionChild = string | SectionProps;

/**
 * Props for the <Section> component.
 * More detail is given in comments alongside prop type definitions.
 */
interface SectionProps {
    /**
     * The name of the element to render in the lookup table
     */
    element?: string,
    /**
     * The props to pass to this element
     */
    props?: object,
    /**
     * The children, if any, to render inside this element
     */
    children?: SectionChild[]
}

/**
 * Basic <Section> component
 */
function Section(props: SectionProps) {
    let element = elements[props.element] || DefaultSection;
    let elementProps = props.props || {};
    let elementChildren = props.children
        ? props.children.map((child: SectionChild, index: number) => {
            switch(typeof(child)) {
                case "string":
                    return React.createElement(Typography,{key:index},child);
                default:
                    return React.createElement(Section,Object.assign(child,{key:index}));
            }
          })
        : []
    return React.createElement(element,elementProps,elementChildren);
}

export { SectionProps };

export default Section;