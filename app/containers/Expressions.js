import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Expressions from '../components/Expressions.jsx'
import { addExpression, setExpressionState } from '../actions'

function mapStateToProps(state) {
    return {
        expressionState: state.getIn(['pageState','isShowExpression']),
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addExpression, setExpressionState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Expressions);