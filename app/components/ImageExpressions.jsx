import React, { PropTypes } from 'react'

import ajaxHandle, { UPLOAD_URL, HISTORY_URL } from '../util/ajax.js'
import { sendMessage, sendPrivateMessage } from '../actions'

import QueueAnim from 'rc-queue-anim'

const styles = {
    imageContent: {
        width: '100%',
        height: '181px',
        padding: '6px',
        background: 'white',
        position: 'relative',
        transition: 'all 1s',
        borderTop: '1px solid rgba(204, 204, 204, 0.33)'
    },
    img: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '0px',
        top: '0px',
    },
    input: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '0px',
        top: '0px',
        opacity: '0',
        zIndex: '8'
    },
    progress: {
        width:'100px',
        position: 'relative',
        background: 'grey',
        borderRadius: '8px',
        textAlign: 'center',
        overflow: 'hidden'
    },
    progressPersent: {
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '16px',
        lineHeight: '16px',
        textAlign: 'center',
        color: '#445'
    },
    span: {
        color: '#444',
        opacity: '0.8',
        textShadow: '0 0 1px rgba(0, 0, 0, 0.5)',
        fontSize: '18px'
    },
    select: {
        overflowY: 'scroll' 
    },
    expressionBox: {
        minWidth:'84px',
        width: '12.5%',
        height:'84px',
        padding:'6px',
        borderCollapse:'collapse',
        fontSize:'0px',
        display:'inline-block'
    }
}

