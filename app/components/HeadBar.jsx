import React, {PropTypes} from 'react'

import Avatar  from './Avatar.jsx'

import '../less/headbar.less'

class HeadBar extends React.Component {
    constructor(props){
        super(props);
    }
    handleRoomBtnClick(){
        if(!this.props.isPrivate){
            this.props.setRoomInfoState(!this.props.isShowRoomInfo);
            this.props.getRoomActiveInfo(this.props.curRoom);
        }
    }
    render(){
        return (
            <div>
            <div data-flex = 'main:left cross:center' className = 'headbar'>
                <div 
                    data-flex = 'main:left cross:center' 
                    data-flex-box = '1' 
                    className = 'headbar-room-name'
                    onClick = {()=>{this.props.setMenuState(!this.props.menuState)}}                 
                >
                    <Avatar 
                        src = {this.props.avatar}
                        size = {40}
                        radius = {10}
                    />
                    <span className = 'headbar-room-name'>{this.props.curRoom}</span>
                </div>
                <div 
                    data-flex-box = '0' 
                    className = 'headbar-icon-container'
                >
                    <a href = 'https://github.com/redsx/CR' target = '_blank'>
                        <i className = 'headbar-icon'>&#xe691;</i>
                    </a>
                </div>
                <div 
                    data-flex-box = '0' 
                    className = 'headbar-icon-container'
                    onClick = {()=>{this.props.setMenuState(!this.props.menuState)}}
                >
                    { 
                        this.props.menuState ? 
                        <i className = 'headbar-icon'>&#xe699;</i> 
                        : <i className = 'headbar-icon'>&#xe69d;</i>
                    }
                </div>
                <div  data-flex = 'main:left cross:center' className = 'headbar-line'></div>
                <div 
                    data-flex-box = '0' 
                    className = 'headbar-icon-container'
                    style = {{width: '60px'}}
                    onClick = {()=> this.handleRoomBtnClick()}
                >
                    {
                        this.props.isShowRoomInfo?
                        <i className = 'headbar-icon'>&#xe69b;</i>
                        :<i className = 'headbar-icon'>&#xe696;</i>
                    }
                </div>
            </div>
            </div>
        );
    }
}
HeadBar.propTypes = {
    setMenuState: PropTypes.func,
    menuState: PropTypes.bool,
    curRoom: PropTypes.string
}

export default HeadBar;