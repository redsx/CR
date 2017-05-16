import React, {PropTypes} from 'react/'

import Menu from '../../components/Menu.jsx'
import Loading from '../../components/Loading.jsx'
import ChatArea from '../../containers/ChatArea.js'
import AudioGroup from '../../containers/AudioGroup.js'
import ImageSlide from '../../containers/ImageSlide.js'
import CreateRoom from '../../containers/CreateRoom.js'
import SearchUser from '../../containers/SearchUser.js'
import SystemSetting from '../../containers/SystemSetting.js'
import RichText from '../../containers/RichText.js'
import Modal from '../../containers/Modal.js'
import browser from '../../util/browser.js'
import api from '../../util/api.js';
import '../../less/indexpage.less';
import favico from '../../util/favicoNotification.js';
import {
    updateUserInfo,
    socket,
    getInitUserInfo,
    getInitOnlineUser,
    addOnlineUser,
    deleteLogoutUser,
    addMessage,
    getRoomHistory,
    changeUserInfo,
    addPrivateMessage,
    addCount,
    setAudioSrc,
    setAudioState,
    setNotificationState,
    setShieldUser,
    setSpecialUser,
    initStorageExpression,
    getActiveList,
    getRoomList,
    setListShow,
    searchRoom,
    changeRoom,
    addActiveItem,
    setBgImage,
    getRoomActiveInfo,
    searchUser,
    setLoadingState,
    setUserState,
    reconnect,
    logout,
    setSnackbarState
} from '../../actions'
import store from '../../store';
class Index extends React.Component{
    constructor(props){
        super(props);
        
        socket.on('privateMessage', (message) => {
            const state = store.getState().toJS();
            if (message.type === 'textMessage') {
                if (!cr.filterMsg(message.content)) {
                    return;
                }
                message.content = cr.filterMsg(message.content);
            }
            if (state.setting.shield.indexOf(message.nickname) === -1) {
                const audio = document.getElementById('audio1'),
                    audioSpecial = document.getElementById('audio3'),
                    avatar = message.avatar;
                message.room = message.nickname;
                if (state.pageState.listState !== 'activeList') {
                    store.dispatch(setListShow('activeList'));
                }
                store.dispatch(addPrivateMessage(message));
                state.userState.curRoom === message.room ? null : store.dispatch(addCount(message.room));
                if (!state['activeList'][message.room]) {
                    store.dispatch(addActiveItem({
                        roomName: message.room,
                        avatar: message.avatar,
                        isPrivate: true
                    }))
                }
                if (document.hidden) {
                    favico.addBage();
                    if (state.setting.audioNotification) {
                        state.setting.special.indexOf(message.nickname) === -1 ? audio.play() : audioSpecial.play();
                    }
                    state.setting.h5Notification ? notification.showNotification(message.nickname, {
                        body: message.type === 'pluginMessage' ? '[plugin]' : message.content,
                        icon: message.avatar,
                    }) : null;
                } else if (state.setting.audioNotification && state.userState.curRoom !== message.room) {
                    state.setting.special.indexOf(message.nickname) === -1 ? audio.play() : audioSpecial.play();
                }
            }
        });
        socket.on('newMessage', (message) => {
            const state = store.getState().toJS();
            if (message.type === 'textMessage') {
                if (!cr.filterMsg(message.content)) {
                    return;
                }
                message.content = cr.filterMsg(message.content);
            }
            if (state.setting.shield.indexOf(message.nickname) === -1) {
                const audio = document.getElementById('audio1'),
                    audioSpecial = document.getElementById('audio3'),
                    avatar = message.avatar,
                    reg = new RegExp('@' + state.userState.nickname, 'g');
                store.dispatch(addMessage(message));
                state.userState.curRoom === message.room ? null : store.dispatch(addCount(message.room));
                if (!state['activeList'][message.room]) {
                    store.dispatch(addActiveItem({
                        roomName: message.room,
                        avatar: state['roomList'][message.room]['avatar'],
                        isPrivate: false
                    }))
                }
                if (document.hidden) {
                    favico.addBage();
                    if (state.setting.audioNotification) {
                        state.setting.special.indexOf(message.nickname) !== -1 || reg.test(message.content) ? audioSpecial.play() : audio.play();
                    }
                    state.setting.h5Notification && !(message.nickname === state.userState.nickname) ? notification.showNotification(message.nickname, {
                        body: message.type === 'pluginMessage' || message.nickname === config.PLUGIN_ROBOT ? '[plugin]' : message.content,
                        icon: message.avatar,
                    }) : null;
                } else if (!(message.nickname === state.userState.nickname) && state.setting.audioNotification && state.userState.curRoom !== message.room) {
                    state.setting.special.indexOf(message.nickname) !== -1 || reg.test(message.content) ? audioSpecial.play() : audio.play();
                }
            }
        });

        socket.on('forcedOffline', () => {
            store.dispatch(logout());
            alert('账号在其他设备登录');
        });
        socket.on('disconnect', () => {
            console.log('disconnect');
            const state = store.getState().toJS();
            favico.errorBage();
            store.dispatch(setSnackbarState({
                content: '掉线重连中...',
                open: true,
                autoHideDuration: 61 * 1000
            }));
        })

        socket.on('reconnect_failed', () => {
            console.log('重连失败');
        })

        socket.on('reconnect', () => {
            const state = store.getState().toJS();
            store.dispatch(setSnackbarState({
                content: '掉线重连成功',
                open: false,
                autoHideDuration: 3000
            }));
            favico.resetBage();
            console.log('断线重连成功');
            // offline为断线重连，需要重新init
            if (state.userState.state === 'offline') {
                const token = state.userState.token;
                if (!token) {
                    return this.props.history.push('/login');
                }
                reconnect(token).then((() => {
                    store.dispatch(setUserState('online'));
                    return this.handleInit({
                        token
                    });
                })).catch((err) => {
                    console.log(err);
                    return this.props.history.push('/login');
                })

            }

        })
        socket.on('reconnecting', () => {
            const userState = store.getState().get('userState').toJS();
            if (userState.state !== 'logout') {
                store.dispatch(setUserState('offline'));
            }
            console.log('重新连接...');
        })
    }
    handleReadLocalSetting(nickname){
        let storage = localStorage.getItem(nickname);
        storage = storage ? JSON.parse(storage) : {};
        let setting = storage.setting;
        if (setting) {
            store.dispatch(setNotificationState(setting.h5Notification));
            store.dispatch(setAudioState(!!(setting.audioNotification)));
            store.dispatch(setShieldUser({
                user: setting.shield,
                isAdd: true
            }));
            store.dispatch(setBgImage(setting.bgImage));
            store.dispatch(setSpecialUser({
                user: setting.special,
                isAdd: true
            }));
        };
        if (storage.expressions) {
            store.dispatch(initStorageExpression(storage.expressions));
        }
    }
    handleInit(info){
        store.dispatch(setLoadingState(true));
        getActiveList(info.token)(store.dispatch).then((res) => {
            return getRoomList(info.token)(store.dispatch);
        }).then(() => {
            return getInitUserInfo(info)(store.dispatch);
        }).then((resault) => {
            this.handleReadLocalSetting(resault.nickname);
            window.cr = new api(resault, function (message) {
                store.dispatch(addMessage(message))
            });

            return changeRoom({
                curRoom: resault.curRoom,
                isPrivate: resault.isPrivate
            })(store.dispatch, store.getState);
        }).then(() => {
            store.dispatch(setLoadingState(false));
        }).catch((err) => {
            console.log(err);
            this.props.history.push('/login');
        })
    }
    handleEnter(){
        const token = localStorage.getItem('token');
        const device = browser.versions.mobile ? 'mobile' : 'PC';
        if (token) {
            return this.handleInit({
                token,
                device
            });
        } else {
            this.props.history.replace({
                pathname: '/login'
            });
        }
    }
    componentDidMount() {
        let handle = null;
        let rightBox = this.refs.rightBox;
        window.addEventListener('resize',(event) => {
            if(window.innerWidth>980){
                handle && clearTimeout(handle);
                handle = setTimeout(function () {
                    rightBox.style.width = window.innerWidth - 275 + 'px'
                },200)
            }
            if(browser.versions.mobile){
                this.props.setScrollState(true);
            }
            if(this.props.isShowRoomInfo && window.innerWidth < 581){
                this.props.setRoomInfoState(false);
            }
        });
        window.addEventListener('unload',(event) => {
            let info = this.props.userState? this.props.userState.toJS() : {};
            updateUserInfo({
                nickname: info.nickname,
                lastRoom: info.curRoom,
                isPrivate: info.isPrivate
            });
        });
        this.handleEnter();        
    }
    //背景图片可控制
    render(){
        return (
            <div style = {{
                backgroundImage: 'url(' + this.props.bgImage + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(245,245,245,1)',
            }}>
                
                <div 
                    className = {this.props.menuState?'left-box':'left-box-show'}
                >
                    <Menu />
                </div>
                <div 
                    className = {this.props.menuState?'right-box':'right-box-show'}
                    ref = 'rightBox'
                    style = {{
                        width: window.innerWidth - 275 + 'px'
                    }}
                >
                    <div data-flex = 'main:center box:mean' style = {{height:'100%'}}>
                    {
                        this.props.loadingState ?  <Loading color = '#ccc'/> : <ChatArea />
                    }
                    </div>
                </div>
                <SystemSetting />
                <ImageSlide />
                <AudioGroup />
                <CreateRoom />
                <SearchUser />
                <RichText />
                <Modal />
            </div>
        );
    }
}



export default Index;
