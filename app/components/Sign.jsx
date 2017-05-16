import React, {PropTypes} from 'react'
import { Link } from 'react-router-dom'
import '../less/sign.less'

class Sign extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFocus: false,
            isPwdErr: false,
            isNicErr: false,
            btnDisable: true
        }
    }
    
    handleFocus(){
        this.setState({
            isFocus: true
        })
    }
    handleBlur(){
        this.setState({
            isFocus: false
        })
    }
    handleNicChange(e){
        let val = e.target.value.trim(),
            pwd = this.refs.password.value.trim();
        if(val.length<=0 || val.length>20){
            if(this.state.isNicErr === false){
                this.setState({isNicErr:true});
            }
            if(!this.state.btnDisable){
                this.setState({btnDisable:true});
            }
        } else{
            if(this.state.isNicErr){
                this.setState({isNicErr:false});
            }
            if(pwd !== '' && !this.state.isPwdErr && this.state.btnDisable){
                this.setState({btnDisable:false});
            }
        }
    }
    handlePwdChange(e){
        let val = e.target.value.trim(),
            nic = this.refs.nickname.value.trim();
        if(val.length<=0){
            if(this.state.isPwdErr === false){
                this.setState({isPwdErr:true});
            }
            if(!this.state.btnDisable){
                this.setState({btnDisable:true});
            }
        } else{
            if(this.state.isPwdErr){
                this.setState({isPwdErr:false});
            }
            if(nic !== '' && !this.state.isNicErr && this.state.btnDisable){
                this.setState({btnDisable:false});
            }
        }
    }
    handleClick(){
        this.setState({btnDisable: true});
        let nickname = this.refs.nickname.value.trim(),
            password = this.refs.password.value.trim(),
            clickFunc = this.props.clickFunc,
            setSnackbarState = this.props.setSnackbarState;
        if(nickname.length>0 && nickname.length <= 20 && password.length>0){
            clickFunc(nickname,password).then((resault)=>{
                if(resault.isError){
                    if(resault.isNicErr){
                        this.setState({
                            isNicErr:true,
                            btnDisable: false
                        });
                        this.refs.nickname.focus();
                        setSnackbarState({
                            open: true,
                            content: resault.errMsg
                        })
                    } else if(resault.isPwdErr){
                        this.setState({
                            isPwdErr: true,
                            btnDisable: false
                        });
                        this.refs.password.focus();
                        setSnackbarState({
                            open: true,
                            content: resault.errMsg
                        })
                    } else{
                        this.setState({
                            btnDisable: false
                        });
                        setSnackbarState({
                            open: true,
                            content: resault.errMsg
                        })
                    }
                } else{
                    if(!localStorage){
                        setSnackbarState({
                            open: true,
                            content: '浏览器不支持localStorage'
                        })                                
                    } 
                    localStorage.setItem('token',resault.jwt);                    
                    this.props.history.push('/');
                }
            });
        }else{
            this.setState({
                btnDisable: false
            });
            setSnackbarState({
                open: true,
                content: 'nickname/password 错误'
            })
        }
    }
    componentDidMount(){
        document.addEventListener('keydown', (e) => {
            //输入昵称回车同样触发登录
            if(e.keyCode === 13 && (e.target === this.refs.nickname || e.target === this.refs.password)){
                this.handleClick();
            }
        })
    }
    render(){
        return (
            <div data-flex = 'main:center cross:center' className = 'login-container'>
                <div className = 'login'>
                    <div id = 'form' className = 'wx-login-form'>
                    <div className = {this.state.isFocus? 'login-owl password':'login-owl'}>
                        <div className = 'login-hand login-hand-focus'></div>
                        <div className = 'login-hand-r login-hand-r-focus'></div>
                        <div className = 'login-arms'>
                        <div className = 'login-arm login-arm-focus'></div>
                        <div className = 'login-arm-r login-arm-r-focus'></div>
                        </div>
                    </div>
                    <div className = 'login-pad'>
                        <div className = 'login-control-group'>
                        <div className = 'login-controls'>
                            <label className = 'login-control-label'>&#xe602;</label>
                            <input 
                                type = 'text' 
                                ref = 'nickname' 
                                placeholder = 'nickname' 
                                autoFocus = 'autofocus' 
                                onChange = {(e)=>this.handleNicChange(e)}
                                className = {this.state.isNicErr? 'login-form-control login-error-input':'login-form-control'}
                            />
                        </div>
                        </div>
                        <div className = 'login-control-group'>
                        <div className = 'login-controls'>
                            <label className = 'login-control-label'>&#xe601;</label>
                            <input 
                                type = 'password' 
                                ref = 'password' 
                                placeholder = 'password' 
                                onChange = {(e)=>this.handlePwdChange(e)}
                                className = {this.state.isPwdErr ? 'login-form-control login-error-input' : 'login-form-control'}
                                onFocus = {()=>this.handleFocus()}
                                onBlur = {()=>this.handleBlur()}
                            />
                        </div>
                        </div>
                    </div>
                    <div className = 'login-actions'>
                        <Link to = {this.props.link}> {this.props.linkText}  &nbsp;&nbsp;</Link>
                        <button 
                            ref = 'signUp'
                            className = {this.state.btnDisable ? 'login-btn login-btn-disabled' : 'login-btn' }
                            disabled = {this.state.btnDisable}
                            onClick = {()=>this.handleClick()}
                        >
                            {this.props.btnText}
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Sign;
