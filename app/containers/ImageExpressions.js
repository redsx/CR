import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImageExpressions from '../components/ImageExpressions.jsx'
import { addPrivateMessage, addMessage, deleteStorageExpression, setImageExpState } from '../actions'
function mapStateToProps(state) {
    return {
        isShowImageExp: state.getIn(['pageState','isShowImageExp']),
        user: state.get('userState'),
        storageExpressions: state.get('storageExpressions')
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addPrivateMessage, addMessage, deleteStorageExpression, setImageExpState  },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ImageExpressions);