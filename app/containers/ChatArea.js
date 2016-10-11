import { connect } from 'react-redux'
import ChatArea from '../components/ChatArea.jsx'
import { bindActionCreators } from 'redux'
import { setScrollState, setRoomInfoState, getRoomHistory, getPrivateHistory } from '../actions'
import Immutable from 'immutable'

function mapStateToProps(state) {
    let messagesFrom = state.getIn(['userState','isPrivate']) ? 'privateMessages' : 'messages';
    let curRoom = state.getIn(['userState','curRoom']);
    let messages = state.getIn([messagesFrom,curRoom]) || Immutable.fromJS([]);
    return {
        messages: messages,
        user: state.get('userState'),
        isNeedScroll: state.getIn(['pageState','isNeedScroll']),
        isShowRoomInfo: state.getIn(['pageState','isShowRoomInfo'])
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setScrollState, setRoomInfoState, getRoomHistory, getPrivateHistory },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatArea);