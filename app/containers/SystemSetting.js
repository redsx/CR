import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SystemSetting from '../components/SystemSetting.jsx'
import { setSystemSettingState, setAudioState, setNotificationState, storageSetting } from '../actions'
function mapStateToProps(state) {
    return {
        isShowSysSetting: state.getIn(['pageState','isShowSysSetting']),
        audioNotification: state.getIn(['setting','audioNotification']),
        h5Notification: state.getIn(['setting','h5Notification'])
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSystemSettingState, setAudioState, setNotificationState, storageSetting},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(SystemSetting);