class ImageExpressions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            preview: 'http://oajmk96un.bkt.clouddn.com/1470361254005warn.gif',
            progress: {
                type: 'text',
                text: '图片预览／上传'
            }
        };
    }
    uploadImage(files = []){
        let imgFile = files[0],
            isImgReg = /image\/\w+/,
            show = this.refs.show,
            formdata = new FormData(),
            user = this.props.user.toJS(),
            addMessage = this.props.addMessage,
            addPrivateMessage = this.props.addPrivateMessage;
        if(!imgFile || !isImgReg.test(imgFile.type)){
            console.log('imgFile is not image');
        } else if(imgFile.size > 3*1024*1024){
            this.setState({
                progress:{
                    type: 'text',
                    text: '上传文件过大'
                }
            });
        } else{
            formdata.append('smfile',imgFile);
            ajaxHandle.request('post',UPLOAD_URL,formdata,(event)=>{
                if(event.lengthComputable){
                    let persent = Math.floor((event.loaded/event.total)*100);
                    this.setState({
                        progress:{
                            type: 'progress',
                            persent: persent
                        }
                    });
                }
            }).then((resault)=>{
                if(resault.code === 'success'){
                    this.setState({
                        progress:{
                            type: 'progress',
                            persent: 100
                        }
                    });
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
                } else {
                    this.setState({
                        progress:{
                            type: 'text',
                            text: '上传失败'
                        }
                    });
                    throw new Error(resault.msg);
                }
            }).then((resault)=>{
                if(user.isPrivate){
                    return addPrivateMessage(resault);
                }
                addMessage(resault);
            }).catch((err)=>{
                console.log(err);
                this.setState({
                    progress:{
                        type: 'text',
                        text: '上传失败'
                    }
                });
            })
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imgFile);
            fileReader.onload = (event) => {
                let imgDataUrl = event.target.result;
                this.setState({
                    preview:imgDataUrl,
                    progress:{
                        type: 'progress',
                        persent: 0
                    }
                });
            }
            fileReader.onerror = (err) => { 
                this.setState({
                    progress:{
                        type: 'text',
                        text: '读取失败'
                    }
                });
                console.log(err);
            }
        }
    }
    handlePreview(src){
        if(this.state.preview !== src){
            this.setState({
                preview:src,
                progress: {
                    type: 'text',
                    text: ''
                }
            });
        }
    }
    handleClick(e,src){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let user = this.props.user.toJS(),
            addMessage = this.props.addMessage,
            addPrivateMessage = this.props.addPrivateMessage,
            deleteStorageExpression = this.props.deleteStorageExpression,
            storageSetting = this.props.storageSetting;
        if(e.shiftKey){
            deleteStorageExpression(src)
            return storageSetting();
        }
        let message = {
            content:src,
            room: user.curRoom,
            type: 'imageMessage',
            nickname: user.nickname
        }
        !user.isPrivate ? sendMessage(message).then((resault) => addMessage(resault))
        :sendPrivateMessage(message).then((resault) => addPrivateMessage(resault))
    }
    handleStopPro(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }
    renderExpressionList(){
        let exps = this.props.storageExpressions.toJS(),
            expArr = [];
        for(let i = 0; i < exps.length; i++){
            expArr.push(
                <div
                    key = {i}
                    onClick = {(e)=>this.handleClick(e,exps[i])}
                    onMouseOver = {()=>this.handlePreview(exps[i])}
                    style = {{
                        minWidth:'63px',
                        width: '12.5%',
                        height:'63px',
                        margin:'5px',
                        borderCollapse:'collapse',
                        fontSize:'0px',
                        display:'inline-block',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundImage: 'url(' + exps[i] + ') '
                    }}
                >
                </div>
            )
        }
        return expArr;
    }
    renderProgress(){
        if(this.state.progress.type === 'progress'){
            return (
                <div style = {styles.progress}>
                    <span
                        style = {{
                            display: 'block',
                            width: this.state.progress.persent + '%',
                            height: '16px',
                            background: '#7AD33B',
                            borderRadius: '8px'
                        }}
                    ></span>
                    <span style = {styles.progressPersent}>
                        {this.state.progress.persent + '%'}
                    </span>
                </div>
            );
        } else {
            return (
                <span ref = 'span' style = {styles.span}> {this.state.progress.text} </span> 
            );
        }
        
    }
    handleClose(){
        let setImageExpState = this.props.setImageExpState,
            isShowImageExp = this.props.isShowImageExp;
        if(isShowImageExp){
                setImageExpState(false);
        }
    }
    componentDidMount(){
        let setImageExpState = this.props.setImageExpState,
            isShowImageExp = this.props.isShowImageExp;
        
        // document.addEventListener('dragleave',(e)=>e.preventDefault());
        // document.addEventListener('dragenter',(e)=>e.preventDefault());
        // document.addEventListener('dragover',(e)=>e.preventDefault());
        // document.addEventListener('drop',(e)=>{
        //     e.preventDefault();
        //     let files = e.dataTransfer.files || [];
        //     this.uploadImage(files);
        // });
        document.addEventListener('click',()=>{
            this.handleClose();
        },false)
    }
    render(){
        let isShowImageExp = this.props.isShowImageExp;
        return (
            <div 
                ref = 'select' 
                data-flex = 'main:center' 
                onClick = {(e)=>this.handleStopPro(e)}
                style = {{
                    width: '100%',
                    height: isShowImageExp ? '181px' : '0px',
                    opacity: isShowImageExp ? '1' : '0',
                    padding: isShowImageExp ? '6px' : '0px',
                    background: 'white',
                    position: 'relative',
                    transition: 'all 0.5s',
                    borderTop: '1px solid rgba(204, 204, 204, 0.33)'
                }} 
            >
                <div 
                    ref = 'dnd' 
                    data-flex-box = '0' 
                    data-flex = 'main:center cross:center' 
                    style = {{
                        position: 'relative',
                        width: '168px',
                        height: '100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundImage: 'url(' + this.state.preview + ') '
                    }}
                >
                    <input 
                        type = 'file'  
                        style = {styles.input} 
                        onChange = {(e)=>{
                            this.uploadImage(e.target.files);
                        }}
                        onClick = {(e)=> this.handleStopPro(e)}
                    />
                    {this.renderProgress()}
                </div>
                <div data-flex-box = '2' style = {styles.select}>
                    <QueueAnim>
                        {this.renderExpressionList()}
                    </QueueAnim>
                </div>
            </div>
        );
    }
}
ImageExpressions.propTypes = {
    // user: PropTypes.object,
    isShowImageExp: PropTypes.bool,
    // storageExpressions: PropTypes.array,
    addPrivateMessage: PropTypes.func,
    deleteStorageExpression: PropTypes.func
}
export default ImageExpressions;