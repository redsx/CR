import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HeadBar from '../components/HeadBar.jsx'
import { setMenuState, setRoomInfoState, getRoomActiveInfo } from '../actions'
function mapStateToProps(state) {
    let curRoom = state.getIn(['userState','curRoom']);
    let avatar = state.getIn(['activeList',curRoom,'avatar']);
    return {
        curRoom: curRoom,
        avatar: avatar,
        isPrivate: state.getIn(['userState','isPrivate']),
        menuState:state.getIn(['pageState','isShowMenu']),
        isShowRoomInfo: state.getIn(['pageState','isShowRoomInfo'])
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setMenuState, setRoomInfoState, getRoomActiveInfo },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(HeadBar);