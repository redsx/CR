import React, {PropTypes} from 'react'

import HeadBar from '../containers/HeadBar.js'
import InputArea from '../containers/InputArea.js'
import Expressions from '../containers/Expressions.js'
import InfoCard from '../containers/InfoCard.js'
import Message from './Message.jsx'
import SystemMessage from './SystemMessage.jsx'


class ChatArea extends React.Component {
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.props === nextProps){
            return false;
        }
        return true;
    }
    componentDidUpdate(){
        let messageArea = this.refs.messageArea;
        setTimeout(function(){
            messageArea.scrollTop = messageArea.scrollHeight;
        },10)
    }
    render(){
        let { user, onlineUsers } = this.props;
        let messages = user.isPrivate?this.props.privateMessages:this.props.messages;
        messages = messages[user.curRoom] || [];
        return (
            <div data-flex = 'dir:top '>
                <InfoCard />
                <Expressions />
                <div data-flex-box = '0'>
                    <HeadBar />
                </div>
                <div data-flex-box = '8' ref = 'messageArea' style = {{
                    overflowY:'scroll'
                }}>
                    {
                        messages.map((item,index) => {
                            // avatar, timestamp, content, nickName
                            switch (item.type) {
                                case 'imageMessage':
                                case 'textMessage': {
                                    let message = {
                                        nickname: onlineUsers[item.nickname].nickname,
                                        timestamp: item.timestamp,
                                        content: item.content,
                                        type: item.type
                                    }
                                    message.avatar = user.nickname === item.nickname?user.avatar:onlineUsers[item.nickname].avatar;
                                    let dir = user.nickname === item.nickname ? 'right' : 'left';
                                    return <Message message={message} dir={dir} key={index} />
                                }
                                default:
                                    break;
                            }
                            
                        })
                    }
                </div>
                <div data-flex-box = '0'>
                    <InputArea />
                </div>
            </div>
        );
    }
}
ChatArea.propTypes = {
    messages: PropTypes.object,
    privateMessages: PropTypes.object,
    user: PropTypes.object,
    onlineUsers: PropTypes.object
}
export default ChatArea;