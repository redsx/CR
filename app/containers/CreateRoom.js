import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CreateRoom from '../components/CreateRoom.jsx'

import { setCreateRoomState, createRoom, changeRoom, getRoomList } from '../actions'

function mapStateToProps(state) {
    return {
        user: state.getIn(['userState']),
        isShow: state.getIn(['pageState','isShowCreateRoom'])
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setCreateRoomState, createRoom, changeRoom, getRoomList },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(CreateRoom);