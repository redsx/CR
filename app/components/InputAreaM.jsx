import React, {PropTypes} from 'react'
import Immutable from 'immutable'
import marked from 'marked'

import '../less/inputareaM.less'

import { sendMessage, sendPrivateMessage, sendImage } from '../actions'
import ajaxHandle, { UPLOAD_URL, HISTORY_URL } from '../util/ajax.js'


class InputArea extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isPreView: false,
            size: 3,
            inputValue: ''
        }
    }
    componentDidMount(){
        this.refs.input.focus();
         marked.setOptions({
            highlight: function (code) {
                return require('highlight.js').highlightAuto(code).value;
            }
        });

        document.addEventListener('keydown', (e)=>{
            if(e.keyCode === 9){
                e.preventDefault();
                e.shiftKey? document.execCommand('outdent',false) : document.execCommand('indent',false);
            }
        })
    }
    handlePreView(){
        this.setState({isPreView:!this.state.isPreView});
    }
    handleChange(e){
        this.setState({
            inputValue: marked(e.target.innerText)
        });
    }
    handleClick(command){
        switch (command) {
            case 'bold': {
                document.execCommand('bold',false);
                break;
            }
            case 'formatBlock': {
                document.execCommand('formatBlock',false,'PRE');
                break;
            }
            case 'strikeThrough': {
                    document.execCommand('strikeThrough');
                    break;
                }
            case 'fontSize': {
                if(this.state.size === 5){
                    document.execCommand('fontSize',false,'3');
                    this.setState({size:2});
                } else{
                    document.execCommand('fontSize',false,'5');
                    this.setState({size:5});
                }
                break;
            }
            case 'insertUnorderedList': {
                document.execCommand('insertUnorderedList',false);
                break;
            }
            case 'createLink': {
                document.execCommand('createLink',false,window.getSelection().toString());
                break;
            }
            case 'insertImage': {
                document.execCommand('insertImage',false,window.getSelection().toString());
                break;
            }
            default:
                break;
        }
    }
    handlePaste(e){
        let items = e.clipboardData.items;
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
                                document.execCommand('insertImage',false,resault.data.url);
                            } else{
                                throw new Error('uplode error');
                            }
                        }).catch((err)=>{
                            console.log(err);
                        })
                    }
                }
            }
        }
    }
    render(){
        return (
            <div data-flex = 'main:left cross:top dir:top' className = 'textarea-container'>
                <div data-flex = 'main:center box:mean' data-flex-box = '1' data-flex = 'dir:top main:left' className = 'textarea-box' >
                    <div><input className = 'textarea-title'/></div>   
                    <ul className = 'btn-box'>
                        <li className = 'icon-list'>
                            <button
                                className = 'icon-btn-box'
                                onClick = {()=> this.handleClick('bold')}
                            >
                                <i className = 'icon'>&#xe6b4;</i>
                            </button>
                        </li>
                        <li className = 'icon-list'>
                            <button
                                className = 'icon-btn-box'
                                onClick = {()=> this.handleClick('formatBlock')}
                            >
                                <i className = 'icon'>&#xe6b6;</i>
                            </button>
                        </li>
                        <li className = 'icon-list'>
                            <button
                                className = 'icon-btn-box'
                                onClick = {()=> this.handleClick('strikeThrough')}
                            >
                                <i className = 'icon'>&#xe6a4;</i>
                            </button>
                        </li>
                        
                        <li className = 'icon-list'>
                            <button
                                className = 'icon-btn-box'
                                onClick = {()=> this.handleClick('fontSize')}
                            >
                                <i className = 'icon'>&#xe6a7;</i>
                            </button>
                        </li>
                        
                        <li className = 'icon-list'>
                            <button
                                className = 'icon-btn-box'
                                onClick = {()=> this.handleClick('insertUnorderedList')}
                            >
                                <i className = 'icon'>&#xe67e;</i>
                            </button>
                        </li>
                        <li className = 'icon-list'>
                            <button
                                className = 'icon-btn-box'
                                onClick = {()=> this.handleClick('createLink')}
                            >
                                <i className = 'icon'>&#xe6aa;</i>
                            </button>
                        </li>
                        <li className = 'icon-list'>
                            <button
                                className = 'icon-btn-box'
                                onClick = {()=> this.handleClick('insertImage')}
                            >
                                <i className = 'icon'>&#xe63d;</i>
                            </button>
                        </li>

                        <li className = 'icon-list-right'>
                            <button
                                className = 'text-btn-box'
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
                    <div 
                        contentEditable = {true}
                        data-flex-box = '1' 
                        className = 'textarea scroll-hidden'
                        ref = 'input'
                        onPaste = {(e)=>{this.handlePaste(e)}}
                    />
                </div>
            </div>
        );
    }
}
InputArea.propTypes = {
    
}
export default InputArea;

