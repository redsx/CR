import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Logout from 'material-ui/svg-icons/action/exit-to-app.js'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ContentSend from 'material-ui/svg-icons/content/send'
import ContentDrafts from 'material-ui/svg-icons/content/drafts'
import CommunicationEmail from 'material-ui/svg-icons/social/poll.js'
import Textsms from 'material-ui/svg-icons/communication/textsms.js'
import Person from 'material-ui/svg-icons/social/person.js'

import Avatar from '../containers/Avatar.js'

import { logout } from '../actions'
import '../less/selfinfo.less'

class SelfInfo extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(value){
        this.props.setListShow(value);
    }
    handleSettingClick(){
        this.props.setSystemSettingState(true);
        if(window.innerWidth < 768){
            this.props.setMenuState(true);
        }
    }
    render(){
        let { avatar, nickname } = this.props.user.toJS();
        return (
            <div
                data-flex = 'main:center cross:center dir:top '
                className = 'selfinfo-container'
            >
                <div data-flex-box = '1' className = 'selfinfo-avatar'>        
                    <Avatar 
                        src={avatar}
                        size = {50}
                        nickname = {nickname}
                        mode = 'profile'
                    />
                </div>
                <div data-flex-box = '3'>
                <ul className = 'selfinfo-icon-ul'>
                    <li className = 'selfinfo-icon-list' onClick = {()=> this.handleClick(false)}>
                        <i className = 'selfinfo-icon'>&#xe68c;</i>
                    </li>
                    <li className = 'selfinfo-icon-list' onClick = {() => this.handleClick(true)}>
                        <i className = 'selfinfo-icon'>&#xe67f;</i>
                    </li>
                    <li className = 'selfinfo-icon-list' onClick = {() => this.handleSettingClick()} >
                        <i className = 'selfinfo-icon'>&#xe693;</i>
                    </li>
                </ul>
                </div>
                <div data-flex-box = '2' data-flex = 'dir:bottom'>
                <ul className = 'selfinfo-icon-ul'>
                    <li className = 'selfinfo-icon-list' onClick = {()=>logout()}>
                        <i className = 'selfinfo-icon'>&#xe67b;</i>
                    </li>
                    <li className = 'selfinfo-icon-list'>
                        <a href = 'http://blog.mdzzapp.com/#/article/纪录cr聊天室开发?_k=ey6sdw' target = '_blank'>
                            <i className = 'selfinfo-icon'>&#xe68e;</i>
                        </a>
                    </li>
                    <li className = 'selfinfo-icon-list'>
                        <a href = 'https://github.com/redsx/CR' target = '_blank'>
                            <i className = 'selfinfo-icon' style = {{fontWeight: '900'}}>&#xe692;</i>
                        </a>
                    </li>
                </ul>
                </div>
            </div>
        );
    }
}


SelfInfo.propType = {
    // user: PropTypes.object,
    setListShow: PropTypes.func
}

export default SelfInfo;