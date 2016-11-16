import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InputAreaM from '../components/InputAreaM.jsx'
import { setRichTextState } from '../actions'
function mapStateToProps(state) {
    return {}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setRichTextState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(InputAreaM);