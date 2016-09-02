import React, {PropTypes} from 'react'
import Toggle from 'material-ui/Toggle'

import '../less/systemsetting.less'

class SystemSetting extends React.Component{
    constructor(props){
        super(props);
    }
    // componentDidMount(){
    //     document.addEventListener('scroll',(e)=>{
    //         console.log(e.target);
    //     })
    // }
    launchIntoFullscreen(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    exitFullscreen() {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    handleFullScreenToggle(e,v){
        if(v){
            this.launchIntoFullscreen(document.documentElement);
        } else{
            this.exitFullscreen();
        }
    }
    handleScroll(){

    }
    handleNotificationToggle(e,v){
        this.props.setNotificationState(v);
        this.props.storageSetting();
    }
    handleAudioToggle(e,v){
        this.props.setAudioState(v);
        this.props.storageSetting();
    }
    handleClick(){
        this.props.setSystemSettingState(false)
    }
    render(){
        return !this.props.isShowSysSetting?null:(
            <div data-flex = 'main:center cross:center' className = 'system-setting-container'>
                <div className = 'system-setting-box'>
                    <div className = 'system-setting-header' data-flex = 'main:center cross:center'>
                        设置
                    </div>
                     <div className = 'system-setting-content'>
                        <Toggle
                            label = '桌面提醒'
                            defaultToggled = {this.props.h5Notification}
                            className = 'system-setting-toggle'
                            onToggle = {(e,v)=>{this.handleNotificationToggle(e,v)}}
                        />
                        <Toggle
                            label = '提示音'
                            defaultToggled = {this.props.audioNotification}
                            className = 'system-setting-toggle'
                             onToggle = {(e,v)=>{this.handleAudioToggle(e,v)}}
                        />
                        <Toggle
                            label = '全屏'
                            defaultToggled = {false}
                            className = 'system-setting-toggle'
                            onToggle = {(e,v)=>{this.handleFullScreenToggle(e,v)}}
                        />
                        <Toggle
                            label = '滚动条锁定'
                            defaultToggled = {false}
                            className = 'system-setting-toggle'
                            disabled = {true}
                            onToggle = {(e,v)=>{this.handleFullScreenToggle(e,v)}}
                        />
                    </div>
                    <div className = 'system-setting-footer'  data-flex = 'main:center cross:center'>
                        <button className = 'system-setting-btn' onClick = {()=>this.handleClick()}>确定</button>
                    </div>
                </div>
                <div className = 'system-setting-bg' onClick = {()=>this.handleClick()}>
                </div>
            </div>
        );
    }
}
export default SystemSetting;