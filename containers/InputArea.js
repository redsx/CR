import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InputArea from '../components/InputArea.jsx'
import { setExpressionShow, setExpressionHidden, addPrivateMessage } from '../actions'
function mapStateToProps(state) {
    return {
        isShowExpressions: state.pageState.expressionState.isShow,
        expression: state.pageState.expression,
        user: state.userState
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setExpressionShow, setExpressionHidden, addPrivateMessage },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(InputArea);