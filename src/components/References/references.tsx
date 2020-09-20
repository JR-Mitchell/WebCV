//Imports from React module
import React from 'react';

//Imports from @material-ui/core module
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Link from '@material-ui/core/Link';

//Imports from @material-ui/icons module
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

//Imports from react-scroll module
import { Element, scroller } from 'react-scroll';

//Local imports
import TwoColumn from 'components/TwoColumn';
import { ContactInfoProps, contactInfoMap } from 'components/ContactInfo';

const doubleContactInfoMap = contactInfoMap.reduce((acc,item) => {return acc.concat([item,item]);}, []);

/**
 * Props for the <References> component
 * More detail is given in comments alongside prop type definitions.
 */
interface ReferencesProps {
    /**
     * Text to show directly below section title, before references
     */
    belowTitleText?: string,
    /**
     * Array of information to show for the first reference
     */
    firstRef: string[],
    /**
     * Contact details to show for the first reference
     */
    firstContact?: ContactInfoProps,
    /**
     * Array of information to show for the second reference
     */
    secondRef: string[],
    /**
     * Contact details to show for the second reference
     */
    secondContact?: ContactInfoProps
}

/**
 * State for the <References> component
 * More detail is given in comments alongside type definitions.
 */
interface ReferencesState {
    /**
     * The number of the column that is open
     */
    openColumn: number,
    /**
     * Whether the extra info should be shown
     */
    showInfo: boolean,
    /**
     * Reference string for scrolling to the element
     */
    refString: string,
    /**
     * Whether to scroll down to the buttons
     */
    doScroll: boolean
}

/**
 * Basic <References> component
 */
class References extends React.Component<ReferencesProps,ReferencesState> {
    constructor(props) {
        super(props);
        this.state = {
            openColumn: -1,
            refString: "refButton"+Math.random().toString(36).substring(7),
            doScroll: false,
            showInfo: false
        };
    }

    componentDidUpdate() {
        let doScroll = this.state.doScroll;
        let refString = this.state.refString;
        if (doScroll) {
            scroller.scrollTo(
                refString,
                {
                    duration: 500,
                    smooth: true
                }
            )
            this.setState({doScroll:false});
        }
    }

    render() {
        let openColumn = this.state.openColumn;
        let refString = this.state.refString;
        let showInfo = this.state.showInfo;

        let interleavedRefInfo = this.props.firstRef.length >= this.props.secondRef.length
            ? this.props.firstRef.map((first,index) => {
                    return [first,this.props.secondRef[index]];
                }).reduce((first,second)=>{return first.concat(second);})
            : this.props.secondRef.map((second,index) => {
                    return [this.props.firstRef[index],second];
                }).reduce((first,second)=>{return first.concat(second)});

        return <div>
            <Typography>{this.props.belowTitleText}</Typography>
            {this.props.belowTitleText && <br />}
            <TwoColumn>
                <Button
                    variant="contained"
                    style={{width:"100%"}}
                    onClick={()=>{this.open(0);}}
                    endIcon={showInfo && openColumn === 0 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                >
                    {this.props.firstRef[0]}<Element name={refString} />
                </Button>
                <Button
                    variant="contained"
                    style={{width:"100%"}}
                    onClick={()=>{this.open(1);}}
                    endIcon={showInfo && openColumn === 1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                >
                    {this.props.secondRef[0]}
                </Button>
            </TwoColumn>
            <Collapse in={showInfo}>
                <TwoColumn>
                    {interleavedRefInfo.map((item,index)=>{
                        return <Typography key={index}>{openColumn === index % 2 && item}</Typography>
                    })}
                    {doubleContactInfoMap.map((item,index)=>{
                        let value = index % 2 === 0
                            ? openColumn === 0 && this.props.firstContact?.[item.name]
                            : openColumn === 1 && this.props.secondContact?.[item.name];
                        if (value) {
                            return <div
                                key={item.name+(index%2).toString()}
                                style={{display:"flex",alignItems:"center"}}
                            >
                                <item.icon fontSize="small" style={{marginRight:16}} />
                                <Typography component="span">
                                    {item.isLink ? <Link href={value}>{value}</Link>: value}
                                </Typography>
                            </div>
                        } else {
                            return <div key={item.name+(index%2).toString()} />
                        }
                    })}
                </TwoColumn>
            </Collapse>
        </div>
    }

    open(col: number) {
        let openColumn = this.state.openColumn;
        let showInfo = this.state.showInfo;
        let newShowInfo = !showInfo || col !== openColumn;
        this.setState({openColumn:col, doScroll: newShowInfo, showInfo: newShowInfo});
    }
}

export default References;
