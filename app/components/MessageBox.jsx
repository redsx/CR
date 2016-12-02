import React, {PropTypes} from 'react'
import pureMixin from '../mixin/pureMixin.js'
import Avatar from '../containers/Avatar.js'

import '../less/message.less'
 
 
class MessageBox extends React.Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = pureMixin.bind(this);
    }
    dealTimestamp(timestamp){
        let time = new Date(timestamp);
        let hours = time.getHours()>9 ? time.getHours() : '0'+time.getHours();
        let minu = time.getMinutes()>9 ? time.getMinutes() : '0'+time.getMinutes();
        let sec = time.getSeconds()>9 ? time.getSeconds() : '0'+time.getSeconds();
        return hours+':'+minu+':'+sec;
    }
    render(){
        let { nickname, dir, avatar, timestamp, isLoading } = this.props.info.toJS();
        let time = this.dealTimestamp(timestamp);
        return (
            <div data-flex={'dir:'+dir} className="message-list-item">
                <div data-flex={'dir:'+dir} data-flex-box = '0' className = 'message-container'>
                    <div data-flex-box = '0' data-flex = 'main:top cross:top' className = 'avatar-container'>
                        <Avatar
                            src = {avatar}
                            size = {39}
                            nickname = {nickname}
                            mode = {dir === 'left' ? 'menu':'profile'}
                        />
                    </div>
                    <div style = {{
                        padding:'0 10px',
                        width: '100%',
                        textAlign:dir
                    }}>
                        <span className = 'message-nickname-box'>
                            <span className = 'message-nickname'>{nickname}</span>
                            <span>{time}</span>
                        </span>
                        <div className = 'message'>
                            {this.props.messageContent}
                            <div className = {dir === 'left' ? 'triangle-left-outer' : 'triangle-right-outer'}></div>
                            <div className = {dir === 'left' ? 'triangle-left-inner' : 'triangle-right-inner'}></div>
                            {
                                isLoading?
                                <div className = {'message-loading-' + dir}>
                                    <img className = 'message-loading-image' src = 'http://cr.mdzzapp.com/hourglass.svg' />
                                </div>
                                :null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
MessageBox.propType = {
    dir: PropTypes.string,
    avatar: PropTypes.string,
    nickname: PropTypes.string,
    timestamp: PropTypes.number
}
export default MessageBox;