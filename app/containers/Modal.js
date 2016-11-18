import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from '../components/Modal.jsx'
import { setModalState, setSnackbarState } from '../actions'
function mapStateToProps(state) {
    return {
        modalState: state.getIn(['pageState','modalState']),
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setModalState, setSnackbarState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Modal);
 