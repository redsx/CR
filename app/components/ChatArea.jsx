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
        this.preScroll = 0;
        this.isMount = false;
        this.state = {
            needScroll: true,
            loadingHeight: 0,
            loadingState: '',
            isLoaded: false,
            isTouching: false,
            isValid: false, //是否生效,拉到指定值生效，生效才加载
            startY: 0,
        }
    }
    scrollToBottom(){
        let messageArea = this.messageArea;
        messageArea.scrollTop = messageArea.scrollHeight;
    }
    handleLoad(){
        let user = this.props.user.toJS();
        if(user.isPrivate){
            this.props.getPrivateHistory().then((isLoadALL) => {
                if(isLoadALL){
                    this.setState({
                        loadingState: 'loadedAll',
                        loadingHeight: 0
                    })
                } else{
                    this.setState({
                        loadingState: 'loadedSuccess',
                        loadingHeight: 0
                    })
                }
            }).catch(() => {
                this.setState({
                    loadingState: 'loadedError',
                    loadingHeight: 0
                })
            });
        } else{
            this.props.getRoomHistory().then((isLoadALL) => {
                if(isLoadALL){
                    this.setState({
                        loadingState: 'loadedAll',
                        loadingHeight: 0
                    })
                } else{
                    this.setState({
                        loadingState: 'loadedSuccess',
                        loadingHeight: 0
                    })
                }
            }).catch(() => {
                this.setState({
                    loadingState: 'loadedError',
                    loadingHeight: 0
                })
            });
        }
    }
    componentDidMount(){
        this.isMount = true;
        let messageArea = this.messageArea,
            gif = this.gif,
            scrollTimer = null,
            loadHistoryHandle = null,
            user = this.props.user.toJS(),
            showLoadBtnTimer = null,
            needScrollTimer = null,
            messages = this.props.messages.toJS();
        if(this.props.isNeedScroll){
            this.scrollToBottom();
            this.props.setScrollState(false);
        }
        document.addEventListener('mouseup',(e) => {
            if(this.isMount){
                this.handleMouseUp(e);
            }
        });
        document.addEventListener('touchend',(e) => {
            if(this.isMount){
                this.handleTouchEnd(e);
            }
        })
        messageArea.addEventListener('scroll',()=>{
            if(messageArea.scrollTop === messageArea.scrollHeight-messageArea.offsetHeight){
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
    shouldComponentUpdate(nextProps,nextState){
        let isUserChange = !Immutable.is(this.props.user,nextProps.user),
            isMessageChange = !Immutable.is(this.props.messages,nextProps.messages),
            isScrollStateChange = this.props.isNeedScroll !== nextProps.isNeedScroll,
            isLoadingHeightChange = this.state.loadingHeight !== nextState.loadingHeight,
            isLoadingStateChange = this.state.loadingState !== nextState.loadingState;
        if(isUserChange  || isMessageChange || isScrollStateChange || isLoadingHeightChange || isLoadingStateChange){
            return true;
        }
        return false;
    }
    componentDidUpdate(){
        if(this.isMount){
            let user = this.props.user.toJS(),
                isNeedScroll = this.props.isNeedScroll,
                setScrollState = this.props.setScrollState;
            let lastMessage,
                imglist,
                lastChild,
                childHeight,
                willScroll = true,
                preScroll = this.preScroll,
                messages = this.props.messages.toJS(),
                messageArea = this.messageArea,
                gif = this.gif,
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
                        // 图片加载完成才滚动到末尾
                        if(imglist[imglist.length -1]){
                            imglist[imglist.length -1].addEventListener('load',(e)=>{
                                this.scrollToBottom();
                                this.preScroll = messageArea.scrollHeight;
                            })
                        }
                        setTimeout(()=>{
                            this.scrollToBottom();
                            this.preScroll = messageArea.scrollHeight;
                        },100)
                    }
                }
                gif.style.display = willScroll?'none':'block';
            }
        }
    }
    componentWillUnmount(){
        this.isMount = false;
    }
    pullStart(startY){
        if(this.messageArea.scrollTop === 0 && this.state.loadingState !== 'loadedAll'){
            this.setState({
                needScroll: false,
                isTouching: true,
                loadingState: 'readyLoading',
                startY
            });
        }
    }
    handleTouchStart(e){
        this.pullStart(e.touches[0].pageY);
    }
    handleMouseDown(e){
        this.pullStart(e.pageY);
    }
    pulling(e,pageY){
        if(this.state.isTouching){
            let pHeight = this.state.loadingHeight || 1,
                nHeight = pageY - this.state.startY;
            if(nHeight > 6){
                // 防止浏览器下拉刷新，chrome浏览器中大概是15PX的下拉后触发默认刷新，微信中大概是6像素
                e.preventDefault();
            }
            if(!this.state.isValid && nHeight > 60){
                this.setState({
                    isValid: true,
                    loadingState: 'releaseLoading',
                });
            }
            this.setState({loadingHeight: nHeight});
        }
    }
    handleTouchMove(e){
        this.pulling(e,e.touches[0].pageY)
    }
    handleMouseMove(e){
        this.pulling(e,e.pageY);
    }
    pullEnd(){
        if(this.state.isValid){
            this.setState({
                isTouching: false,
                isValid: false,
                loadingState: 'loading',
                loadingHeight: 50,
            })
            this.handleLoad();
        } else{
            this.setState({
                isTouching: false,
                loadingHeight: 0,
            })
        }
    }
    handleTouchEnd(e){
        this.pullEnd()
    }
    handleMouseUp(e){
        this.pullEnd()
    }
    renderLoadingContent(){
        switch(this.state.loadingState){
            case 'readyLoading': {
                return (
                    <span className = 'chatarea-loading-content'>
                        <i className = 'chatarea-loading-icon'>&#xe6bc;</i>
                        <span>下拉加载更多</span>
                    </span>
                )
            }
            case 'releaseLoading': {
                return (
                    <span className = 'chatarea-loading-content'>
                        <i className = 'chatarea-loading-icon'>&#xe6bd;</i>
                        <span>释放加载更多</span>
                    </span>
                )
            }
            case 'loading': {
                return (
                    <span className = 'chatarea-loading-content'>
                        <i className = 'chatarea-loading-icon'>&#xe6be;</i>
                        <span>正在加载</span>
                    </span>
                )
            }
            case 'loadedSuccess': {
                return (
                    <span className = 'chatarea-loading-content'>
                        <i className = 'chatarea-loading-icon'>&#xe6bf;</i>
                        <span>加载成功</span>
                    </span>
                )
            }
            case 'loadedError': {
                return (
                    <span className = 'chatarea-loading-content'>
                        <i className = 'chatarea-loading-icon'>&#xe6bb;</i>
                        <span>加载失败</span>
                    </span>
                )
            }
            case 'loadedAll': {
                <span className = 'chatarea-loading-content'>
                    <i className = 'chatarea-loading-icon'>&#xe6bb;</i>
                    <span>已经全部加载</span>
                </span>
            }

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
                        <div className = 'chatarea-bottom ' onClick = {() => this.scrollToBottom()} ref = {gif => this.gif = gif}>
                            <span> <i className = 'icon chatarea-icon'>&#xe619;</i> 有新消息</span>
                        </div>
                        <div
                            className = {this.state.isTouching? 'chatarea-loading':'chatarea-loading'+' chatarea-loading-anim'}
                            data-flex-box = '0'
                            style = {{
                                height: this.state.loadingHeight
                            }}
                        >
                            {this.renderLoadingContent()}
                            
                        </div>
                        <div 
                            data-flex-box = '8' 
                            onTouchStart = {(e) => this.handleTouchStart(e)}
                            onTouchMove = {(e) => this.handleTouchMove(e)}
                            onMouseDown = {(e) => this.handleMouseDown(e)}
                            onMouseMove = {(e) => this.handleMouseMove(e)}
                            ref = {messageArea => this.messageArea = messageArea} 
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