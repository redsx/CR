import React, {PropTypes} from 'react'

import { updateUserInfo } from '../actions'

class Setting extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isInput: false
        }
    }
    handleClick(){
        if(!this.state.isInput){
            this.setState({isInput: true});
        }
        else{
            let form = this.refs.form,
                user = {};
            user.nickname = form.nickname.value;
            user.sex = form.sex.value;
            user.email = form.email.value;
            user.info = form.info.value;
            updateUserInfo(user).then((resault)=>{
                if(resault.ok){
                    this.props.getUserInfo(this.props.userInfo.get('nickname'));
                    this.setState({isInput: false});
                }
            });
        }
    }
    render(){
        let userInfo = this.props.userInfo.toJS();
        return (
            <div className = 'info-card-setting'>
                <div className = 'info-card-container'>
                    <div  data-flex = 'main:center dir:top'>
                        <form ref = 'form'>
                        <dl data-flex = 'main:left cross:center'>
                            <dt data-flex-box = '0'>昵称</dt>
                            <dd data-flex-box = '1'>
                                {
                                    !this.state.isInput ? userInfo.nickname
                                    :<input 
                                        className = 'info-card-input'
                                        defaultValue = {userInfo.nickname}
                                        name = 'nickname'
                                        disabled = {true}
                                    />
                                }
                            </dd>
                        </dl>
                        <dl data-flex = 'main:left cross:center'>
                            <dt data-flex-box = '0'>性别</dt>
                            <dd data-flex-box = '1'>
                                {
                                    !this.state.isInput ? (userInfo.sex)
                                    :<select className = 'info-card-select' name = 'sex' defaultValue = {userInfo.sex}>
                                        <option>男</option>
                                        <option>女</option>
                                        <option>未知</option>
                                    </select>
                                }
                            </dd>
                        </dl>
                        <dl data-flex = 'main:left cross:center'>
                            <dt data-flex-box = '0'>邮箱</dt>
                            <dd data-flex-box = '1'>
                            {
                                !this.state.isInput ? (userInfo.email)
                                :<input 
                                    className = 'info-card-input'
                                    name = 'email'
                                    defaultValue = {userInfo.email}
                                />
                            }
                            </dd>
                        </dl>
                        <dl data-flex = 'main:left cross:center'>
                            <dt data-flex-box = '0'>签名</dt>
                            <dd data-flex-box = '1'>
                            {
                                !this.state.isInput ? (userInfo.info)
                                :<input 
                                    className = 'info-card-input'
                                    name = 'info'
                                    defaultValue = {userInfo.info}
                                />
                            }
                            </dd>
                        </dl>
                    </form>
                    </div>
                </div>
                <div className = 'info-card-btn-box'>
                        <button 
                            className = 'info-card-btn' 
                            onClick = {()=>this.handleClick()}
                        >
                            {this.state.isInput? 'Apply' : 'Edit'}
                        </button>
                </div>
            </div>
        )
    }
}

Setting.propTypes = {
    // setting: PropTypes.object,
    setAudioSrc: PropTypes.func,
    setAudioState: PropTypes.func,
    setNotificationState: PropTypes.func,
    storageSetting: PropTypes.func
}
export default Setting;