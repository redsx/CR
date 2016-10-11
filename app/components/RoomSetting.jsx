import React, {PropTypes} from 'react'

class RoomSetting extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isInput: false
        }
    }
    handleClickJoinClick(info){
        if(this.props.isJoined){
            this.props.changeRoom({
                curRoom: info.roomName,
                isPrivate: false
            })
        } else{
            this.props.joinRoom(info).then((resault) => {
                if(resault.isError){
                    this.props.setSnackbarState({
                        open: true,
                        content: resault.errMsg,
                    });
                } else{
                    this.props.setSnackbarState({
                        open: true,
                        content: resault.msg
                    });
                    this.props.addActiveItem({
                        roomName: info.roomName,
                        avatar: info.avatar,
                        isPrivate: false
                    })
                }
                this.props.hiddenInfoCard();
                this.props.setListShow('activeList');
                this.props.changeRoom({
                    curRoom: info.roomName,
                    isPrivate: false
                });
                if(window.innerWidth < 980){
                    this.props.setMenuState(true);
                }
            });
        }
    }
    handleClick(){
        if(!this.state.isInput){
            this.setState({isInput: true});
        }
        else{
            let form = this.refs.form,
                room = {};
            room.name = form.name.value;
            room.info = form.info.value;
            room.token = this.props.token;
            this.props.updateRoomInfo(room).then((resault)=>{
                if(!resault.isError){
                    this.props.setSnackbarState({
                        open: true,
                        content: resault.msg
                    });
                    this.props.hiddenInfoCard();
                    this.props.getRoomActiveInfo(room.name);
                }
            });
        }
    }
    render(){
        let roomInfo = this.props.roomInfo.toJS();
        let { isJoined, isCreater, nickname } = this.props;
        let roomName = roomInfo.name,
            avatar = roomInfo.avatar;
        return (
            <div className = 'info-card-setting'>
                <div className = 'info-card-container'>
                    <div  data-flex = 'main:center dir:top'>
                        <form ref = 'form'>
                        <dl data-flex = 'main:left cross:center'>
                            <dt data-flex-box = '0'>群组名</dt>
                            <dd data-flex-box = '1'>
                                {
                                    !this.state.isInput ? roomInfo.name
                                    :<input 
                                        className = 'info-card-input'
                                        defaultValue = {roomInfo.name}
                                        name = 'name'
                                        disabled = {true}
                                    />
                                }
                            </dd>
                        </dl>
                        <dl data-flex = 'main:left cross:center'>
                            <dt data-flex-box = '0'>管理员</dt>
                            <dd data-flex-box = '1'>
                                {
                                    !this.state.isInput ? roomInfo.creater
                                    :<input 
                                        className = 'info-card-input'
                                        defaultValue = {roomInfo.creater}
                                        name = 'creater'
                                        disabled = {true}
                                    />
                                }
                            </dd>
                        </dl>
                        <dl data-flex = 'main:left cross:center'>
                            <dt data-flex-box = '0'>群简介</dt>
                            <dd data-flex-box = '1'>
                            {
                                !this.state.isInput ? roomInfo.info
                                :<input 
                                    className = 'info-card-input'
                                    name = 'info'
                                    defaultValue = {roomInfo.info}
                                />
                            }
                            </dd>
                        </dl>
                    </form>
                    </div>
                </div>
                <div className = 'info-card-btn-box'>
                    {
                       !isCreater ? (
                            <button 
                                className = 'info-card-btn' 
                                onClick = {() => {this.handleClickJoinClick({nickname,roomName,avatar})}}
                            >
                                {isJoined? '进入' : '加入'}
                            </button>
                        ) : (
                            <button 
                                className = 'info-card-btn' 
                                onClick = {()=>this.handleClick()}
                            >
                                {this.state.isInput? 'Apply' : 'Edit'}
                            </button>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default RoomSetting;