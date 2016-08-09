import R from 'ramda'

import { ADD_STORAGE_EXPRESSION, DELETE_STORAGE_EXPRESSION, INIT_STORAGE_EXPRESSION } from '../actions'

const defaultExp = 'http://oajmk96un.bkt.clouddn.com/1470361254005warn.gif';

export default function imageSlide(state = [defaultExp],action) {
    let deepCopy = R.clone(state);
    switch (action.type) {
        case INIT_STORAGE_EXPRESSION: {
            deepCopy =  deepCopy.concat(action.expressions);
            return R.uniq(deepCopy);
        }
        case ADD_STORAGE_EXPRESSION: {
            if(deepCopy.indexOf(action.expression) === -1){
                deepCopy =  deepCopy.concat(action.expression);
            }
            return deepCopy;
        }
        case DELETE_STORAGE_EXPRESSION: {
            let index = deepCopy.indexOf(action.expression);
            index != -1 ? deepCopy.splice(index,1) : null;
            return deepCopy;
        }
        default: {
            return state;
        }
    }
}