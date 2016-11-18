import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RichTextMessage from '../components/RichTextMessage.jsx'
import { setModalState } from '../actions'
function mapStateToProps(state) {
    return {}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setModalState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(RichTextMessage);