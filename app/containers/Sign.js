import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Sign from '../components/Sign.jsx'
import { setSnackbarState } from '../actions'
function mapStateToProps(state) {
    return {}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSnackbarState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Sign);