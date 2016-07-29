import React, {PropTypes} from 'react'

import { sendImage, sendPrivateMessage } from '../actions'

import IconButton from 'material-ui/IconButton'
import InsertPhoto from 'material-ui/svg-icons/editor/insert-photo.js'

const styles = {
    iconButton:{
        position:'relative'
    },
    insertPhoto:{
        position:'absolute',
        left:'0'
    },
    fileInput:{
        width:'48px',
        height:'48px',
        opacity:'0',
        position:'absolute',
        left:'0px'
    }
}

class ImageUpload extends React.Component{
    constructor(props){
        super(props);
    }
    handleChange(e){
        let fileBtn = e.target;
        let imgFile = fileBtn.files[0],
            isImgReg = /image\/\w+/,
        	user = this.props.user,
            addPrivateMessage = this.props.addPrivateMessage;
        if(!imgFile || !isImgReg.test(imgFile.type)){
            console.log('imgFile is not image');
        }else{
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imgFile);
            fileReader.onload = function (event) {
                let imgDataUrl = event.target.result;
                let message = {
                    content:imgDataUrl,
                    room: user.curRoom,
                    type: 'imageMessage',
                    nickname: user.nickname,
                    filename: imgFile.name
                }
                user.isPrivate?sendPrivateMessage(message).then((resault)=>{
                    return addPrivateMessage(resault);
                })
                :sendImage(message);
            }
            fileReader.onerror =function (err) {
                console.log(err);
            }
        }
        
    }
    render(){
        return (
            <IconButton >
                <InsertPhoto color = '#555' />
                <input type = 'file' style = {styles.fileInput} onChange = {(e)=>{this.handleChange(e)}} />
            </IconButton>
        );
    }
}

ImageUpload.propTypes = {
    user: PropTypes.object,
    addPrivateMessage: PropTypes.func
}
export default ImageUpload