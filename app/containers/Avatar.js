import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Avatar from '../components/Avatar.jsx'
import { getUserInfo, addExpression } from '../actions'
function mapStateToProps(state) {
    return {}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getUserInfo, addExpression },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Avatar);