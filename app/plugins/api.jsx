import jQuery from 'jquery';
import plugin from 'chat-room-plugin'
import MessageBox from '../components/MessageBox.jsx'
import Immutable from 'immutable'

import React, {
    PropTypes
} from 'react'

window.jQuery = jQuery;
window.$ = jQuery;

const $ = jQuery;



function getPluginMessageInfo(message) {
    let {
        content,
    } = message;

    const match = content.trim().match(/^([a-zA-Z0-9_-]+)\s*\(([\s\S]*)\)\s*;?\s*$/);

    const name = match && match[1];
    if (!name) {
        return;
    }

    const typeInfo = plugin.messageList[name];
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
    const $names = $('.message-list-item').find('.message-nickname');
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
    if($item){
        $item.avatar = $item.find(".avatar");
        $item.direction=$item.data("flex").match(/:(\w+)$/)[1];
    }   
    return $item;
}




class PluginMessage extends React.Component {
    componentDidMount() {
        this.renderMessage();
    }
    shouldComponentUpdate(nextProps) {
        const currentProps = this.props;
        return !(
            Immutable.is(currentProps.boxInfo,nextProps.boxInfo) &&
            currentProps.content.from === nextProps.content.from &&
            currentProps.content.content === nextProps.content.content &&
            currentProps.name === nextProps.name
        );
    }

    componentDidUpdate() {
        this.renderMessage();
    }

    renderMessage() {
        try{
            jQuery(this.dom).empty()
                .append(plugin.getMessage(this.props.name, this.props.content, this.props.isNew));
        } catch(err){
            console.error('[我的猴,插件给我报了个错]：',err);
        }
        
    }
    render() {
        return (
            <MessageBox 
                info = {this.props.boxInfo}
                messageContent = {
                    <div
                        className="plugin-dom-container"
                        ref={dom => this.dom = dom}
                    />
                }
            />
            
        );
    }
}

PluginMessage.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.any,
    isNew: PropTypes.bool.isRequired,
};


plugin.init({
    findUserMessage,
    jQuery
})

export default {
    registerMessage:plugin.registerMessage,
    getPluginMessageInfo,
    getMessage:plugin.getMessage,
    findUserMessage,
    timestamp: 0,
    PluginMessage
};