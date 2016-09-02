import { combineReducers } from 'redux-immutable'
import pageState from './pageState.js'
import userState from './userState.js'
import onlineUsers from './onlineUsers.js'
import messages from './messages.js'
import privateMessages from './privateMessages.js'
import setting from './setting.js'
import imageSlide from './imageSlide.js'
import storageExpressions from './storageExpressions.js'
const rootReducer = combineReducers({
    pageState,
    userState,
    onlineUsers,
    messages,
    privateMessages,
    setting,
    imageSlide,
    storageExpressions
});
export default rootReducer;