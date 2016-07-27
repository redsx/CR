import R from 'ramda'

import { SET_MENU_STATE, SET_EXPRESSION_STATE, SET_INFOCARD_STATE, ADD_EXPRESSION, SHOW_INFO_CARD, HIDDEN_INFO_CARD, ADD_BADGE_COUNT, CLEAR_BADGE_COUNT, SET_LIST_SHOW } from '../actions'
const defaultState = {
    isShowMenu:true,
    isShowRoom:true,
    expressionState: {
        moment:null,
        paused: true,
        reverse: false,
        isShow: false
    },
    infoCardState: {
        nickname: 'loading...',
        avatar: 'loading...',
        info: 'loading...',
        isShow:false
    },
    expression: {
        timestamp: null,
        emoji:''
    },
    badgeCount: {}
}
export default function pageState(state = defaultState,action) {
    let deepCopy = R.clone(state);
    switch(action.type){
        case SET_MENU_STATE: {
            return Object.assign({},deepCopy,{
                isShowMenu:action.menuState
            })
        }
        case SET_EXPRESSION_STATE: {
            return Object.assign({},deepCopy,{
                expressionState:action.expressionState
            })
        }
        case ADD_EXPRESSION: {
            return Object.assign({},deepCopy,{
                expression: action.expression
            })
        }
        case SHOW_INFO_CARD: {
            return Object.assign({},deepCopy,{
                infoCardState:action.user
            })
        }
        case HIDDEN_INFO_CARD: {
            return Object.assign({},deepCopy,{
                infoCardState:action.user
            })
        }
        case ADD_BADGE_COUNT: {
            deepCopy.badgeCount[action.room]? deepCopy.badgeCount[action.room]++ : deepCopy.badgeCount[action.room] = 1
            return deepCopy;
        }
        case CLEAR_BADGE_COUNT: {
            deepCopy.badgeCount[action.room] = 0;
            return deepCopy;
        }
        case SET_LIST_SHOW: {
            deepCopy.isShowRoom = action.isShow;
            return deepCopy;
        }
        default: {
            return state;
        }
    }
}