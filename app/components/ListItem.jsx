import React, {PropTypes} from 'react'

import pureMixin from '../mixin/pureMixin.js'

import Avatar from '../containers/Avatar.js'
import '../less/listitem.less'

class ListItem extends React.Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = pureMixin.bind(this);
    }
    closeMenu(){
        if(window.innerWidth < 980){
            this.props.setMenuState(true);
        }
    }
    render(){
        let { text, avatar, badgeCount, isSelect ,needBtn} = this.props;
        return (
            <li
                className = {isSelect? 'listitem-li-select' : 'listitem-li'}
                data-flex = 'main:left cross:center'
            >
                <Avatar 
                    src = {avatar}
                    size = {39}
                    nickname = ''
                    mode = ''
                />
                <div
                    data-flex = 'main:left cross:center'
                    data-flex-box = '1'
                >
                    <div 
                        className = 'listitem-span' 
                        data-flex-box = '1'
                        onClick = {() => this.props.handleTextClick()}
                    >
                        <span>{text}</span>
                    </div>
                    {
                        badgeCount ?
                        <span
                            className = 'listitem-fl-notification'
                        >
                            {badgeCount}                                
                        </span>
                        : null
                    }
                    {
                        needBtn && !isSelect? 
                        <div 
                            data-flex-box = '0' 
                            className = 'listitem-icon-box'
                            onClick = {() => this.props.handleBtnClick()}
                        >
                            <i className = 'listitem-icon'>&#xe672;</i>
                        </div>
                        : null
                    }
                </div>
            </li>
        );
    }
}
export default ListItem;