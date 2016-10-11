import React, {PropTypes} from 'react'

import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'

class SpecialSetting extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            codyMode: false
        }
    }
    handleSend(){
        this.props.changeRoom({
            isPrivate: true,
            curRoom: this.props.userInfo.get('nickname')
        });
        this.props.hiddenInfoCard();
    }
    handleShield(){
        let nickname = this.props.userInfo.get('nickname');
        this.props.setShieldUser({
            isAdd: !this.props.shield.includes(nickname),
            user: nickname
        });
        this.props.storageSetting();
    }
    handleSpecial(){
        let nickname = this.props.userInfo.get('nickname');
        this.props.setSpecialUser({
            isAdd: !this.props.special.includes(nickname),
            user: nickname
        });
        this.props.storageSetting();
    }
    render(){
        let userInfo = this.props.userInfo.toJS();
        let { special, shield } = this.props;
        return (
            <div className = 'info-card-setting'>
                <div className = 'info-card-container'>
                    <div  data-flex = 'main:center dir:top'>
                        <dl data-flex = 'main:left cross:center'>
                            <dt data-flex-box = '0'>昵称</dt>
                            <dd data-flex-box = '1'>{userInfo.nickname}</dd>
                        </dl>
                        <dl data-flex = 'main:left cross:center'>
                            <dt data-flex-box = '0'>性别</dt>
                            <dd data-flex-box = '1'>{userInfo.sex}</dd>
                        </dl>
                        <dl data-flex = 'main:left cross:center'>
                            <dt data-flex-box = '0'>邮箱</dt>
                            <dd data-flex-box = '1' 
                                onDoubleClick = {() => this.setState({codyMode: true})}
                            >
                                {
                                    !this.state.codyMode?userInfo.email
                                    : <input 
                                        className = 'info-card-input'
                                        defaultValue = {userInfo.email}
                                        autoFocus = {true}
                                        onBlur = {() => this.setState({codyMode: false})}
                                    />
                                }
                            </dd>
                        </dl>
                        <dl data-flex = 'main:left cross:center'>
                            <dt data-flex-box = '0'>签名</dt>
                            <dd data-flex-box = '1'>{userInfo.info}</dd>
                        </dl>
                    </div>
                </div>
                <div className = 'info-card-footer'>
                    <div data-flex = 'dir:left main:center cross:center box:mean' className = 'info-card-footer-ul'>
                        <span 
                            data-flex = 'main:center cross:center'
                            data-flex-box='1' 
                            className = 'info-card-footer-li'
                            onClick = {() => this.handleSend()}
                        >
                           <span><i className = 'info-card-icon'>&#xe67f;</i>发消息</span>
                        </span>
                        <span 
                            data-flex = 'main:center cross:center'
                            data-flex-box='1' 
                            className = 'info-card-footer-li'
                            onClick = {() => this.handleSpecial()}
                        >
                           <span>
                                <i className = 'info-card-icon'>&#xe684;</i>
                                {
                                    special.includes(userInfo.nickname)?'取消关注':'特别关注'
                                }
                           </span>
                        </span>
                        <span 
                            data-flex = 'main:center cross:center'
                            data-flex-box='1' 
                            className = 'info-card-footer-li'
                            style = {{border: 0}}
                            onClick = {() => this.handleShield()}
                        >
                           <span>
                                <i className = 'info-card-icon'>&#xe686;</i>
                                {
                                    shield.includes(userInfo.nickname)?'取消屏蔽':'屏蔽TA'
                                }
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

SpecialSetting.propTypes = {
    // shield: PropTypes.array,
    nickname: PropTypes.string,
    // special: PropTypes.array,
    setSpecialUser: PropTypes.func,
    setShieldUser: PropTypes.func,
    storageSetting: PropTypes.func
}
export default SpecialSetting;