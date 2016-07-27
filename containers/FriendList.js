import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FriendList from '../components/FriendList.jsx'
import { setUserCurRoom, clearCount } from '../actions'

function mapStateToProps(state) {
    return {
        onlineUsers:state.onlineUsers,
        badgeCount: state.pageState.badgeCount,
        nickname: state.userState.nickname,
        isShowRoom: state.pageState.isShowRoom
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setUserCurRoom, clearCount },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(FriendList);