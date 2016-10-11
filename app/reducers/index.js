import { combineReducers } from 'redux-immutable'
import pageState from './pageState.js'
import userState from './userState.js'
import messages from './messages.js'
import privateMessages from './privateMessages.js'
import setting from './setting.js'
import imageSlide from './imageSlide.js'
import storageExpressions from './storageExpressions.js'
import activeList from './activeList.js'
import roomList from './roomList.js'
import searchList from './searchList.js'
import roomCard from './roomCard.js'
import roomInfo from './roomInfo.js'
import userCard from './userCard.js'
import searchUser from './searchUser.js'

const rootReducer = combineReducers({
    pageState,
    userState,
    messages,
    privateMessages,
    setting,
    imageSlide,
    storageExpressions,
    activeList,
    roomList,
    searchList,
    roomCard,
    userCard,
    searchUser,
    roomInfo
});
export default rootReducer;