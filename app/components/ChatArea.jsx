import React, {PropTypes} from 'react'
import Immutable from 'immutable'

import HeadBar from '../containers/HeadBar.js'
import InputArea from '../containers/InputArea.js'
import Expressions from '../containers/Expressions.js'
import ImageExpressions from '../containers/ImageExpressions.js'
import InfoCard from '../containers/InfoCard.js'
import Message from '../containers/Message.js'
import SystemMessage from './SystemMessage.jsx'
import Drag from './Drag.jsx'
const styles = {
    tooltipBox: {
        display: 'none',
    },
    image: {
        width: '70px'
    }
}
class ChatArea extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            preScroll: 0
        }
    }
    scrollToBottom(){
        let messageArea = this.refs.messageArea;
        messageArea.scrollTop = messageArea.scrollHeight;
    }
    componentDidMount(){
        let messageArea = this.refs.messageArea,
            gif = this.refs.gif;
        messageArea.addEventListener('scroll',()=>{
            if(messageArea.scrollTop === messageArea.scrollHeight-messageArea.offsetHeight && gif.style.display != 'none'){
                gif.style.display = 'none';
            }
        })
    }
    componentWillReceiveProps(nextProps){
        if(!Immutable.is(this.props.onlineUsers,nextProps.onlineUsers)){
            this.setState({needScroll:false});
        } else{
            this.setState({needScroll:true});
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        let user = this.props.user.toJS(),
            isChange = user.isPrivate ?
            !Immutable.is(this.props.privateMessages.get(user.curRoom),nextProps.privateMessages.get(user.curRoom)) 
            : !Immutable.is(this.props.messages.get(user.curRoom),nextProps.messages.get(user.curRoom));
        if(!Immutable.is(this.props.user,nextProps.user) || !Immutable.is(this.props.onlineUsers,nextProps.onlineUsers) || isChange){
            return true;
        }
        return false;
    }
    componentDidUpdate(){
        let user = this.props.user.toJS(),
            isNeedScroll = this.props.isNeedScroll,
            setScrollState = this.props.setScrollState;
        let lastMessage,
            imglist,
            lastChild,
            childHeight,
            willScroll = true,
            preScroll = this.state.preScroll,
            messages = user.isPrivate ? this.props.privateMessages.toJS() : this.props.messages.toJS(),
            messageArea = this.refs.messageArea,
            gif = this.refs.gif,
            needScroll = this.state.needScroll;
        if(messageArea.scrollHeight > messageArea.offsetHeight){
            messages = messages[user.curRoom] || [];
            lastMessage = messages[messages.length -1] || {};
            imglist = messageArea.querySelectorAll('img');
            lastChild = messageArea.lastElementChild;
            childHeight = lastChild?lastChild.offsetHeight : 1;
            if(needScroll){
                // －30容错
                if( messageArea.offsetHeight <= preScroll - messageArea.scrollTop -30){
                    willScroll = false;
                }
                if( messageArea.scrollHeight !== preScroll + childHeight){
                    willScroll = true;
                }                
                if(lastMessage.nickname === user.nickname){
                    willScroll = true;            
                }
                if(isNeedScroll){
                    willScroll = true;
                    setScrollState(false);
                }
                if(willScroll){
                    if(imglist[imglist.length -1]){
                        imglist[imglist.length -1].addEventListener('load',(e)=>{
                            this.scrollToBottom();
                            this.setState({preScroll:messageArea.scrollHeight});
                        })
                    }
                    setTimeout(()=>{
                        this.scrollToBottom();
                        this.setState({preScroll:messageArea.scrollHeight});
                    },100)
                }
            }
            gif.style.display = willScroll?'none':'block';
        }
    }
    render(){
        let user = this.props.user.toJS(),
            onlineUsers = this.props.onlineUsers.toJS();
        let messages = user.isPrivate ? this.props.privateMessages.toJS() : this.props.messages.toJS();
        messages = messages[user.curRoom] || [];
        return (
            <div data-flex = 'dir:top '>
                <InfoCard />
                <Expressions />
                <div data-flex-box = '0'>
                    <HeadBar />
                </div>
                <div data-flex-box = '8' ref = 'messageArea' style = {{
                    overflowY: 'scroll',
                    paddingBottom: '20px'
                }}>
                    <div ref = 'gif' style = {styles.tooltipBox} >
                        <Drag 
                            x = {window.innerWidth - 70} 
                            y = {70} 
                            component = {
                                <div>
                                    <div style = {{position: 'relative'}}>
                                            <img 
                                                src= '/images/warn.gif'
                                                alt= '消息提示' 
                                                style = {styles.image} 
                                                draggable= 'false'
                                                onDoubleClick = {()=>{this.scrollToBottom()}}
                                            />
                                    </div>
                                </div>
                            }
                        />
                    </div>
                    {
                        messages.map((item,index) => {
                            // avatar, timestamp, content, nickName
                            switch (item.type) {
                                case 'imageMessage':
                                case 'textMessage': {
                                    if(onlineUsers[item.nickname]){
                                        let message = Immutable.fromJS({
                                            nickname: onlineUsers[item.nickname].nickname,
                                            avatar: onlineUsers[item.nickname].avatar,
                                            timestamp: item.timestamp,
                                            content: item.content,
                                            type: item.type,
                                            index: index
                                        })
                                        let dir = user.nickname === item.nickname ? 'right' : 'left';
                                        return <Message message = {message} dir = {dir} key = {index} />
                                    }
                                    return null;
                                }
                                case 'systemMessage': {
                                    return <SystemMessage content = {item.content || ''} key = {index}/>
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
                <div data-flex-box = '0'>
                    <ImageExpressions />
                </div>
            </div>
        );
    }
}
ChatArea.propTypes = {
    setScrollState: PropTypes.func,
    // messages: PropTypes.object,
    // privateMessages: PropTypes.object,
    // user: PropTypes.object,
    // onlineUsers: PropTypes.object,
    isNeedScroll: PropTypes.bool
}
export default ChatArea;
