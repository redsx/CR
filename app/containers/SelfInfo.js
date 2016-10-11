import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SelfInfo from '../components/SelfInfo.jsx'
import { setListShow, setSystemSettingState, setMenuState, logout, getRoomList, setCreateRoomState } from '../actions'

function mapStateToProps(state) {
    return {
        user: state.get('userState'),
        listState: state.getIn(['pageState','listState'])
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setListShow, setSystemSettingState, setMenuState, logout, getRoomList, setCreateRoomState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(SelfInfo);