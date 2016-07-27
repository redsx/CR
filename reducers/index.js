import { combineReducers } from 'redux'
import pageState from './pageState.js'
import userState from './userState.js'
import onlineUsers from './onlineUsers.js'
import messages from './messages.js'
import privateMessages from './privateMessages.js'
import setting from './setting.js'
const rootReducer = combineReducers({
    pageState,
    userState,
    onlineUsers,
    messages,
    privateMessages,
    setting
});
export default rootReducer;