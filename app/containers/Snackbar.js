import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Snackbar from '../components/Snackbar.jsx'
function mapStateToProps(state) {
    return {
        // onRequestClose: state.pageState.snackbar.onRequestClose,
        // autoHideDuration: state.pageState.snackbar.autoHideDuration,
        // content: state.pageState.snackbar.content,
        // open: state.pageState.snackbar.open
        snackbar: state.getIn(['pageState','snackbar'])
    }
}
export default connect(mapStateToProps)(Snackbar);