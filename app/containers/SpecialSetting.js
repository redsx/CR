import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SpecialSetting from '../components/SpecialSetting.jsx'
import { setSpecialUser, setShieldUser, storageSetting, setUserCurRoom } from '../actions'
function mapStateToProps(state) {
    return {
        special: state.getIn(['setting','special']),
        shield: state.getIn(['setting','shield'])
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSpecialUser, setShieldUser, storageSetting, setUserCurRoom},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(SpecialSetting);