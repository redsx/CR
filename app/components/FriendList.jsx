import React, { PropTypes } from 'react'

import Avatar from '../containers/Avatar.js'

import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import QueueAnim from 'rc-queue-anim'

import '../less/friendlist.less'


class FriendList extends React.Component{
    constructor(props){
        super(props);
    }
    closeMenu(){
        if(window.innerWidth < 768){
            this.props.setMenuState(true);
        }
    }
    renderOnlineList(){
        let { setUserCurRoom, clearCount , nickname, setScrollState } = this.props;
        let onlineUsers = this.props.onlineUsers.toJS(),
            badgeCount = this.props.badgeCount.toJS();
        let list = [];
        for(let item in onlineUsers){
            let user = onlineUsers[item];
            if(user.isOnline > 0 && user.nickname !== nickname){
                list.push(
                    <li
                        className = 'li'
                        key = {item}
                        data-flex = 'main:center box:first'
                    >
                        <Avatar 
                            src = {user.avatar}
                            size = {39}
                            nickname = {user.nickname}
                            mode = 'profile'
                        />
                        <div
                            data-flex = 'main:left cross:center box:last'
                            onClick = {()=>{
                                    setUserCurRoom({
                                        curRoom: user.nickname,
                                        isPrivate: true
                                    });
                                    clearCount(user.nickname);
                                    setScrollState(true);
                                    this.closeMenu();
                                }}
                        >
                            <span
                                className = 'span'
                                data-flex-box = '2'
                            >
                                {user.nickname}
                            </span>
                            {
                                badgeCount[user.nickname] ?
                                <span
                                    className = 'fl-notification'
                                >
                                    {badgeCount[user.nickname]}                                    
                                </span>
                                : null
                            }
                        </div>
                    </li>
                )
            }
        }
        return list
    }
    renderRoomList(){
        let list = this.renderOnlineList();
        let { setUserCurRoom, clearCount, setScrollState } = this.props;
        let badgeCount = this.props.badgeCount.toJS();
        
        let  room = {};
        room.avatar = 'http://oajmk96un.bkt.clouddn.com/hdImg_6e40281f541d24709f2840adc72631a61469706694782.jpg';
        room.name = 'MDZZ'
        list.unshift(
            <li
                key = {room.name}
                className = 'li'
                data-flex = 'main:center box:first'
            >
                <Avatar 
                    src = {room.avatar}
                    size = {39}
                    nickname = ''
                    mode = ''
                />
                <div
                    data-flex = 'main:left cross:center box:last'
                    onClick = {()=>{
                            setUserCurRoom({
                                curRoom: room.name,
                                isPrivate: false
                            });
                            clearCount(room.name);
                            setScrollState(true);
                            this.closeMenu()
                        }}
                >
                    <span 
                        className = 'span'
                        data-flex-box = '2'
                    >
                        {room.name}
                    </span>
                    {
                        badgeCount[room.name] ?
                        <span
                            className = 'fl-notification'
                        >
                            {badgeCount[room.name]}                                    
                        </span>
                        : null
                    }
                </div>
            </li>
        )
        return list;
    }
    render(){
        let isShowRoom = this.props.isShowRoom;
        let list = isShowRoom ? this.renderRoomList() : this.renderOnlineList();
        return (
            <div style = {{ height:'100%'}}>
                <Subheader className = 'hr'>
                    {isShowRoom?'活跃用户':'在线用户'}
                </Subheader>
                <Divider />
                <div className = 'list-box'>
                    <ul className = 'ul'>
                        <QueueAnim>
                        {list}
                        </QueueAnim>
                    </ul>
                </div>
            </div>
        );
    }
}
FriendList.propTypes = {
    // onlineUsers: PropTypes.object,
    setUserCurRoom: PropTypes.func,
    clearCount: PropTypes.func,
    setScrollState: PropTypes.func,
    // badgeCount: PropTypes.object,
    nickname: PropTypes.string,
    isShowRoom: PropTypes.bool
}
export default FriendList;