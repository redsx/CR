import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SpecialSetting from '../components/SpecialSetting.jsx'
import { setSpecialUser, setShieldUser, storageSetting, changeRoom, hiddenInfoCard } from '../actions'
function mapStateToProps(state) {
    return {
        special: state.getIn(['setting','special']),
        shield: state.getIn(['setting','shield']),
        userInfo: state.get('userCard')
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSpecialUser, setShieldUser, storageSetting, changeRoom, hiddenInfoCard},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(SpecialSetting);