import React, {PropTypes} from 'react'

import IconButton from 'material-ui/IconButton'
import ContentClear from 'material-ui/svg-icons/content/clear';

import { changeAvatar } from '../actions'
import ajaxHandle, { UPLOAD_URL, HISTORY_URL } from '../actions/ajax.js'

import Avatar from '../containers/Avatar.js'
import Setting from '../containers/Setting.js'
import SpecialSetting from '../containers/SpecialSetting.js'
import Drag from './Drag.jsx'

import '../less/infocard.less'

class InfoCard extends React.Component{
    constructor(props){
        super(props);
    }
    handleChange(e){
        let fileBtn = e.target;
        let imgFile = fileBtn.files[0],
            formdata = new FormData(),
            user = this.props.user,
            setUserInfo = this.props.setUserInfo,
            getUserInfo = this.props.getUserInfo,
            hiddenInfoCard = this.props.hiddenInfoCard,
            isImgReg = /image\/\w+/;
        if(!imgFile || !isImgReg.test(imgFile.type)){
            console.log('imgFile is not image');
        } else{
            if(imgFile.size > 3*1024*1024){
                alert('文件过大');
            } else{
                formdata.append('smfile',imgFile);
                ajaxHandle.request('post',UPLOAD_URL,formdata,null)
                .then((resault)=>{
                    if(resault.code === 'success'){
                        let url = resault.data.url;
                        return changeAvatar({
                            nickname: user,
                            avatar: url
                        })
                    } else{
                        throw new Error('uplode error');
                    }
                }).then((resault)=>{
                    return setUserInfo(resault);
                }).then(()=>{
                    getUserInfo(user);
                }).catch((err)=>{
                    alert('图片上传失败，请重试');
                    hiddenInfoCard();
                })
            }
        }
        
    }
    renderInfoCard(){
        let { nickname, avatar, time, isShow } = this.props.infoCardState.toJS();
        let canChangeInfo = this.props.user === nickname;
        return !isShow?null:(
                <div
                    className = 'info-card-box'
                    data-flex = 'main:center cross:center dir:top'
                >
                    <div className = 'info-card-close-btn' onClick = {()=>this.props.hiddenInfoCard()}>
                        <i className = 'info-card-close-icon'>&#xe672;</i>
                    </div>
                    <div
                        data-flex = 'main:center cross:center'
                        data-flex-box = '0'
                        className = 'info-card-header'
                    >
                        <div
                            data-flex = 'main:top cross:top dir:top'
                            data-flex-box = '2'
                            className = 'info-card-head-left'
                        >
                            
                            <h2>{nickname}</h2>
                            <span>{time}</span>
                        </div>
                        <div
                            data-flex = 'main:center cross:top'
                            data-flex-box = '1'
                            className = 'info-card-head-right'
                        >
                            <Avatar 
                                src = {avatar} 
                                size = {65}
                                nickname = {nickname}
                                mode = ''
                                className = 'info-card-avatar'
                            />
                            {
                                canChangeInfo?<input className = 'info-card-input-file' type='file' onChange = {(e)=>{this.handleChange(e)}}/> : null
                            }
                        </div>
                    </div>
                    {
                        canChangeInfo? <Setting userInfo = {this.props.infoCardState}/> : <SpecialSetting userInfo = {this.props.infoCardState}/>
                    }
                </div>
            )
    }
    render(){
        let isShow = this.props.infoCardState.toJS().isShow,
            y = Math.round(window.innerHeight/2) - 200,
            x = Math.round(window.innerWidth/2) - 165;
        return !isShow?null:(
                <Drag
                    x = {x}
                    y = {y}
                    component = {
                        this.renderInfoCard()
                    }
                />
            )
    }
}

InfoCard.propTypes = {
    // infoCardState: PropTypes.object,
    hiddenInfoCard: PropTypes.func,
    setUserInfo: PropTypes.func,
    // user: PropTypes.object
}

export default InfoCard;