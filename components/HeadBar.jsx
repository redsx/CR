import React, {PropTypes} from 'react'

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon'
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';

import Divider from 'material-ui/Divider';

const styles = {
    text: {
        lineHeight: '48px',
        textAlign: 'center'
    }
}
class HeadBar extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
            <div data-flex = 'main:left' >
                <div data-flex-box = '0'>
                    <IconButton
                        onClick = {()=>{this.props.setMenuState(!this.props.menuState)}}
                    >
                        {
                            this.props.menuState ?
                            <ContentAdd color = {'#888'} /> 
                            :<ContentClear color = {'#888'} /> 
                        }
                    </IconButton> 
                </div>
                <div data-flex = 'main:center cross:center' data-flex-box = '1' style = {{paddingRight:'48px'}}>
                    <strong  >{this.props.curRoom}</strong>
                </div>
            </div>
            <Divider />            
            </div>
        );
    }
}
HeadBar.propTypes = {
    setMenuState: PropTypes.func,
    menuState: PropTypes.bool,
    curRoom: PropTypes.string
}

export default HeadBar;