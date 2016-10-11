import React, { PropTypes } from 'react'

import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Avatar from '../containers/Avatar.js'
import ListItem from './ListItem.jsx'
import QueueAnim from 'rc-queue-anim'
import pureMixin from '../mixin/pureMixin.js'

import '../less/friendlist.less'


class FriendList extends React.Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = pureMixin.bind(this);
    }
    closeMenu(){
        if(window.innerWidth < 980){
            this.props.setMenuState(true);
        }
    }
    handleClick(){
        let value = this.refs.searchInput.value.trim();
        this.props.searchRoom(value);
    }
    clickList(isPrivate,roomName){
        return () => {
            let { changeRoom, curRoom, clearCount , nickname, setScrollState } = this.props;
            if(curRoom !== roomName){
                changeRoom({
                    curRoom: roomName,
                    isPrivate: isPrivate
                });
                clearCount(roomName);
            }
            setScrollState(true);
            this.closeMenu()
        }
    }
    showRoomInfo(roomName){
        return () => {
            this.props.getRoomInfo(roomName);
        }
    }
    renderList(){
        let { changeRoom, clearCount , nickname, curRoom, setScrollState, listState } = this.props;
        let badgeCount = this.props.badgeCount.toJS(),
            list = this['props'][listState] ? this['props'][listState].toJS() : {};
        let arr = [];
        for(let item in list){
            arr.push(
                <ListItem
                    key = {item}
                    handleTextClick = { listState === 'searchList'? this.showRoomInfo(list[item]['roomName']) : this.clickList(list[item]['isPrivate'],list[item]['roomName']) }
                    text = {list[item]['roomName']}
                    badgeCount = {badgeCount[list[item]['roomName']]}
                    avatar = {list[item]['avatar']}
                    isSelect = {curRoom === list[item]['roomName']}
                    needBtn = {listState === 'activeList'}
                    handleBtnClick = {() => this.props.deleteActiveItem(list[item])}
                />
            )
        }
        return arr
    }
    renderHeader(listState){
        switch(listState){
            case 'activeList': {
                return (
                    <Subheader>
                        <span>活跃列表</span>
                        <Divider/>
                    </Subheader>
                )
            }
            case 'roomList': {
                return (
                    <Subheader>
                        <span>已加入列表</span>
                        <Divider/>
                    </Subheader>
                )
            }
            case 'searchList': {
                return (
                    <div className = 'friendlist-header' data-flex = 'main:center cross:center'>
                        <input type = 'text' placeholder = '输入房间名' ref = 'searchInput'/>
                        <button className = 'friendlist-search-btn' onClick = {()=>this.handleClick()}><i className = 'icon'>&#xe60f;</i></button>
                    </div>
                )
            }
        }
    }
    render(){
        let listState = this.props.listState;
        let list = this.renderList();
        return (
            <div style = {{ height:'100%'}}>
                {this.renderHeader(listState)}
                <div className = 'friendlist-list-box'>
                    <ul className = 'friendlist-ul'>
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
    changeRoom: PropTypes.func,
    clearCount: PropTypes.func,
    setScrollState: PropTypes.func,
    // badgeCount: PropTypes.object,
    nickname: PropTypes.string,
    listState: PropTypes.string
}
export default FriendList;