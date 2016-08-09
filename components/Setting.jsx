import React, {PropTypes} from 'react'

import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
const theme = {
    theme1: {
        src1: '/audio/rc1.wav' ,
        src2: '/audio/rc2.wav' ,
        src3: '/audio/rc3.wav'
    },
    theme2: {
        src1: '/audio/gx1.wav' ,
        src2: '/audio/gx2.wav' ,
        src3: '/audio/gx3.wav' 
    },
    theme3: {
        src1: '/audio/ringcut7.mp3' ,
        src2: '/audio/ringcut1.mp3' ,
        src3: '/audio/ringcut2.mp3' 
    }
}

const styles = {
    title: {
        padding:'5px 0px 0px 20px'
    },
    divider: {
        padding:'5px 20px'
    },
    item: {
        paddingBottom:'6px'
    },
    radioGroup: {
        paddingLeft: '20px',
        paddingTop: '5px'
    },
    label: {
        color: 'rgb(102, 102, 102)'
    },
    icon: {
        fill: 'rgb(102, 102, 102)'
    }
}


class Setting extends React.Component{
    constructor(props){
        super(props);
    }
    handleChange(e,value){
        this.props.setAudioSrc(theme[value]);
        this.props.storageSetting();
    }
    handleAudioToggle(e,value){
        this.props.setAudioState(!value);
        this.props.storageSetting();
    }
    handleNotificationToggle(e,value){
        this.props.setNotificationState(value);
        this.props.storageSetting();
    }
    render(){
        let h5Notification = this.props.setting.h5Notification,
            isClose = this.props.setting.audio.isClose;
        return (
            <div  data-flex = 'main:center dir:top'>
                <div data-flex = 'main:left cross:left' style = {styles.title}>
                    <span>提醒设置</span>
                </div>
                <div style = {styles.divider}>
                    <Divider />                                                        
                </div>
                <div  data-flex = 'main:center'>
                    <div data-flex = 'dir:top' data-flex-box = '0' style = {{paddingLeft:'20px'}}>
                        <span data-flex = 'main:right' data-flex-box = '0' style = {styles.item}>开启桌面提醒:</span>
                        <span data-flex = 'main:right' data-flex-box = '0' style = {styles.item}>开启音效:</span>
                    </div>
                    <div data-flex = 'dir:top' data-flex-box = '1' style = {{paddingLeft:'15px'}}>
                        <span data-flex = 'main:left' data-flex-box = '0' style = {{paddingBottom:'10px'}}>
                            <Toggle 
                                defaultToggled = {h5Notification}
                                onToggle = {(e,v)=>{this.handleNotificationToggle(e,v)}}
                            />
                        </span>
                        <span data-flex = 'main:left' data-flex-box = '0' style = {{paddingBottom:'10px'}}>
                            <Toggle 
                                defaultToggled = {!isClose}
                                onToggle = {(e,v)=>{this.handleAudioToggle(e,v)}}
                            />
                        </span>
                    </div>
                </div>
                <div data-flex = 'main:left cross:left' style = {styles.title}>
                    <span>音效主题</span>
                </div>
                <div style = {styles.divider}>
                    <Divider />                                                        
                </div>
                <RadioButtonGroup 
                    name = 'shipSpeed'
                    style = {styles.radioGroup} 
                    onChange = {(e,value)=>{this.handleChange(e,value)}}
                >
                    <RadioButton
                        value = "theme1"
                        label = "正常主题"
                        disabled = {isClose}
                        style = {styles.item}
                        labelStyle = {styles.label}
                        iconStyle = {styles.icon}
                    />
                    <RadioButton
                        value = "theme2"
                        label = "辣耳朵主题"
                        disabled = {isClose}
                        style = {styles.item}
                        labelStyle = {styles.label}
                        iconStyle = {styles.icon}
                    />
                    <RadioButton
                        value = "theme3"
                        label = "鬼畜主题"
                        disabled = {isClose}
                        style = {styles.item}
                        labelStyle = {styles.label}
                        iconStyle = {styles.icon}
                    />
                    
                </RadioButtonGroup>
                <div data-flex = 'main:left cross:left' style = {styles.title}>
                    <span>其他</span>
                </div>
                <div style = {styles.divider}>
                    <Divider />                                                        
                </div>
                <div style = {{paddingLeft:'20px'}}>
                    <span> 
                        1. 未选择主题默认静音 <br/>
                        2. 以上设置均为本地设置  <br/> 
                        3. 点击头像可修改头像信息 <br/>
                        4. shift+点击头像可@ <br/>
                        5. shift+点击表情可删除表情
                    </span>
                </div>
            </div>
        )
    }
}

Setting.propTypes = {
    setting: PropTypes.object,
    setAudioSrc: PropTypes.func,
    setAudioState: PropTypes.func,
    setNotificationState: PropTypes.func,
    storageSetting: PropTypes.func
}
export default Setting;