import React, {PropTypes} from 'react'

import IconButton from 'material-ui/IconButton'
import ContentClear from 'material-ui/svg-icons/content/clear';

import { changeAvatar } from '../actions'
import Avatar from '../containers/Avatar.js'
import Setting from '../containers/Setting.js'
import SpecialSetting from '../containers/SpecialSetting.js'

const styles = {
    box: {
        position:'fixed',
        top:'50%',
        left:'50%',
        marginTop:'-175px',
        marginLeft:'-145px',
        width:'290px',
        height:'350px',
        boxShadow:'0px 0px 10px #777',
        borderRadius:'5px'
    },
    container:{
        width: '100%',
        background: 'white',
        paddingTop: '5px',
        height: '205px',
        overflow: 'visible',
        overflowX: 'scroll',
        color: '#666'
    },
    headLeft: {
        height: '100%',
        color: 'white',
        textAlign: 'center',
        paddingLeft: '35px',
        paddingTop: '35px'
    },
    headRight: {
        paddingTop: '20px', 
        position: 'relative',       
        height: '100%',
    },
    containLeft:{
        paddingLeft: '15px'
    },
    closeBtn: {
        position: 'absolute',
        left: '-10px',
        top: '-10px'
    },
    smallIcon: {
        width: 16,
        height: 16,
        background: 'rgba(119, 119, 119, 0.35)',
        borderRadius:'50%'
    },
    avatar: {
        border: '1px solid #ddd'
    },
    inputFile: {
        position: 'absolute',
        width: '63px',
        height: '63px',
        borderRadius: '50%',
        opacity: '0',
        left: '5px'
    }
}
class InfoCard extends React.Component{
    constructor(props){
        super(props);
    }
    handleChange(e){
        let fileBtn = e.target;
        let imgFile = fileBtn.files[0],
            user = this.props.user,
            setUserInfo = this.props.setUserInfo,
            hiddenInfoCard = this.props.hiddenInfoCard,
            isImgReg = /image\/\w+/;
        if(!imgFile || !isImgReg.test(imgFile.type)){
            console.log('imgFile is not image');
        } else{
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imgFile);
            fileReader.onload = function (event) {
                var imgDataUrl = event.target.result;
                changeAvatar({
                    nickname: user.nickname,
                    imageData: imgDataUrl,
                    filename: imgFile.name
                }).then((resault)=>{
                    return setUserInfo(resault);
                }).then(()=>{
                    hiddenInfoCard();
                })
            }
            fileReader.onerror =function (err) {
                console.log(err);
            }
        }
    }
    render(){
        let { nickname, avatar, time, isShow } = this.props.infoCardState;
        let canChangeInfo = this.props.user.nickname === nickname;
        return !isShow?null:(
                <div
                    style = {styles.box}
                    data-flex = 'main:center cross:center dir:top'
                >
                    <div style = {styles.closeBtn}>
                        <IconButton 
                            iconStyle = {styles.smallIcon}
                            onClick = {()=>{
                                this.props.hiddenInfoCard()
                            }}
                        >
                            <ContentClear color = '#ddd'/>
                        </IconButton>
                    </div>
                    <div
                        data-flex = 'main:center cross:center'
                        data-flex-box = '0'
                        style = {{
                            width: '100%',
                            height:'145px',
                            background: 'url(http://oajmk96un.bkt.clouddn.com/bg1000'+ Math.floor((Math.random()*1024)%5)+'.jpg) no-repeat center'
                        }}
                    >
                        <div
                            data-flex = 'main:top cross:top dir:top'
                            data-flex-box = '2'
                            style = {styles.headLeft}
                        >
                            
                            <h2>{nickname}</h2>
                            <span>{time}</span>
                        </div>
                        <div
                            data-flex = 'main:center cross:top'
                            data-flex-box = '1'
                            style = {styles.headRight}
                        >
                            <Avatar 
                                src={avatar} 
                                size = {65}
                                nickname = {nickname}
                                style = {styles.avatar}
                            />
                            {
                                canChangeInfo?<input style={styles.inputFile} type='file' onChange = {(e)=>{this.handleChange(e)}}/> : null
                            }
                        </div>
                    </div>
                    <div
                        style = {styles.container}
                    >
                        { canChangeInfo ? <Setting/> : <SpecialSetting nickname = {nickname}/> }
                    </div>
                </div>
            )
    }
}

InfoCard.propTypes = {
    infoCardState: PropTypes.object,
    hiddenInfoCard: PropTypes.func,
    setUserInfo: PropTypes.func,
    user: PropTypes.object
}

export default InfoCard;