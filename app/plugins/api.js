import jQuery from 'jquery';

const $ = jQuery;



const cbMap = {};
let body;

function getCurrentRoomId() {
    return body.props.params.id;
}

function on(name, func) {
    if (!cbMap[name]) {
        cbMap[name] = [];
    }
    cbMap[name].push(func);
}

function off(name, func) {
    if (!cbMap[name]) {
        return false;
    }
    const index = cbMap[name].indexOf(func);
    if (index !== -1) {
        cbMap[name].splice(index, 1);
        return true;
    } else {
        return false;
    }
}

function emit(name, data) {
    if (name === 'rawMessage') {
        if (getCurrentRoomId() === data.to._id) {
            emit('message', data);
        }
    }
    if (!cbMap[name]) {
        return;
    }
    cbMap[name].forEach((v) => {
        v(data);
    });
}

function init(bodyInit) {
    body = bodyInit;
}

function registerCommand(commandName, cb) {
    on('message', (msg) => {
        const {
            content,
        } = msg;
        const reg = new RegExp(`^${commandName}\\s*\\(([\\s\\S]*)\\)\\s*;?`);
        const match = content.trim().match(reg);
        if (match) {
            cb(match[1] && match[1].trim(), msg);
        }
    });
}
const messageList = {};

function getMessage(name, content, isNew) {
    if(!content.get){
        content.get=function(key){
            return this[key];
        }
    }
    return messageList[name].render(content, isNew);
}

function registerMessage({
    name,
    showBase,
    process,
    render,
}) {
    messageList[name] = {
        name,
        showBase,
        process,
        render,
    };
}

function getPluginMessageInfo(message) {
    let {
        content,
    } = message;

    const match = content.trim().match(/^([a-zA-Z0-9_-]+)\s*\(([\s\S]*)\)\s*;?\s*$/);

    const name = match && match[1];
    if (!name) {
        return;
    }

    const typeInfo = messageList[name];
    if (!typeInfo) {
        return;
    }
    const {
        showBase,
        process,
    } = typeInfo;

    if (process) {
        content = process(message);
    } else {
        content = match[2];
    }
    const ret = {
        name,
        content,
        showBase,
    };
    return ret;
}

function findUserMessage(userName) {
    let fullMatch = false;
    const match = userName.match(/^"([\s\S]*)"$/);
    if (match) {
        userName = match[1];
        fullMatch = true;
    }
    const $names = $('.message-list-item').find('.nickname');
    let $item;
    for (let i = $names.length - 1; i >= 0; i--) {
        const thisName = $names.eq(i).text();
        if (fullMatch) {
            if (thisName === userName) {
                $item = $names.eq(i).parents('.message-list-item');
                break;
            }
        } else {
            if (thisName.indexOf(userName) !== -1) {
                $item = $names.eq(i).parents('.message-list-item');
                break;
            }
        }
    }
    $item.avatar=$item.find(".avatar")
    return $item;
}
export default {
    on,
    off,
    emit,
    init,
    registerCommand,
    registerMessage,
    getPluginMessageInfo,
    getMessage,
    findUserMessage,
    timestamp:0,
};
