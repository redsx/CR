import Immutable from 'immutable'

import {
    SET_MENU_STATE,
    SET_EXPRESSION_STATE, 
    SET_INFOCARD_STATE, 
    ADD_EXPRESSION, 
    SHOW_INFO_CARD, 
    HIDDEN_INFO_CARD, 
    ADD_BADGE_COUNT, 
    CLEAR_BADGE_COUNT, 
    SET_LIST_STATE,
    SET_IMAGEEXP_STATE,
    SET_SCROLL_STATE,
    SET_SNACKBAR_STATE,
    SET_SYS_SETTING_STATE
} from '../actions'
let defaultState = {
    isShowMenu:true,
    isShowRoom:true,
    isShowImageExp: false,
    isNeedScroll: false,
    isShowSysSetting: false,
    expressionState: {
        moment:null,
        paused: true,
        reverse: false,
        isShow: false
    },
    infoCardState: {
        nickname: 'loading...',
        avatar: 'loading...',
        info: '...',
        isShow:false
    },
    expression: {
        timestamp: null,
        emoji:''
    },
    badgeCount: {},
    snackbar:{
        open: false,
        autoHideDuration: 3000
    }
}
defaultState = Immutable.fromJS(defaultState);
export default function pageState(state = defaultState,action) {
    switch(action.type){
        case SET_MENU_STATE: {
            return state.set('isShowMenu',action.menuState);
        }
        case SET_EXPRESSION_STATE: {
            let expressionState = Immutable.fromJS({expressionState:action.expressionState});
            return state.merge(expressionState);
        }
        case ADD_EXPRESSION: {
            let expression = Immutable.fromJS({expression: action.expression});
            return state.merge(expression);
        }
        case SHOW_INFO_CARD: {
            let infoCardState = Immutable.fromJS({infoCardState:action.user});
            return state.mergeDeep(infoCardState);
        }
        case HIDDEN_INFO_CARD: {
            return state.setIn(['infoCardState','isShow'],false);
        }
        case ADD_BADGE_COUNT: {
            let badgeCount = state.getIn(['badgeCount',action.room]) || 0;
            return state.setIn(['badgeCount',action.room],badgeCount+1);
        }
        case CLEAR_BADGE_COUNT: {
            return state.setIn(['badgeCount',action.room],0);
        }
        case SET_LIST_STATE: {
            return state.set('isShowRoom',action.isShow);
        }
        case SET_IMAGEEXP_STATE: {
            return state.set('isShowImageExp',action.isShow);
        }
        case SET_SCROLL_STATE: {
            return state.set('isNeedScroll',action.isNeedScroll);
        }
        case SET_SNACKBAR_STATE: {
            let snackbar = Immutable.fromJS({snackbar:action.state});
            return state.mergeDeep(snackbar);
        }
        case SET_SYS_SETTING_STATE: {
            return state.set('isShowSysSetting',action.state);
        }
        default: {
            return state;
        }
    }
}