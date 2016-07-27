import React, { PropTypes } from 'react'

import TweenOne from 'rc-tween-one'

const expressions = ['呵呵', '哈哈', '吐舌', '啊', '酷', '怒', '开心', '汗', '泪', '黑线',
                     '鄙视', '不高兴', '真棒', '钱', '疑问', '阴险', '吐', '咦', '委屈', '花心', 
                     '呼', '笑眼', '冷', '太开心', '滑稽', '勉强', '狂汗', '乖', '睡觉', '惊哭',
                     '升起', '惊讶', '喷', '爱心', '心碎', '玫瑰', '礼物', '彩虹', '星星月亮', '太阳'];

class Expressions extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(expression){
        this.props.addExpression('#('+expression+')');
        this.props.setExpressionHidden();
    }
    render(){
        return (
            <TweenOne
                animation = {[{ scale: 1, duration: 10 },{ y: 50, opacity: 1, duration: 300 }]}
                paused = {this.props.paused}
                reverse = {this.props.reverse}
                moment = {this.props.moment}
                style = {{
                    position:'absolute',
                    background:'white',
                    width:'320px',
                    height:'200px',
                    bottom:'120px',
                    left:'50%',
                    marginLeft:'-160px',
                    transform:'scale(0)',
                    // display:this.props.isShow ? 'none' : 'block',
                    opacity:'0',
                }}
            >
            <div 
                style = {{
                    width: '100%',
                    height: '100%',
                    fontSize: '0px',
                    lineHeight: '0px',
                    boxShadow: '0px 0px 10px #777'
                }}
            >
                {
                    expressions.map((item,index) => {
                        return (
                            <div
                                key = {index}
                                style = {{
                                    width:'40px',
                                    height:'40px',
                                    padding:'5px',
                                    border:'solid 1px #e3e3e3',
                                    borderCollapse:'collapse',
                                    fontSize:'0px',
                                    display:'inline-block'
                                }}
                                onClick = {()=>{this.handleClick(item)}}
                            >
                                <div
                                    style = {{
                                        width:'30px',
                                        height:'30px',
                                        background:'url("./images/expressions.png") 0px '+ (-index)*30 + 'px no-repeat'
                                    }}
                                ></div>
                            </div>
                        );
                    })
                }
            </div>
            </TweenOne>
        );
    }
}
Expressions.defaultProps = {
    moment:null,
    paused: true,
    reverse: false
}
Expressions.propTypes = {
    paused: PropTypes.bool,
    reverse: PropTypes.bool,
    isShow: PropTypes.bool,
    setExpressionHidden: PropTypes.func,
    addExpression: PropTypes.func
}
export default Expressions;