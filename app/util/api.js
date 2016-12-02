import { sendMessage, getRichTextContent } from '../actions'

const api = function(user,addMessage){
    return {
        sendMessage: function(type,room,content,title){
            if(typeof type !== 'string'){
                return console.error('[type error]:type must be string');
            }
            if(!content){
                return console.error('[type error]: content is undefinded')
            }
            if(!room){
                return console.error('[type error]: room is undefinded')
            }
            let message = {
                time: new Date().getTime(),
                nickname: user.nickname,
                avatar: user.avatar,
                type,
                content,
                room,
            }
            return sendMessage(message).then((result) => {
                message.timestamp = result;
                addMessage(message);
            })
        },
        getCondeMessageContent: function(title,timestamp){
            return getRichTextContent({
                owner: nickname,
                timestamp,
                title
            });
        },
        filterMsg(messageContent){
            if(this.filterRule){
                try{
                    var content =  this.filterRule(messageContent);
                } catch(err){
                    console.error(err);
                    return messageContent;
                }
                if(!content){
                    return;
                }
                // 如果content为string代表内容被修改
                if(typeof content === 'string'){
                    return content;
                }
            }
            return messageContent
        },
        filterRule: null
    }
}
export default api