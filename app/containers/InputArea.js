import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InputArea from '../components/InputArea.jsx'
import { setExpressionShow, setExpressionHidden, addPrivateMessage, addMessage, setImageExpState } from '../actions'
function mapStateToProps(state) {
    return {
        isShowExpressions: state.pageState.expressionState.isShow,
        isShowImageExp: state.pageState.isShowImageExp,
        expression: state.pageState.expression,
        user: state.userState
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setExpressionShow, setExpressionHidden, addPrivateMessage, addMessage, setImageExpState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(InputArea);