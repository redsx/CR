import Immutable from 'immutable'

import { ADD_STORAGE_EXPRESSION, DELETE_STORAGE_EXPRESSION, INIT_STORAGE_EXPRESSION } from '../actions'

let defaultExp = 'http://oajmk96un.bkt.clouddn.com/1470361254005warn.gif';
let defaultState = Immutable.fromJS([defaultExp]);

export default function storageExpressions(state = defaultState,action) {
    switch (action.type) {
        case INIT_STORAGE_EXPRESSION: {
            let expressions = Immutable.fromJS(action.expressions);
            if(expressions.includes(defaultExp)){
                return expressions;
            }
            return expressions.unshift(defaultExp);
        }
        case ADD_STORAGE_EXPRESSION: {
            if(state.includes(action.expression)){
                return state;
            }
            return state.concat(action.expression);
        }
        case DELETE_STORAGE_EXPRESSION: {
            return state.filter((val)=>{
                return (val != action.expression)
            });
        }
        default: {
            return state;
        }
    }
}