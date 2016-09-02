import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SelfInfo from '../components/SelfInfo.jsx'
import { setListShow, setSystemSettingState, setMenuState } from '../actions'

function mapStateToProps(state) {
    return {
        user: state.get('userState'),
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setListShow, setSystemSettingState, setMenuState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(SelfInfo);