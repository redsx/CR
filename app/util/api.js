import { sendMessage } from '../actions'

const api = function(nickname,addMessage){
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
            return sendMessage({
                nickname: nickname,
                type,
                content,
                room,
            }).then((result) => {
                addMessage(result)
            })
        }
    }
}
export default api