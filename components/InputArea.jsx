import React, {PropTypes} from 'react'

import IconButton from 'material-ui/IconButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import InsertPhoto from 'material-ui/svg-icons/editor/insert-photo.js'
import Mood from 'material-ui/svg-icons/social/mood.js'

import ImageUpload from '../containers/ImageUpload.js'

import { sendMessage, sendPrivateMessage } from '../actions'
const styles = {
    inputArea:{
        margin:'0 15px',
    },
    inputBox:{
        padding:'8px 0'
    },
    input:{
        fontSize:'1.1rem',
        height:'2rem'
    }
}

class InputArea extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps){
        let input = this.refs.input;
        if(this.props.expression.timestamp !== nextProps.expression.timestamp){
            input.value += nextProps.expression.emoji;
        }
    }
    componentDidMount(){
        let self = this;
        this.refs.input.focus();
        document.addEventListener('keydown',function (e) {
            if(e.keyCode === 13){
                self.handleClick();
            }
        })
    }
    handleClick(){
        let input = this.refs.input;
        let user = this.props.user,
            addPrivateMessage = this.props.addPrivateMessage,
            content = input.value.trim();
        if(content !== ''){
            input.value = '';
            input.focus();
            let message = {
                nickname:user.nickname,
                room: user.curRoom,
                content:content,
                type:'textMessage'
            }

            user.isPrivate?sendPrivateMessage(message).then((resault)=>{
                return addPrivateMessage(resault);
            })
            :sendMessage(message);
        }
    }
    render(){
        let { expState, setExpressionShow, setExpressionHidden } = this.props;
        return (
            <div data-flex = 'main:center' style = {styles.inputArea}>
                <div data-flex-box='0'>
                    <IconButton onClick = {
                        ()=>{
                            this.props.isShowExpressions ? setExpressionHidden() : setExpressionShow();
                        }
                    } >
                        <Mood color = '#555' />
                    </IconButton>
                </div>
                <div data-flex-box='0'>
                    <ImageUpload />
                </div>
                <div data-flex = 'main:center box:mean' data-flex-box='1' data-flex = 'main:center' style = {styles.inputBox}>
                    <input data-flex-box='1' style = {styles.input}  ref = 'input' />
                </div>
                <div data-flex-box='0'>
                    <IconButton
                        onClick = {()=>{this.handleClick()}}
                    >
                        <ContentSend color = '#555' />
                    </IconButton>
                </div>
            </div>
        );
    }
}
InputArea.propTypes = {
    isShowExpressions: PropTypes.bool,
    setExpressionShow: PropTypes.func,
    setExpressionHidden: PropTypes.func,
    expression: PropTypes.object,
    user: PropTypes.object
}
export default InputArea;