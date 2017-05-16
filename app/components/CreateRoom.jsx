import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import '../less/createroom.less'

class CreateRoom extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(){
        let roomName = this.refs.roomName.value.trim();
        let user = this.props.user.toJS();
        if(roomName !== ''){
            this.props.createRoom({
                user: user.nickname,
                roomName: roomName
            }).then((resault) => {
                this.props.getRoomList(user.token);
                if(resault.isOk){
                    this.props.changeRoom({
                        curRoom: roomName,
                        isPrivate: false
                    })
                }
            });
            this.props.setCreateRoomState(false);
        } else{
            this.props.setCreateRoomState(false);
        }
    }
    render(){
        return (
            <ReactCSSTransitionGroup
                component = 'div'
                transitionName = 'createroom'
                transitionEnterTimeout = {300}
                transitionLeaveTimeout = {300}
            >
                {
                    !this.props.isShow? null :
                    <div className = 'createroom'> 
                        <div className = 'createroom-container'>
                            <div className = 'createroom-header'>
                                <span>创建群组</span>
                            </div>
                            <div className = 'createroom-form'>
                                <div className = 'createroom-input-group'>
                                    <input className = 'createroom-input' type= 'text' ref = 'roomName'/>
                                </div>
                                <button className = 'createroom-btn' onClick = {() => this.handleClick()}>创建</button>
                            </div>
                        </div> 
                        <div 
                            className = 'createroom-close' 
                            onClick = {() => this.props.setCreateRoomState(false)}
                        >
                        </div>
                    </div>
                }
            </ReactCSSTransitionGroup>
        )
    }
}

export default CreateRoom;