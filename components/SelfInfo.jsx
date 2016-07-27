import React, { PropTypes } from 'react'

import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Logout from 'material-ui/svg-icons/social/whatshot.js'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ContentSend from 'material-ui/svg-icons/content/send'
import ContentDrafts from 'material-ui/svg-icons/content/drafts'
import CommunicationEmail from 'material-ui/svg-icons/social/poll.js'
import People from 'material-ui/svg-icons/social/people.js'
import Person from 'material-ui/svg-icons/social/person.js'

import Avatar from '../containers/Avatar.js'



const styles = {
    container:{
        width:'60px',
    },
    iocnUl: {
        dispaly:'block',
        padding: '0px',
        paddingBottom:'50px'
    },
    iconList: {
        dispaly:'block',
        listStyle: 'none',
    },
    avatar: {
        marginTop:'20px'
    },
}

class SelfInfo extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(value){
        this.props.setListShow(value);
    }
    render(){
        let { avatar, nickname } = this.props.user;
        return (
            <div
                data-flex = 'main:center cross:center dir:top '
                style = {styles.container}
            >
                <div data-flex-box = '1' style = {styles.avatar}>        
                    <Avatar 
                        src={avatar}
                        size = {50}
                        nickname = {nickname}
                    />
                </div>
                <div style = {styles.iconBox} data-flex-box = '3'>
                <ul style = {styles.iocnUl}>
                    <li style = {styles.iconList}>
                    <a>
                        <IconButton
                            onClick = {()=>{this.handleClick(false)}}
                        >
                        <Person color = {'white'} />
                        </IconButton> 
                    </a>
                    </li>
                <li style = {styles.iconList}>
                    <a>
                        <IconButton
                            onClick = {()=>{this.handleClick(true)}}
                        >
                        <People color = {'white'} />
                        </IconButton> 
                    </a>
                    </li>
                </ul>
                </div>
                <div style = {styles.iconBox} data-flex-box = '2' data-flex = 'dir:bottom'>
                <ul style = {styles.iocnUl}>
                    <li style = {styles.iconList}>
                    <a href = '/logout'>
                        <IconButton 
                            tooltip = '登出'
                        >
                        <Logout color = {'white'} />
                        </IconButton> 
                    </a>
                    </li>
                    <li style = {styles.iconList}>
                            <a>
                                <IconButton
                                    tooltip = '关于'
                                >
                                <CommunicationEmail color = {'white'} />
                                </IconButton> 
                            </a>
                    </li>
                    <li style = {styles.iconList}>
                        <a href = 'https://github.com/redsx/CR' target = '_blank'>
                            <IconButton
                            >
                            <FontIcon 
                                    className = 'muidocs-icon-custom-github'
                                    color = 'white'
                                />
                            </IconButton>
                        </a>
                    </li>
                </ul>
                </div>
            </div>
        );
    }
}


SelfInfo.propType = {
    user: PropTypes.object,
    setListShow: PropTypes.func
}

export default SelfInfo;