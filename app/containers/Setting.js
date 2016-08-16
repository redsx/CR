import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Setting from '../components/Setting.jsx'
import { setAudioSrc, setAudioState, setNotificationState, storageSetting } from '../actions'
function mapStateToProps(state) {
    return {
        setting:state.setting
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setAudioSrc, setAudioState, setNotificationState, storageSetting },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Setting);