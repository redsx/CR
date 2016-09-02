import React, {PropTypes} from 'react'
import Immutable from 'immutable'
import marked from 'marked'

import '../less/inputareaM.less'

import { sendMessage, sendPrivateMessage, sendImage } from '../actions'
import ajaxHandle, { UPLOAD_URL, HISTORY_URL } from '../actions/ajax.js'


class InputArea extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isPreView: false,
            inputValue: ''
        }
    }
    componentWillReceiveProps(nextProps){
        let input = this.refs.input;
        if(!Immutable.is(this.props.expression, nextProps.expression)){
            input.value += nextProps.expression.get('emoji');
            this.refs.input.focus();
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.state.isPreView !== nextState.isPreView){
            return true;
        }
        return false;
    }
    componentDidMount(){
        this.refs.input.focus();
         marked.setOptions({
            highlight: function (code) {
                return require('highlight.js').highlightAuto(code).value;
            }
        });
        // document.addEventListener('keydown', (e) => {
        //     if(e.keyCode === 13){
        //         this.handleClick();
        //     }
        // })
        document.addEventListener('keydown', (e)=>{
            if(e.keyCode === 9){
                e.preventDefault();
            }
        })
        document.addEventListener('click', (e) => {
            e.target != this.refs.expressionBtn && this.props.isShowExpressions ? this.props.setExpressionHidden():null;
        })
    }
    handlePreView(){
        this.setState({isPreView:!this.state.isPreView});
    }
    handleChange(e){
        this.setState({
            inputValue:e.target.value
        });
    }
    handleClick(){
        let input = this.refs.input;
        let user = this.props.user.toJS(),
            addPrivateMessage = this.props.addPrivateMessage,
            addMessage = this.props.addMessage,
            content = (input.value.trim()).slice(0,150);
        if(content !== ''){
            input.value = '';
            input.focus();
            this.setState({
                inputValue: ''
            });
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
            user = this.props.user.toJS(),
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
            <div data-flex = 'main:left cross:top dir:top' className = 'textarea-container'>
                <div data-flex-box='0' data-flex = 'main: left cross: center' className = 'btn-box'>

                    <div className = 'icon-box'>
                        <i className = 'icon'>&#xe650;</i>
                    </div>
                    <div className = 'icon-box'>
                        <i className = 'icon'>&#xe63d;</i>
                    </div>
                    <div className = 'icon-box'>
                        <i className = 'icon'>&#xe667;</i>
                    </div>
                    <div 
                        className = 'icon-box'
                        onClick = {()=>this.handlePreView()}
                    >
                        <i className = 'icon'>&#xe664;</i>
                    </div>
                    <div 
                        className = 'icon-box'
                        onClick = {()=>{this.handleClick()}}
                    >
                        <i className = 'icon'> &#xe649; </i>
                    </div>
                </div>
                <div data-flex = 'main:center box:mean' data-flex-box = '1' data-flex = 'main:left' className = 'textarea-box' >
                    {
                        this.state.isPreView ? <div className = 'preView' dangerouslySetInnerHTML={{__html: marked(this.state.inputValue)}}></div>
                        :<textarea 
                            data-flex-box = '1' 
                            className = 'textarea'
                            ref = 'input'
                            defaultValue = {this.state.inputValue}
                            placeholder = 'Click here to type a chat message. Supports GitHub flavoured markdown. ⌘/ctrl+Enter to send....'
                            onPaste = {(e)=>{this.handlePaste(e)}}
                            onChange = {(e)=>{this.handleChange(e)}}
                        />
                    }
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
}
export default InputArea;

