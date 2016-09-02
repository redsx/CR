import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Expressions from '../components/Expressions.jsx'
import { addExpression, setExpressionHidden } from '../actions'

function mapStateToProps(state) {
    return {
        expressionState: state.getIn(['pageState','expressionState']),
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addExpression, setExpressionHidden },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Expressions);