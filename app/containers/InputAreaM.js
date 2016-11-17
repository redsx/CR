import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InputAreaM from '../components/InputAreaM.jsx'
import { setRichTextState, addPrivateMessage, addMessage } from '../actions'
function mapStateToProps(state) {
    return {
        user: state.get('userState')
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setRichTextState, addPrivateMessage, addMessage },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(InputAreaM);