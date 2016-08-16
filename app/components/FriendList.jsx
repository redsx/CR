import React, { PropTypes } from 'react'

import Avatar from '../containers/Avatar.js'

import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

const styles = {
    ul:{
        display: 'block',
        paddingLeft: '10px',
        margin: '0px'
    },
    li:{
        listStyle: 'none',
        marginTop: '9px',
        paddingBottom: '5px',
        borderBottom: 'solid 1px #E8E1E1'
    },
    span:{
        paddingLeft: '10px',
        color: '#666',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    hr: {
        lineHeight: '38px',
        paddingTop: '10px',
        fontSize: '15px'
    },
    notification:{
        textAlign: 'center',
        marginRight: '5px',
        width: '21px',
        height: '21px',
        background: 'rgba(255, 80, 71, 0.98)',
        borderRadius: '50%',
        color: 'white',
    }
}

class FriendList extends React.Component{
    constructor(props){
        super(props);
    }
    renderOnlineList(){
        let { onlineUsers, setUserCurRoom, clearCount, badgeCount, nickname, setScrollState } = this.props;
        let list = [];
        for(let item in onlineUsers){
            let user = onlineUsers[item];
            if(user.isOnline > 0 && user.nickname !== nickname){
                list.push(
                    <li
                        style = {styles.li}
                        key = {item}
                        data-flex = 'main:center box:first'
                    >
                        <Avatar 
                            src = {user.avatar}
                            size = {39}
                            nickname = {user.nickname}
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
                                }}
                        >
                            <span
                                style = {styles.span}
                                data-flex-box = '2'
                            >
                                {user.nickname}
                            </span>
                            {
                                badgeCount[user.nickname] ?
                                <span
                                    style = {styles.notification}
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
        let { setUserCurRoom, clearCount, badgeCount, setScrollState } = this.props;
        let  room = {};
        room.avatar = 'http://oajmk96un.bkt.clouddn.com/hdImg_6e40281f541d24709f2840adc72631a61469706694782.jpg';
        room.name = 'MDZZ'
        list.unshift(
            <li
                key = {room.name}
                style = {styles.li}
                data-flex = 'main:center box:first'
            >
                <Avatar 
                    src = {room.avatar}
                    size = {39}
                    nickname = ''
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
                        }}
                >
                    <span 
                        style = {styles.span}
                        data-flex-box = '2'
                    >
                        {room.name}
                    </span>
                    {
                        badgeCount[room.name] ?
                        <span
                            style = {styles.notification}
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
            <div
                style = {{
                    height:'100%',
                }}
            >
                <Subheader
                    style = {styles.hr}
                >
                    {isShowRoom?'真正搅基...':'在线玩家'}
                </Subheader>
                <Divider />
                <div
                    style = {{
                        height:'90%',
                        overflowY:'scroll',
                    }}
                >
                    <ul style = {styles.ul}>
                        {list}
                    </ul>
                </div>
            </div>
        );
    }
}
FriendList.propTypes = {
    onlineUsers: PropTypes.object,
    setUserCurRoom: PropTypes.func,
    clearCount: PropTypes.func,
    setScrollState: PropTypes.func,
    badgeCount: PropTypes.object,
    nickname: PropTypes.string,
    isShowRoom: PropTypes.bool
}
export default FriendList;