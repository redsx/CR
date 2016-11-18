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
    SET_SYS_SETTING_STATE,
    SET_ROOM_INFO_STATE,
    SET_CREATE_ROOM_STATE,
    SET_SEARCH_USER_STATE,
    SET_RICHTEXT_STATE,
    SET_MODAL_STATE
} from '../actions'
let defaultState = {
    isShowMenu:true,
    isShowImageExp: false,
    isNeedScroll: false,
    isShowSysSetting: false,
    isShowRoomInfo: window.innerWidth > 980 ? true:false,
    isShowCreateRoom: false,
    isShowSearchUser: false,
    isShowExpression: false,
    isShowRichText: false,
    listState:'activeList',
    badgeCount: {},
    modalState: {
        modalInfo: {
            title: '',
            owner: '',
            timestamp: 0,
        },
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
            return state.set('isShowExpression',action.expressionState);
        }
        case SET_MODAL_STATE: {
            return state.set('modalState',Immutable.fromJS(action.info));
        }
        case SET_RICHTEXT_STATE: {
            return state.set('isShowRichText',action.richTextState);
        }
        case ADD_EXPRESSION: {
            let expression = Immutable.fromJS({expression: action.expression});
            return state.merge(expression);
        }
        case SHOW_INFO_CARD: {
            let infoCardState = Immutable.fromJS({infoCardState: action.state});
            return state.mergeDeep(infoCardState);
        }
        case HIDDEN_INFO_CARD: {
            return state.setIn(['infoCardState','isShow'],false);
        }
        case ADD_BADGE_COUNT: {
            let badgeCount = state.getIn(['badgeCount',action.room]) || 0;
            let count = (badgeCount + action.count) > 10 ? 'n' : (badgeCount + action.count);
            return state.setIn(['badgeCount',action.room],count);
        }
        case CLEAR_BADGE_COUNT: {
            return state.setIn(['badgeCount',action.room],0);
        }
        case SET_LIST_STATE: {
            return state.set('listState',action.isShow);
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
        case SET_ROOM_INFO_STATE: {
            return state.set('isShowRoomInfo',action.state);
        }
        case SET_CREATE_ROOM_STATE: {
            return state.set('isShowCreateRoom',action.state);
        }
        case SET_SEARCH_USER_STATE: {
            return state.set('isShowSearchUser',action.state);
        }
        default: {
            return state;
        }
    }
}