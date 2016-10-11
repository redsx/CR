import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InfoCard from '../components/InfoCard.jsx'
import { hiddenInfoCard, setUserInfo, getUserInfo, getRoomActiveInfo, updateUserInfo, setSnackbarState, updateRoomInfo } from '../actions'
function mapStateToProps(state) {
    let mode = state.getIn(['pageState','infoCardState', 'mode']),
        isShow = state.getIn(['pageState','infoCardState', 'isShow'])
    let title = state.getIn([mode,'nickname']) || state.getIn([mode,'name']),
        creater = state.getIn([mode,'nickname']) || state.getIn([mode,'creater']),
        time = state.getIn([mode,'time']),
        avatar = state.getIn([mode,'avatar']),
        user = state.get('userState');
    let canChangeInfo = creater === state.getIn(['userState','nickname']);
    return { mode, isShow, title, creater, time, avatar, canChangeInfo, user }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ hiddenInfoCard, setUserInfo, getUserInfo, getRoomActiveInfo, updateUserInfo, setSnackbarState, updateRoomInfo },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(InfoCard);