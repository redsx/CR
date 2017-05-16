import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Avatar from './Avatar.jsx'
import '../less/roominfo.less'
class RoomInfo extends React.Component{
    constructor(props){
        super(props);
    }
    renderOnlineList(roomActiveList){
        let list = [];
        for(let key in roomActiveList){
            list.push(
                <li 
                    key = {key} 
                    className = 'roominfo-li' 
                    data-flex = 'main:left cross: center'
                    onDoubleClick = {() => this.props.changeRoom({
                        curRoom: roomActiveList[key]['nickname'],
                        isPrivate: true
                    })}
                >
                    <Avatar 
                        size = {30}
                        src = {roomActiveList[key]['avatar']}
                        nickname = {roomActiveList[key]['nickname']}
                    />
                    <span className = 'roominfo-li-right' data-flex = 'main:left' data-flex-box = '1'>
                        <span className = 'roominfo-li-nickname' data-flex-box = '1'>
                            {roomActiveList[key]['nickname']}
                        </span>
                        <span data-flex-box = '0'>
                            
                                {
                                    roomActiveList[key]['device'] === 'mobile' ? 
                                    <i className = 'icon roominfo-li-icon'>&#xe651;</i> : 
                                    <i className = 'icon roominfo-li-icon'>&#xe64b;</i>
                                }
                        </span>
                    </span>
                </li>
            )
        }
        return list;
    }
    render(){
        let { info, active, creater, name } = this.props.roomInfo.toJS();
        let user = this.props.user;
        return (
                <ReactCSSTransitionGroup
                    component = 'div'
                    transitionName = 'roominfo'
                    transitionEnterTimeout = {400}
                    transitionLeaveTimeout = {200}
                >
                    {
                        this.props.isShowRoomInfo ? 
                        <div 
                            className = 'roominfo'
                            style = {{
                                position: window.innerWidth > 581 ? 'static':'absolute',
                                right: '0',
                                background: window.innerWidth > 581 ? 'rgba(255,255,255,0.3)':'#fcfcfc',
                            }}
                        >
                            <div>
                                <div className = 'roominfo-bulletin scroll-hidden'>
                                <div>
                                    <span className = 'roominfo-title'>公告</span>
                                    <span className = 'roominfo-change-btn'>
                                        {
                                            user === creater ? 
                                            <i className = 'icon roominfo-icon' onClick = {() => this.props.getRoomInfo(name)}> &#xe681; </i> : 
                                            null
                                        }
                                    </span>
                                </div>
                                    <p>{info}</p>
                                </div>
                                <div className = 'hr'></div>
                                <div className = 'roominfo-list'>
                                    <div className = 'roominfo-list-header'>
                                        <span className = 'roominfo-title'>近期活跃</span>
                                        <span className = 'roominfo-change-btn' onClick = {() => this.props.setSearchUserState(true)}>
                                            <i className = 'icon roominfo-icon'>&#xe60f;</i>
                                        </span>
                                    </div>
                                    <ul className = 'roominfo-ul scroll-hidden'>
                                        {this.renderOnlineList(active)}
                                    </ul>
                                </div>
                            </div>
                        </div> 
                        : null
                    }
                </ReactCSSTransitionGroup>
        )
    }
}
export default RoomInfo;