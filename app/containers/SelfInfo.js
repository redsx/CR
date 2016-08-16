import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SelfInfo from '../components/SelfInfo.jsx'
import { setListShow } from '../actions'

function mapStateToProps(state) {
    return {
        user: state.userState,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setListShow },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(SelfInfo);