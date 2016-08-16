import React, {PropTypes} from 'react'

import IconButton from 'material-ui/IconButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import InsertPhoto from 'material-ui/svg-icons/editor/insert-photo.js'
import Mood from 'material-ui/svg-icons/social/mood.js'

// import ImageUpload from '../containers/ImageUpload.js'

import { sendMessage, sendPrivateMessage, sendImage } from '../actions'
import ajaxHandle, { UPLOAD_URL, HISTORY_URL } from '../actions/ajax.js'


const styles = {
    inputArea:{
        margin:'0 15px',
    },
    inputBox:{
        padding:'8px 0'
    },
    clickDiv: {
        position:'absolute',
        width: '48px',
        height: '48px',
        zIndex: '999'
    },
    input:{
        fontSize:'1rem',
        height:'1.9rem',
        marginTop: '2px'
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
            this.refs.input.focus();
        }
    }
    componentDidMount(){
        this.refs.input.focus();
        document.addEventListener('keydown', (e) => {
            if(e.keyCode === 13){
                this.handleClick();
            }
        })
        document.addEventListener('click', (e) => {
            e.target != this.refs.expressionBtn && this.props.isShowExpressions ? this.props.setExpressionHidden():null;
        })
    }
    handleClick(){
        let input = this.refs.input;
        let user = this.props.user,
            addPrivateMessage = this.props.addPrivateMessage,
            addMessage = this.props.addMessage,
            content = (input.value.trim()).slice(0,150);
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
            :sendMessage(message).then((resault)=>{
                return addMessage(resault);
            });
        }
    }
    handlePaste(e){
        let items = e.clipboardData.items,
            user = this.props.user,
            addMessage = this.props.addMessage,
            addPrivateMessage = this.props.addPrivateMessage;
        if (e.clipboardData.types.indexOf('Files') !== -1) {
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                if( item && item.kind === 'file' && item.type.match(/^image\/\w+/) ){
                    let formdata = new FormData(),
                        imgFile = item.getAsFile();
                    if(imgFile.size > 3*1024*1024){
                        alert('文件过大');
                    } else{
                        formdata.append('smfile',imgFile);
                        ajaxHandle.request('post',UPLOAD_URL,formdata,null)
                        .then((resault)=>{
                            if(resault.code === 'success'){
                                let message = {
                                    content:resault.data.url,
                                    room: user.curRoom,
                                    type: 'imageMessage',
                                    nickname: user.nickname
                                }
                                if(user.isPrivate){
                                    return sendPrivateMessage(message);
                                }
                                return sendMessage(message);
                            } else{
                                throw new Error('uplode error');
                            }
                        }).then((resault)=>{
                            if(user.isPrivate){
                                return addPrivateMessage(resault);
                            }
                            addMessage(resault);
                        }).catch((err)=>{
                            console.log(err);
                        })
                    }
                }
            }
        }
    }
    render(){
        let { expState, setExpressionShow, setExpressionHidden, isShowImageExp, setImageExpState } = this.props;
        return (
            <div data-flex = 'main:center' style = {styles.inputArea}>
                <div data-flex-box='0'>
                    <div 
                        style = {styles.clickDiv}
                        onClick = {()=>{
                            this.props.isShowExpressions ? setExpressionHidden() : setExpressionShow();
                        }} 
                        ref = 'expressionBtn'
                    ></div>
                    <IconButton>
                        <Mood color = '#555' />
                    </IconButton>
                </div>
                <div data-flex-box = '0'>
                    <div 
                        style = {styles.clickDiv}
                        onClick = {(e) => {
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                            setImageExpState(!isShowImageExp);
                        }}
                    ></div>
                    <IconButton>
                        <InsertPhoto color = '#555' />
                    </IconButton>
                </div>
                <div data-flex = 'main:center box:mean' data-flex-box = '1' data-flex = 'main:center' style = {styles.inputBox}>
                    <input 
                        data-flex-box = '1' 
                        style = {styles.input}  
                        ref = 'input'
                        onPaste = {(e)=>{this.handlePaste(e)}}
                    />
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
    isShowImageExp: PropTypes.bool,
    setExpressionShow: PropTypes.func,
    setExpressionHidden: PropTypes.func,
    addMessage: PropTypes.func,
    addPrivateMessage: PropTypes.func,
    setImageExpState: PropTypes.func,
    expression: PropTypes.object,
    user: PropTypes.object
}
export default InputArea;