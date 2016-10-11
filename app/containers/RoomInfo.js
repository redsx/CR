import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Immutable from 'immutable'

import { setRoomInfoState, changeRoom, getRoomInfo, setSearchUserState } from '../actions'
import RoomInfo from '../components/RoomInfo.jsx'
function mapStateToProps(state) {
    return {
        isShowRoomInfo: state.getIn(['pageState','isShowRoomInfo']),
        roomInfo: state.get('roomInfo') || Immutable.fromJS({}),
        user: state.getIn(['userState','nickname'])
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setRoomInfoState, changeRoom, getRoomInfo, setSearchUserState },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RoomInfo);