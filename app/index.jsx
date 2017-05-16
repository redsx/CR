import 'babel-polyfill'

import React, {
    PropTypes
} from 'react'
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'
import {
    render
} from 'react-dom'
import {
    Provider
} from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Index from './pages/index/'

import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Snackbar from './containers/Snackbar.js'
import Login from './pages/login/Login.jsx'
import SignUp from './pages/signup/SignUp.jsx'
import './less/app.less'


import store from './store'

import {
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
    setSnackbarState,
    setHistory
} from './actions'

import notification from './util/notification.js'
import favico from './util/favicoNotification.js'
import browser from './util/browser.js'
import api from './util/api.js'
import config from './plugins/config.js'
import Immutable from 'immutable'

favico.resetWhenDocVisibility();
notification.requestPermission();



// socket.on('connect', () => {
//     const state = store.getState().toJS();
//     // 用户状态暂定为logout、enter、offline、online，其中offline为断线重连时需要重新init，并标记为online状态
//         console.log('connect: ',state.userState.nickname);
// })

class App extends React.Component {
    constructor(props) {
        super(props);
        setHistory(props.history);
    }
    render() {      
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div className = 'container'>
                    <ReactCSSTransitionGroup
                            component = 'div'
                            transitionName = 'page'
                            transitionEnterTimeout = {500}
                            transitionLeaveTimeout = {500}
                    >    
                        <Route exact path= '/' component= {Index}/>
                        <Route path= '/login' component= {Login} />
                        <Route path= '/signUp' component= {SignUp} />
                    </ReactCSSTransitionGroup>
                    <Snackbar />
                </div>
            </MuiThemeProvider>
        );
    }
}
App.propTypes = {
    menuState: PropTypes.bool,
}
injectTapEventPlugin();
render(
    <Provider store={store}>
        <div>
            <BrowserRouter>
               <div>         
                   <Route path = '/' component = {App} >                                                
                   </Route>
               </div>
            </BrowserRouter>
        </div>
    </Provider>,
    document.getElementById('App')
)