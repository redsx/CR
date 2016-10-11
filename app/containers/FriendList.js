import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FriendList from '../components/FriendList.jsx'
import { changeRoom, clearCount, setScrollState, setMenuState, searchRoom, deleteActiveItem, getRoomInfo } from '../actions'

function mapStateToProps(state) {
    return {
        activeList: state.get('activeList'),
        roomList: state.get('roomList'),
        searchList: state.get('searchList'),
        badgeCount: state.getIn(['pageState','badgeCount']),
        nickname: state.getIn(['userState','nickname']),
        listState: state.getIn(['pageState','listState']),
        curRoom: state.getIn(['userState','curRoom'])
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changeRoom, clearCount, setScrollState, setMenuState, searchRoom, deleteActiveItem, getRoomInfo },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(FriendList);