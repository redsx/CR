import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Avatar from '../components/Avatar.jsx'
import { getUserInfo, addExpression, setUserCurRoom, setShieldUser, setSpecialUser, storageSetting } from '../actions'
function mapStateToProps(state) {
    return {}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getUserInfo, addExpression, setUserCurRoom, setShieldUser, setSpecialUser, storageSetting },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Avatar);