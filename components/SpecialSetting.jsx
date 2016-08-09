import React, {PropTypes} from 'react'

import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'

const styles = {
    title: {
        padding:'5px 0px 0px 20px'
    },
    divider: {
        padding:'5px 20px'
    },
    item: {
        paddingBottom:'6px'
    }
}

class SpecialSetting extends React.Component{
    constructor(props){
        super(props);
    }
    handleShieldToggle(e,value){
        console.log('set shield audio:',value);
        console.log(this.props)
        this.props.setShieldUser({
            user: this.props.nickname,
            isAdd: value
        });
        this.props.storageSetting();
    }
    handleSpecialToggle(e,value){
        console.log('set special audio:',value);
        this.props.setSpecialUser({
            user: this.props.nickname,
            isAdd: value
        });
        this.props.storageSetting();
    }
    render(){
        let { special, shield, nickname } = this.props;
        let isNotSpecial = special.indexOf(nickname) === -1,
            isNotShied = shield.indexOf(nickname) === -1;
        return (
            <div  data-flex = 'main:center dir:top'>
                <div data-flex = 'main:left cross:left' style = {styles.title}>
                    <span>提醒设置</span>
                </div>
                <div style = {styles.divider}>
                    <Divider />                                                        
                </div>
                <div  data-flex = 'main:center'>
                    <div data-flex = 'dir:top' data-flex-box = '0' style = {{paddingLeft:'20px'}}>
                        <span data-flex = 'main:right' data-flex-box = '0' style = {styles.item}>屏蔽他的消息:</span>
                        <span data-flex = 'main:right' data-flex-box = '0' style = {styles.item}>开启特别关注:</span>
                    </div>
                    <div data-flex = 'dir:top' data-flex-box = '1' style = {{paddingLeft:'15px'}}>
                        <span data-flex = 'main:left' data-flex-box = '0' style = {styles.item}>
                            <Toggle 
                                defaultToggled = {!isNotShied}
                                onToggle = {(e,v)=>{this.handleShieldToggle(e,v)}}
                            />
                        </span>
                        <span data-flex = 'main:left' data-flex-box = '0' style = {styles.item}>
                            <Toggle 
                                defaultToggled = {!isNotSpecial}
                                onToggle = {(e,v)=>{this.handleSpecialToggle(e,v)}}
                            />
                        </span>
                    </div>
                </div>
                <div data-flex = 'main:left cross:left' style = {styles.title} >
                    <span>其他</span>
                </div>
                <div style = {styles.divider}>
                    <Divider />                                                        
                </div>
                <div style = {{paddingLeft:'20px'}}>
                    <span>
                        1. 以上设置均为本地设置 <br/>
                        2. shift+点击头像可@ <br/>
                        3. shift+点击表情可删除表情
                    </span>
                </div>
            </div>
        )
    }
}

SpecialSetting.propTypes = {
    shield: PropTypes.array,
    nickname: PropTypes.string,
    special: PropTypes.array,
    setSpecialUser: PropTypes.func,
    setShieldUser: PropTypes.func,
    storageSetting: PropTypes.func
}
export default SpecialSetting;