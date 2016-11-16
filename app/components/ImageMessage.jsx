import React, {PropTypes} from 'react'
import pureMixin from '../mixin/pureMixin.js'
import Immutable from 'immutable'
import MessageBox from './MessageBox.jsx'
import '../less/message.less'
 
 
class Message extends React.Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = pureMixin.bind(this);
    }
    handleClick() {
        let index = this.props.index,
            setSlideState = this.props.setSlideState,
            findSlideArr = this.props.findSlideArr;
            findSlideArr(index);
            setSlideState(true);
    }
    render(){
        return (
            <MessageBox 
                info = {this.props.info}
                messageContent = {
                    <span>
                        <img src ={this.props.content} onClick = {()=>{this.handleClick()}} className = 'imageMessage'/>
                    </span>
                }
            />
            
        );
    }
}

Message.propType = {
    setSlideState: PropTypes.func,
    findSlideArr: PropTypes.func
}

export default Message;
