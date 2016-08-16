import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SpecialSetting from '../components/SpecialSetting.jsx'
import { setSpecialUser, setShieldUser, storageSetting } from '../actions'
function mapStateToProps(state) {
    return {
        special: state.setting.special,
        shield: state.setting.shield
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSpecialUser, setShieldUser, storageSetting },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(SpecialSetting);