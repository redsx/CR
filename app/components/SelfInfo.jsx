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

import '../less/selfinfo.less'

class SelfInfo extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(value,listState){
        if(value === listState) return;
        this.props.setListShow(value);
    }
    handleRoomListClick(value,listState){
        let token = this.props.user.get('token');
        if(value === listState){
            return ;
        } else{
            this.props.setListShow(value);
            this.props.getRoomList(token);
        }
    }
    handleSettingClick(){
        this.props.setSystemSettingState(true);
        if(window.innerWidth < 980){
            this.props.setMenuState(true);
        }
    }
    handleCreateRoomClick(){
        this.props.setCreateRoomState(true);
        if(window.innerWidth < 980){
            this.props.setMenuState(true);
        }
    }
    render(){
        let { avatar, nickname } = this.props.user.toJS();
        let listState = this.props.listState;
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
                    <li 
                        className = {listState !== 'roomList'?'selfinfo-icon-list':'selfinfo-icon-list-select'} 
                        onClick = {()=> this.handleRoomListClick('roomList',listState)}
                    >
                        <i className = 'selfinfo-icon'>&#xe6a3;</i>
                    </li>
                    <li 
                        className = {listState !== 'searchList'?'selfinfo-icon-list':'selfinfo-icon-list-select'}  
                        onClick = {() => this.handleClick('searchList',listState)}
                    >
                        <i className = 'selfinfo-icon'>&#xe60f;</i>
                    </li>
                    <li 
                        className = {listState !== 'activeList'?'selfinfo-icon-list':'selfinfo-icon-list-select'}  
                        onClick = {() => this.handleClick('activeList',listState)}
                    >
                        <i className = 'selfinfo-icon'>&#xe67f;</i>
                    </li>
                    <li className = 'selfinfo-icon-list' onClick = {() => this.handleSettingClick()} >
                        <i className = 'selfinfo-icon'>&#xe693;</i>
                    </li>
                </ul>
                </div>
                <div data-flex-box = '2' data-flex = 'dir:bottom'>
                <ul className = 'selfinfo-icon-ul'>
                    <li className = 'selfinfo-icon-list' onClick = {() => this.props.logout()}>
                        <i className = 'selfinfo-icon'>&#xe67b;</i>
                    </li>
                    <li className = 'selfinfo-icon-list' onClick = {() => this.handleCreateRoomClick() }>
                        <i className = 'selfinfo-icon'>&#xe69e;</i>
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