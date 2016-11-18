
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'
const finalCreactStore = applyMiddleware(thunk)(createStore);
const store = finalCreactStore(reducer);
let unsubscribe = store.subscribe(() =>{
    // console.log('store监控:', store.getState().toJS())
}
);
export default store;
