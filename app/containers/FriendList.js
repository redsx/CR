import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FriendList from '../components/FriendList.jsx'
import { setUserCurRoom, clearCount, setScrollState, setMenuState } from '../actions'

function mapStateToProps(state) {
    return {
        onlineUsers:state.get('onlineUsers'),
        badgeCount: state.getIn(['pageState','badgeCount']),
        nickname: state.getIn(['userState','nickname']),
        isShowRoom: state.getIn(['pageState','isShowRoom'])
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setUserCurRoom, clearCount, setScrollState, setMenuState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(FriendList);