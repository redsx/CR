import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InputAreaM from '../components/InputAreaM.jsx'
import { setExpressionShow, setExpressionHidden, addPrivateMessage, addMessage, setImageExpState } from '../actions'
function mapStateToProps(state) {
    return {
        isShowExpressions: state.getIn(['pageState','expressionState','isShow']),
        isShowImageExp: state.getIn(['pageState','isShowImageExp']),
        expression: state.getIn(['pageState','expression']),
        user: state.get('userState')
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setExpressionShow, setExpressionHidden, addPrivateMessage, addMessage, setImageExpState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(InputAreaM);