import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Expressions from '../components/Expressions.jsx'
import { addExpression, setExpressionHidden } from '../actions'
function mapStateToProps(state) {
    return {
        moment:state.pageState.expressionState.moment,
        paused: state.pageState.expressionState.paused,
        reverse: state.pageState.expressionState.reverse,
        isShow: state.pageState.expressionState.reverse,
        storageExpressions: state.storageExpressions
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addExpression, setExpressionHidden },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Expressions);