import React, { PropTypes } from 'react'
import TweenOne from 'rc-tween-one'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import '../less/expressions.less'

const expressions = ['呵呵', '哈哈', '吐舌', '啊', '酷', '怒', '开心', '汗', '泪', '黑线',
                     '鄙视', '不高兴', '真棒', '钱', '疑问', '阴险', '吐', '咦', '委屈', '花心', 
                     '呼', '笑眼', '冷', '太开心', '滑稽', '勉强', '狂汗', '乖', '睡觉', '惊哭',
                     '升起', '惊讶', '喷', '爱心', '心碎', '玫瑰', '礼物', '彩虹', '星星月亮', '太阳'];

class Expressions extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(expression){
        this.props.addExpression('#('+expression+') ');
        this.props.setExpressionState(false);
    }
    renderExpressions(){
        return expressions.map((item,index) => {
            return (
                <div
                    key = {index}
                    className = 'expressions'
                    onClick = {()=>{this.handleClick(item)}}
                >
                    <div
                        className = 'expression'
                        style = {{
                            background:'url("./images/expressions.png") 0px '+ (-index)*30 + 'px no-repeat'
                        }}
                    ></div>
                </div>
            );
        })
    }
    render(){
        const isShow = this.props.expressionState;
        return (
            <ReactCSSTransitionGroup
                component = 'div'
                transitionName = 'animationBox'
                transitionEnterTimeout = {400}
                transitionLeaveTimeout = {200}
            >
                {
                    isShow ? 
                    <div className = 'animationBox'>
                        <div className = 'expressionsBox'>
                            {this.renderExpressions()}
                        </div>
                    </div>
                    :null
                }
            </ReactCSSTransitionGroup>
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
    setExpressionState: PropTypes.func,
    addExpression: PropTypes.func
}
export default Expressions;