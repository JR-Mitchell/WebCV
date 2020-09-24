//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

//Imports from @material-ui/icons module
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import HttpIcon from '@material-ui/icons/Http';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

/**
 * Array for mapping ContactInfo props to elements
 */
export const contactInfoMap = [
    {name:"address",icon:HomeIcon},
    {name:"homephone",icon:PhoneIcon},
    {name:"mobile",icon:PhoneAndroidIcon},
    {name:"email",icon:EmailIcon,isLink:true},
    {name:"github",icon:GitHubIcon,isLink:true},
    {name:"linkedin",icon:LinkedInIcon,isLink:true},
    {name:"website",icon:HttpIcon,isLink:true}
]

/**
 * Props for the <ContactInfo> component.
 * More detail is given in comments alongside prop type definitions.
 */
export interface ContactInfoProps {
    /**
     * The avatar's source. If excluded, no avatar will be shown.
     * Is passed to the 'src' attribute of <Avatar>
     */
    avatarSrc?: string,
    /**
     * The avatar's alt text, if any.
     * Is passed to the 'alt' attribute of <Avatar>
     */
    avatarAlt?: string,
    /**
     * The size of the avatar in pixels. Defaults to 0 if left out.
     */
    avatarSize?: number,
    /**
     * The user's home address.
     * If excluded, no address will be shown.
     */
    address?: string,
    /**
     * The user's home phone number.
     * If excluded, no home phone number will be shown.
     */
    homephone?: string,
    /**
     * The user's mobile phone number.
     * If excluded, no mobile number will be shown.
     */
    mobile?: string,
    /**
     * The user's email address.
     * If excluded, no email address will be shown.
     * Will be rendered as a link.
     */
    email?: string,
    /**
     * URL of the user's GitHub profile/repos
     * If excluded, no GitHub link will be shown.
     * Will be rendered as a link.
     */
    github?: string,
    /**
     * URL of the user's personal website
     * If excluded, no website link will be shown.
     * Will be rendered as a link.
     */
    linkedin?: string,
    /**
     * URL of the user's LinkedIn account.
     * If excluded, no LinkedIn link will be shown.
     * Will be rendered as a link.
     */
    website?: string,
    /**
     * Any children elements of the component
     */
    children?: React.ReactNode
}

/**
 * Basic <ContactInfo> component.
 * Shows contact information, alongside an optional avatar.
 */
function ContactInfo(props: ContactInfoProps) {
    let avatarSize = props.avatarSize || 256;

    let avatar = props.avatarSrc && <Avatar
        alt={props.avatarAlt}
        src={props.avatarSrc}
        style={{width:avatarSize,height:avatarSize}} />

    return <div style={{display:"flex"}}>
        {avatar}
        <List dense>
            {contactInfoMap.map((item)=>{
                return props[item.name] && <ListItem key={item.name}>
                    <item.icon fontSize="small" style={{marginRight:16}}/>
                    <Typography>
                        {item.isLink ? <Link href={props[item.name]}>{props[item.name]}</Link> : props[item.name]}
                    </Typography>
                </ListItem>
            })}
        </List>
        {props.children}
    </div>
}

export default ContactInfo;
