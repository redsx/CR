import React, {PropTypes} from 'react'

import IconButton from 'material-ui/IconButton'
import ContentClear from 'material-ui/svg-icons/content/clear';

import { changeAvatar } from '../actions'
import ajaxHandle, { UPLOAD_URL, HISTORY_URL } from '../util/ajax.js'

import Avatar from '../containers/Avatar.js'
import Setting from '../containers/Setting.js'
import SpecialSetting from '../containers/SpecialSetting.js'
import RoomSetting from '../containers/RoomSetting.js'

import '../less/infocard.less'

class InfoCard extends React.Component{
    constructor(props){
        super(props);
    }
    handleChange(e){
        let fileBtn = e.target;
        let { title, mode } = this.props;
        let imgFile = fileBtn.files[0],
            formdata = new FormData(),
            user = this.props.user.toJS(),
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
                        if(mode === 'roomCard'){
                            return this.props.updateRoomInfo({
                                name: title,
                                avatar: url,
                                token: user.token
                            });
                        } else{
                            return changeAvatar({
                                nickname: user.nickname,
                                avatar: url
                            })
                        }
                    } else{
                        throw new Error('uplode error');
                    }
                }).then(()=>{
                    if(mode === 'roomCard'){
                        this.props.getRoomActiveInfo(title);
                    } else{
                        getUserInfo(user.nickname);
                    }
                    hiddenInfoCard();
                }).catch((err)=>{
                    console.log(err);
                    this.props.setSnackbarState({
                        content: '图片上传失败，请重试',
                        open: true
                    })
                    hiddenInfoCard();
                })
            }
        }
        
    }
    renderInfoCard(){
        let { mode, isShow, title, creater, time, avatar, canChangeInfo } = this.props;
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
                            
                            <h2>{title}</h2>
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
                                nickname = {title}
                                mode = ''
                                className = 'info-card-avatar'
                            />
                            {
                                canChangeInfo?<input className = 'info-card-input-file' type='file' onChange = {(e)=>{this.handleChange(e)}}/> : null
                            }
                        </div>
                    </div>
                    {
                        mode === 'roomCard' ? <RoomSetting />
                        : (canChangeInfo? <Setting /> : <SpecialSetting />)
                    }
                </div>
            )
    }
    render(){
        let isShow = this.props.isShow;
        return !isShow?null:(
                <div className = 'info-card-bg'>
                    {this.renderInfoCard()}
                 </div>
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