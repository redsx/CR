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
    componentWillReceiveProps(nextProps){
        let input = this.refs.input;
        if(!Immutable.is(this.props.expression, nextProps.expression)){
            input.value += nextProps.expression.get('emoji');
            this.refs.input.focus();
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
        document.addEventListener('click', (e) => {
            e.target != this.refs.expressionBtn && this.props.isShowExpressions ? this.props.setExpressionState(false):null;
        })
    }
    handlePreView(){
        this.setState({isPreView:!this.state.isPreView});
    }
    handleChange(e){
        console.log(e.target.innerText);
        console.log(marked(e.target.innerText));
        this.setState({
            inputValue: marked(e.target.innerText)
        });
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.state.isPreView !== nextState.isPreView){
            return true;
        }
        return false;
    }
    handleClick(command){
        switch (command) {
            case 'bold': {
                document.execCommand('bold',false);
                console.log('bold');
                break;
            }
            case 'formatBlock': {
                document.execCommand('formatBlock',false,'PRE');
                console.log('formatBlock');
                break;
            }
            case 'strikeThrough': {
                    document.execCommand('strikeThrough');
                    console.log('strikeThrough');
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
                console.log('insertUnorderedList');
                break;
            }
            default:
                break;
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
                                // resault.data.url
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
        let { expState, setExpressionState, isShowImageExp, setImageExpState } = this.props;
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
                                onClick = {()=> this.handleClick('insertUnorderedList')}
                            >
                                <i className = 'icon'>&#xe6aa;</i>
                            </button>
                        </li>
                        <li className = 'icon-list'>
                            <button
                                className = 'icon-btn-box'
                                onClick = {()=> this.handleClick('insertUnorderedList')}
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
    isShowExpressions: PropTypes.bool,
    isShowImageExp: PropTypes.bool,
    setExpressionState: PropTypes.func,
    addMessage: PropTypes.func,
    addPrivateMessage: PropTypes.func,
    setImageExpState: PropTypes.func,
}
export default InputArea;

