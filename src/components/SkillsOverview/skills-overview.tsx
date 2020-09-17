//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';

//Imports from @material-ui/icons module
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

/**
 * Interface for a skill item
 */
interface SkillItem {
    /**
     * The skill name
     */
    skillName: string,
    /**
     * Additional text to show on clicking the popdown arrow
     */
    additionalText?: string
}

/**
 * Interface for a skill category
 */
interface SkillCategory {
    /**
     * The name of the skill category
     */
    categoryName: string,
    /**
     * The skills in this category
     */
    skills: SkillItem[]
}

/**
 * Props for the <SkillsOverview> component.
 * More detail is given in comments alongside prop type definitions.
 */
interface SkillsOverviewProps {
    /**
     * Any children elements of the component
     */
    children?: React.ReactNode,
    /**
     * The skill categories
     */
    skillCategories: SkillCategory[]
}

/**
 * State for the <SkillsOverview> component.
 * More detail is given in comments alongside type definitions.
 */
interface SkillsOverviewState {
    /**
     * The element which the popover is tied to
     */
    popoverAnchor?: any,
    /**
     * The text for the popover element
     */
    popoverText?: string
}

/**
 * Basic <SkillsOverview> component.
 * Shows the skills that the user has in particular categories
 */
class SkillsOverview extends React.Component<SkillsOverviewProps,SkillsOverviewState> {
    /**
     * Constructor method
     *
     * @param {SkillsOverviewProps} props: the component props
     */
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {popoverText:"Testing"};
    }

    /**
     * Creates a <Chip> component for a particular skill
     *
     * @param {SkillItem} skill: the skill to create a component for
     */
    skillChipItem(skill: SkillItem) {
        let additionalProps = skill.additionalText
            ? {
                deleteIcon:<KeyboardArrowDownIcon />,
                onDelete:(event)=>{this.setPopover(event.currentTarget.parentElement,skill.additionalText);}
              }
            : {}
        return  <Chip
            key={skill.skillName}
            label={skill.skillName}
            style={{margin:4}}
            variant="outlined"
            {...additionalProps}
        />

    }

    /**
     * Creates a <ListItem> component for a particular skill category
     *
     * @param {SkillCategory} category: the category to create a component for
     */
    categoryListItem(category: SkillCategory) {
        return  <ListItem key={category.categoryName}>
            <Typography>{category.categoryName}</Typography>
            <Divider style={{margin:4}} orientation="vertical" flexItem />
            {category.skills.map((skill: SkillItem)=>{
                return this.skillChipItem(skill);
            })}
        </ListItem>
    }

    render() {
        //Access state variables
        let popoverAnchor = this.state.popoverAnchor;
        let popoverText = this.state.popoverText;

        //Generate popover, if necessary
        let popover = popoverAnchor && <Popover
            open={true}
            anchorEl={popoverAnchor}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            onClose={()=>{this.setPopover(null);}}
        >
            <Typography style={{padding:4}}>
                {popoverText}
            </Typography>
        </Popover>

        return <List>
            {popover}
            {this.props.skillCategories.map((category:SkillCategory)=>{
                return this.categoryListItem(category);
            })}
        </List>
    }

    setPopover(anchor: any, text?: string) {
        this.setState({popoverAnchor: anchor, popoverText: text});
    }
}

export default SkillsOverview;
