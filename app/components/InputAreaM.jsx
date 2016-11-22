import React, {PropTypes} from 'react'
import Immutable from 'immutable'
import marked from 'marked'

import '../less/inputareaM.less'

import { sendMessage, sendPrivateMessage } from '../actions'
import ajaxHandle, { UPLOAD_URL, HISTORY_URL } from '../util/ajax.js'
import Highlight from 'react-highlight'

class InputArea extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'textarea',
            content: ''
        }
    }
    componentDidMount(){
        document.addEventListener('keydown', (e)=>{
            if(e.keyCode === 9){
                e.preventDefault();
                e.shiftKey? document.execCommand('outdent',false) : document.execCommand('indent',false);
            }
        })
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.state.type !== nextState.type || nextProps !== this.props){
            return true;
        }
        return false;
    }
    handleSend(){
        let inputTitle = this.refs.inputTitle.value || '',
            inputContent = this.state.content.trim(),
            user = this.props.user.toJS(),
            addPrivateMessage = this.props.addPrivateMessage,
            addMessage = this.props.addMessage;
        if(inputContent !== ''){
            let message = {
                nickname:user.nickname,
                room: user.curRoom,
                title: inputTitle,
                content: inputContent,
                type:'codeMessage',
            }
            user.isPrivate?sendPrivateMessage(message).then((resault)=>{
                return addPrivateMessage(resault);
            })
            :sendMessage(message).then((resault)=>{
                return addMessage(resault);
            });
        }
        this.props.setRichTextState(false);
    }
    handleChange(e) {
        this.setState({content: e.target.value});
    }
    renderTextarea(){
        switch(this.state.type){
            case 'preview': {
                return (
                    <div
                        data-flex-box = '1' 
                        className = 'textarea scroll-hidden'
                        ref = 'inputContent'
                    >
                        <Highlight>{this.state.content}</Highlight>
                    </div>
                )
            }
            case 'exec': {
                return (
                    <div
                        data-flex-box = '1' 
                        className = 'textarea scroll-hidden'
                        ref = 'inputContent'
                        dangerouslySetInnerHTML= { {__html: this.state.content}}
                    />
                )
            }
            default: {
                return (
                    <textarea 
                        data-flex-box = '1' 
                        className = 'textarea scroll-hidden'
                        onChange = {(e) => this.handleChange(e)}
                        defaultValue = {this.state.content}
                        ref = 'inputContent'
                    />
                )
            }
        }
    }
    render(){
        return (
            <div data-flex = 'main:left cross:top dir:top' className = 'textarea-container'>
                <div data-flex = 'main:center box:mean' data-flex-box = '1' data-flex = 'dir:top main:left' className = 'textarea-box' >
                    <div><input className = 'textarea-title' ref = 'inputTitle'/></div>   
                    <ul className = 'btn-box'>
                        <li className = 'icon-list'>
                            <button
                                className = 'icon-btn-box'
                                onClick = {()=> this.setState({type: 'textarea'})}
                            >
                                <i className = 'icon inputM-icon'>&#xe6b8;</i>
                            </button>
                        </li>
                        <li className = 'icon-list'>
                            <button
                                className = 'icon-btn-box'
                                onClick = {()=> this.setState({type: 'preview'})}
                            >
                                <i className = 'icon inputM-icon'>&#xe664;</i>
                            </button>
                        </li>
                        <li className = 'icon-list'>
                            <button
                                className = 'icon-btn-box'
                                onClick = {()=> this.setState({type: 'exec'})}
                            >
                                <i className = 'icon inputM-icon'>&#xe8ca;</i>
                            </button>
                        </li>
                        
                        <li className = 'icon-list-right'>
                            <button
                                className = 'text-btn-box'
                                onClick = {() => this.handleSend()}
                            >
                                <span className = 'text-btn'>发送内容</span>
                            </button>
                        </li>
                        <li className = 'icon-list-right'>
                            <button
                                className = 'text-btn-box'
                                onClick = {() => this.props.setRichTextState(false)}
                            >
                                <span className = 'text-btn'>关闭</span>
                            </button>
                        </li>
                    </ul>
                    {this.renderTextarea()}
                </div>
            </div>
        );
    }
}
InputArea.propTypes = {
    
}
export default InputArea;

