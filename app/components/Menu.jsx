import React from 'react';

import SelfInfo from '../containers/SelfInfo.js'
import FriendList from '../containers/FriendList.js'
import '../less/menu.less'

class Menu extends React.Component {
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.props === nextProps){
            return false;
        }
        return true;
    }
    render(){
        return (
            <div data-flex = 'main:center' className = 'block1' className = 'xs-hidden'>
                <div data-flex = 'main:center box:mean' data-flex-box = '0' className = 'block3' >
                    <SelfInfo />
                </div>
                <div data-flex = 'main:center box:mean' data-flex-box = '3' className = 'block4'>
                    <FriendList />
                </div>
            </div>
        );
    }
}
export default Menu;