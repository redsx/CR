import React, {PropTypes} from 'react'

import '../less/avatar.less'

class Avatar extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    handleClick(e){
        let { nickname, mode, addExpression, getUserInfo } = this.props;
        if(e.shiftKey){
            nickname === '' ? null : addExpression('@'+nickname+' ');
        } else{
            switch(mode){
                case 'profile':{
                    nickname === '' ? null : getUserInfo(nickname);
                    break;
                }
                case 'menu':{
                    let x = e.pageX,
                        y = e.pageY,
                        winX = window.innerWidth,
                        winY = window.innerHeight,
                        menuX = 150,
                        menuY = 162;
                    if(menuX > winX - x){
                        x = x - (menuX + x - winX) - 15;
                    }
                    if(menuY > winY - y){
                        y = y - (menuY + y -winY) - 15;
                    }
                    this.setState({
                        x: x,
                        y: y,
                        isShowMenu: true
                    });
                    break;
                }
                default: break;
            }
            
        }
    }
    handleMenuClose(){
        this.setState({isShowMenu: false});
    }
    handleAt(nickname){
        nickname === '' ? null : this.props.addExpression('@'+nickname+' ');
    }
    handleShieldToggle(nickname){
        this.props.setShieldUser({
            user: nickname,
            isAdd: true
        });
        this.props.storageSetting();
    }
    render(){
        let isShowMenu = this.state.isShowMenu;
        let { size, src, nickname, getUserInfo } = this.props;
        return (
            <div>
                <div 
                    className = 'avatar'
                    style = {{
                        width: size + 'px',
                        height: size + 'px',
                        backgroundImage: 'url(' + src + ')',
                    }}
                    onClick = {(e)=>this.handleClick(e)}
                >
                </div>
                {
                    !isShowMenu?null
                    :<div className = 'avatar-menu-box' onClick = {()=>this.handleMenuClose()}>
                        <ul 
                            className = 'avatar-ul'
                            style = {{
                                left: this.state.x + 'px',
                                top: this.state.y + 'px'
                            }}
                        >
                            <li className = 'avatar-li' onClick = {() => {this.handleAt(nickname)}}>@TA</li>
                            <li className = 'avatar-li' onClick = {() => getUserInfo(nickname)}>查看个人资料</li>
                            <li className = 'avatar-li' onClick = {() => this.props.setUserCurRoom({curRoom:nickname,isPrivate: true})}>发送消息</li>
                        </ul>
                    </div>
                }
            </div>
            
        );
    }
}
Avatar.propTypes = {
    size: PropTypes.number,
    src: PropTypes.string,
    nickname: PropTypes.string,
    getUserInfo: PropTypes.func,
    addExpression: PropTypes.func
}
export default Avatar;
