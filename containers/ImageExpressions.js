import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImageExpressions from '../components/ImageExpressions.jsx'
import { addPrivateMessage, deleteStorageExpression, setImageExpState } from '../actions'
function mapStateToProps(state) {
    return {
        isShowImageExp: state.pageState.isShowImageExp,
        user: state.userState,
        storageExpressions: state.storageExpressions
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addPrivateMessage, deleteStorageExpression, setImageExpState  },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ImageExpressions);