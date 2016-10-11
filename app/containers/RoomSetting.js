import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RoomSetting from '../components/RoomSetting.jsx'
import { joinRoom, changeRoom, setSnackbarState, hiddenInfoCard, addActiveItem, setMenuState, setListShow, getRoomActiveInfo, updateRoomInfo } from '../actions'
function mapStateToProps(state) {
    let roomName = state.getIn(['roomCard','name']),
        nickname = state.getIn(['userState','nickname']),
        token = state.getIn(['userState','token']);
    let isCreater = state.getIn(['roomCard','creater']) === nickname;
    let isJoined = state.getIn(['roomList',roomName]);
    return {
        roomInfo: state.get('roomCard'),
        token,
        nickname,
        isJoined,
        isCreater
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ joinRoom, changeRoom, hiddenInfoCard, addActiveItem, setMenuState, setListShow, setSnackbarState, getRoomActiveInfo, updateRoomInfo },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(RoomSetting);