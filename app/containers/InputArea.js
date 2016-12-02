import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InputArea from '../components/InputArea.jsx'
import { 
    setExpressionState, 
    addPrivateMessage,
    addMessage, 
    sendMessageWithPre, 
    sendPrivateMessageWithPre, 
    setImageExpState, 
    setRichTextState, 
    mergeMessage,
    mergePrivateMessage
} from '../actions'

function mapStateToProps(state) {
    return {
        isShowExpressions: state.getIn(['pageState','isShowExpression']),
        isShowImageExp: state.getIn(['pageState','isShowImageExp']),
        expression: state.getIn(['pageState','expression']),
        user: state.get('userState')
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setExpressionState, addMessage, addPrivateMessage, sendMessageWithPre, sendPrivateMessageWithPre, setImageExpState, setRichTextState, mergeMessage, mergePrivateMessage },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(InputArea);