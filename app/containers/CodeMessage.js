import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CodeMessage from '../components/CodeMessage.jsx'
import { setModalState } from '../actions'
function mapStateToProps(state) {
    return {}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setModalState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(CodeMessage);