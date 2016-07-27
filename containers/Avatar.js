import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Avatar from '../components/Avatar.jsx'
import { getUserInfo } from '../actions'
function mapStateToProps(state) {
    return {}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getUserInfo },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Avatar);