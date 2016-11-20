import React, {PropTypes} from 'react'
import Immutable from 'immutable'

import HeadBar from '../containers/HeadBar.js'
import InputArea from '../containers/InputArea.js'
import Expressions from '../containers/Expressions.js'
import ImageExpressions from '../containers/ImageExpressions.js'
import InfoCard from '../containers/InfoCard.js'
import TextMessage from './TextMessage.jsx'
import SystemMessage from './SystemMessage.jsx'
import CodeMessage from '../containers/CodeMessage.js'
import Drag from './Drag.jsx'
import RoomInfo from '../containers/RoomInfo.js'
import api from '../plugins'
import ImageMessage from '../containers/ImageMessage.js'

// import Loading from './Loading.jsx'

import '../less/scroll.less'
import '../less/chatarea.less'

class ChatArea extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            preScroll: 0,
            needScroll: true,
            loadedAll: false,
            showLoadBtn: false
        }
    }
    scrollToBottom(){
        let messageArea = this.refs.messageArea;
        messageArea.scrollTop = messageArea.scrollHeight;
    }
    handleLoad(){
        let user = this.props.user.toJS();
        if(user.isPrivate){
            this.props.getPrivateHistory().then((isLoadALL) => {
                if(isLoadALL){
                    this.setState({
                        loadedAll: true
                    })
                }
            });
        } else{
            this.props.getRoomHistory().then((isLoadALL) => {
                if(isLoadALL){
                    this.setState({
                        loadedAll: true
                    })
                }
            });
        }
    }
    componentDidMount(){
        let messageArea = this.refs.messageArea,
            gif = this.refs.gif,
            scrollTimer = null,
            loadHistoryHandle = null,
            user = this.props.user.toJS(),
            showLoadBtnTimer = null,
            needScrollTimer = null,
            messages = this.props.messages.toJS();
        messageArea.addEventListener('scroll',()=>{
            if(messageArea.scrollTop < 20 && messageArea.scrollTop > 0){
                if(this.state.showLoadBtn === false){
                    this.setState({
                        showLoadBtn: true,
                        needScroll: false
                    });
                    //暂时解决了出现加载按钮后自己发消息不回滚动到末位的问题
                    showLoadBtnTimer && clearTimeout(showLoadBtnTimer);
                    needScrollTimer && clearTimeout(needScrollTimer);
                    showLoadBtnTimer = setTimeout(() => {
                        this.setState({
                            showLoadBtn: false
                        });
                    },2000);
                    needScrollTimer = setTimeout(() => {
                        this.setState({
                            needScroll: true
                        });
                    },2500);
                }
            }
            if(messageArea.scrollTop === messageArea.scrollHeight-messageArea.offsetHeight){
                this.setState({needScroll: true});
                gif.style.display = 'none';
            }
            if(messageArea.className = 'scroll-show'){
                scrollTimer && clearTimeout(scrollTimer);
                scrollTimer = setTimeout(()=>{
                    messageArea.className = 'scroll-hidden';
                },1000)
            } else{
                messageArea.className = 'scroll-show';
            }
        })
    }
    componentWillReceiveProps(nextProps){
        if(!Immutable.is(this.props.user,nextProps.user)){
            if(this.state.loadedAll){
                this.setState({
                    loadedAll: false
                });
            }
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        let isChange = this.state.showLoadBtn !== nextState.showLoadBtn;
        if(isChange || !Immutable.is(this.props.user,nextProps.user)  || !Immutable.is(this.props.messages,nextProps.messages)){
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
            messages = this.props.messages.toJS(),
            messageArea = this.refs.messageArea,
            gif = this.refs.gif,
            needScroll = this.state.needScroll;
        if(messageArea.scrollHeight > messageArea.offsetHeight){
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
                if(isNeedScroll){
                    willScroll = true;
                    setScrollState(false);
                }
                if(lastMessage.nickname === user.nickname){
                    willScroll = true;
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
        let user = this.props.user.toJS();
        let messages = this.props.messages.toJS() || [];
        if(!api.timestamp && messages[messages.length -1]){
                api.timestamp = messages[messages.length -1]['timestamp'];
        }
        return (
            <div data-flex = 'dir:top '>
                <InfoCard />
                <Expressions />
                <div data-flex-box = '0'>
                    <HeadBar />
                </div>
                <div data-flex = 'main:center' data-flex-box = '1'>
                    <div data-flex = 'dir:top' data-flex-box = '1' className = 'chatarea-messages'>
                        <div className = 'chatarea-bottom ' onClick = {() => this.scrollToBottom()} ref = 'gif'>
                            <span> <i className = 'icon chatarea-icon'>&#xe619;</i> 有新消息</span>
                        </div>
                        {
                            this.state.showLoadBtn && !this.state.loadedAll ?
                            <div className = 'chatarea-load' onClick = {() => this.handleLoad()}>
                                <span> <i className = 'icon chatarea-icon'>&#xe616;</i> 加载更多</span>
                            </div>
                            : null
                        }
                        
                        <div 
                            data-flex-box = '8' 
                            ref = 'messageArea' 
                            style = {{
                                overflowY: 'scroll',
                                paddingBottom: '2px'
                            }}
                        >
                            {
                                messages.map((item,index) => {
                                    let dir = user.nickname === item.nickname ? 'right' : 'left';
                                    const boxInfo = Immutable.fromJS({
                                        nickname:item.nickname,
                                        avatar:item.avatar,
                                        timestamp:item.timestamp,
                                        dir
                                    })
                                    switch (item.type) {
                                        case 'imageMessage': {
                                            return <ImageMessage 
                                                key = {index}
                                                index = {index}
                                                content = {item.content}
                                                info = {boxInfo}
                                            />
                                        }
                                        case 'textMessage': {
                                            return <TextMessage 
                                                info = {boxInfo} 
                                                content = {item.content} 
                                                key = {index} 
                                            />
                                        }
                                        case 'codeMessage': {
                                            return <CodeMessage 
                                                info = {boxInfo} 
                                                content = {item.content} 
                                                key = {index} 
                                            />
                                        }
                                        case 'pluginMessage': {
                                            const messageInfo=(function plugin(){
                                                let isNew= false;
                                                if(item.timestamp > api.timestamp) {
                                                    isNew = true;
                                                    api.timestamp = item.timestamp;
                                                }
                                                const message={content:item.content,from:{username:item.nickname},isNew};

                                                const ret=api.getPluginMessageInfo(message);
                                                if(ret){
                                                    ret.isNew=isNew;
                                                }            
                                                return ret;            
                                            })();
                                            
                                            return <api.PluginMessage 
                                                        key = {index}
                                                        name={messageInfo.name} 
                                                        content={messageInfo.content} 
                                                        isNew={messageInfo.isNew} 
                                                        boxInfo = {boxInfo}
                                                    /> ;
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
                    <div data-flex-box = '0' className = 'chatarea-room-list'>
                        { user.isPrivate ? null : <RoomInfo />}
                    </div>
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
    isNeedScroll: PropTypes.bool
}
export default ChatArea;
