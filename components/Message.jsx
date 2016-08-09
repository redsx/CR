import React, {PropTypes} from 'react'

import Avatar from '../containers/Avatar.js'

const styles = {
    messageContainer: {
        width: '80%',
        maxWidth: '980px',
        padding: '10px 6px 0px 12px'
    },
    message:{
        display: 'inline-block',
        wordBreak: 'break-all',
        textAlign: 'left',
        padding: '2px 6px 2px 6px',
        border: '1px solid #ccc',
        borderRadius: '9px',
        backgroud: 'white',
        boxShadow: '0 0 0 2px #eee'
    },
    img: {
        maxWidth: '100%'
    }
}
class Message extends React.Component{
    constructor(props){
        super(props);
    }
    handleDbclick(){
        let index = this.props.message.index,
            setSlideState = this.props.setSlideState,
            findSlideArr = this.props.findSlideArr;
            findSlideArr(index);
            setSlideState(true);
    }
    dealTimestamp(timestamp){
        let time = new Date(timestamp);
        let hours = time.getHours()>9 ? time.getHours() : '0'+time.getHours();
        let minu = time.getMinutes()>9 ? time.getMinutes() : '0'+time.getMinutes();
        let sec = time.getSeconds()>9 ? time.getSeconds() : '0'+time.getSeconds();
        return hours+':'+minu+':'+sec;
    }
    dealContent(content){
        let text = content,
            user = this.props.user;
        text = text.replace(/&/g,'&amp').replace(/\"/g,'&quot').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\'/g,'&apos;');
        let regLink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        let regExp = /#\([\u4e00-\u9fa5a-z]+\)/g;
        text = text.replace(regExp, r => `<img src="images/expressions/${r.match(/[^#()]+/)[0]}.png" onerror="this.style.display=\'none\'"/>` );
        text = text.replace(regLink, r => `<a href="${r}" target="_blank">${r}</a>`);
        // text = text.replace()
        return text
    }
    render(){
        let { avatar, timestamp, content, nickname, type } = this.props.message;
        let time = this.dealTimestamp(timestamp),
            text = type === 'textMessage' ? this.dealContent(content):'',
            dir = this.props.dir || 'left';
        return (
            <div data-flex={'dir:'+dir}>
                <div data-flex={'dir:'+dir} data-flex-box = '0' style = {styles.messageContainer}>
                    <div data-flex-box = '0' data-flex = 'main:top cross:top'>
                        <Avatar
                            src = {avatar}
                            size = {39}
                            nickname = {nickname}
                        />
                    </div>
                    <div style = {{
                        padding:'0 10px 10px 5px',
                        textAlign:dir
                    }}>
                        <span
                            style = {{
                                fontSize:'0.85rem',
                                color:'#555'
                            }}
                        >
                            {nickname+' '+time}
                        </span>
                        <div>
                             {
                                 type === 'textMessage' ?
                                 <span style = {styles.message} dangerouslySetInnerHTML={ {__html: text}}></span>
                                 :<span style = {styles.message}> 
                                    <img src ={content} onClick = {()=>{this.handleDbclick()}} className = 'imageMessage'/>
                                  </span>
                             }
                             
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Message.propType = {
    message: PropTypes.object,
    dir: PropTypes.string,
    setSlideState: PropTypes.func,
    findSlideArr: PropTypes.func
}

export default Message;