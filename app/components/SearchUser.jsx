import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Avatar from './Avatar.jsx'

import '../less/searchuser.less'

class SearchUser extends React.Component{
    constructor(props){
        super(props);
    }
    renderUserList(){
        let userList = this.props.userList.toJS();
        let list = [];
        for(let key in userList){
            list.push(
                <li 
                    key = {key} 
                    className = 'searchuser-li'
                    onClick = {() => {
                        this.props.changeRoom({
                            curRoom: userList[key]['nickname'],
                            isPrivate: true
                        });
                        this.props.setSearchUserState(false);
                    }}
                >
                    <Avatar
                        size = {40}
                        src = {userList[key]['avatar']}
                        nickname = {userList[key]['nickname']}
                        radius = {4}
                    />
                    <h4 className = 'searchuser-nickname'>{userList[key]['nickname']}</h4>
                </li>
            )
        }
        return list;
    }
    handleClick(){
        let user = this.refs.userName.value.trim();
        this.props.searchUser({user: user});
    }
    render(){
        return (
            <ReactCSSTransitionGroup
                component = 'div'
                transitionName = 'searchuser'
                transitionEnterTimeout = {300}
                transitionLeaveTimeout = {300}
            >
                {
                    !this.props.isShow? null :
                    <div className = 'searchuser'> 
                        <div className = 'searchuser-container'>
                            <div className = 'searchuser-header' data-flex = 'main: left'>
                                <span data-flex-box = '0'>搜索用户</span>
                                <span data-flex-box = '1' data-flex = 'main: right'>
                                    <span data-flex-box = '1'></span>
                                    <i 
                                        data-flex-box = '0' 
                                        className = 'icon'
                                        onClick = {() => this.props.setSearchUserState(false)}
                                    >
                                        &#xe672;
                                    </i>
                                </span>
                            </div>
                            <div className = 'searchuser-form'>
                                <div className = 'searchuser-input-group'>
                                    <input className = 'searchuser-input' type= 'text' ref = 'userName'/>
                                </div>
                                <button className = 'searchuser-btn' onClick = {() => this.handleClick()}>搜索</button>
                            </div>
                            <div className = 'searchuser-list-container'>
                                <ul className = 'searchuser-ul scroll-show'>
                                    {this.renderUserList()}
                                </ul>
                            </div>
                        </div> 
                        <div 
                            className = 'searchuser-close' 
                            onClick = {() => this.props.setSearchUserState(false)}
                        >
                        </div>
                    </div>
                }
            </ReactCSSTransitionGroup>
        )
    }
}

export default SearchUser;