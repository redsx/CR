import React, { PropTypes } from 'react'
import TweenOne from 'rc-tween-one'
import '../less/expressions.less'

const expressions = ['呵呵', '哈哈', '吐舌', '啊', '酷', '怒', '开心', '汗', '泪', '黑线',
                     '鄙视', '不高兴', '真棒', '钱', '疑问', '阴险', '吐', '咦', '委屈', '花心', 
                     '呼', '笑眼', '冷', '太开心', '滑稽', '勉强', '狂汗', '乖', '睡觉', '惊哭',
                     '升起', '惊讶', '喷', '爱心', '心碎', '玫瑰', '礼物', '彩虹', '星星月亮', '太阳'];
const styles = {
    animationBox: {
        position:'absolute',
        zIndex: '998',
        background:'white',
        width:'322px',
        height:'200px',
        bottom:'120px',
        left:'50%',
        marginLeft:'-160px',
        transform:'scale(0)',
        opacity:'0',
        boxShadow: '0px 0px 10px #777'
    },
    expressionsBox: {
        width: '100%',
        height: '100%',
        marginLeft: '1px',
        fontSize: '0px',
        lineHeight: '0px',
    },
    expression: {
        width:'40px',
        height:'40px',
        padding:'5px',
        borderCollapse:'collapse',
        fontSize:'0px',
        display:'inline-block'
    },
    titleSpan: {
        paddingLeft:'5px',
        fontSize: '0.7rem',
        color: '#666'
    }
}
class Expressions extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(expression){
        this.props.addExpression('#('+expression+') ');
        this.props.setExpressionHidden();
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
        let { paused, reverse, moment } = this.props.expressionState.toJS();
        return (
            <TweenOne
                animation = {[{ scale: 1, duration: 10 },{ y: 50, opacity: 1, duration: 300 }]}
                paused = {paused}
                reverse = {reverse}
                moment = {moment}
                style = {styles.animationBox}
            >
            <div 
                className = 'expressionsBox'
            >
                {this.renderExpressions()}
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