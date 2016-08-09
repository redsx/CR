import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FriendList from '../components/FriendList.jsx'
import { setUserCurRoom, clearCount, setScrollState } from '../actions'

function mapStateToProps(state) {
    return {
        onlineUsers:state.onlineUsers,
        badgeCount: state.pageState.badgeCount,
        nickname: state.userState.nickname,
        isShowRoom: state.pageState.isShowRoom
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setUserCurRoom, clearCount, setScrollState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(FriendList);