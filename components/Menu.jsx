import React from 'react';

import SelfInfo from '../containers/SelfInfo.js'
import FriendList from '../containers/FriendList.js'

const styles = {
    block1: {
        height: '100%',
    },
    block3: {
        background:'rgb(12,137,288)',
        height: '100%'
    },
    block4: {
        background:'rgb(239,240,245)',
        height: '100%'
    }
}
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
            <div data-flex = 'main:center' style = {styles.block1} className = 'xs-hidden'>
                <div data-flex = 'main:center box:mean' data-flex-box = '0' style = {styles.block3}>
                    <SelfInfo />
                </div>
                <div data-flex = 'main:center box:mean' data-flex-box = '3' style = {styles.block4}>
                    <FriendList />
                </div>
            </div>
        );
    }
}
export default Menu;