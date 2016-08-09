import { connect } from 'react-redux'
import ChatArea from '../components/ChatArea.jsx'
import { bindActionCreators } from 'redux'

import { setScrollState } from '../actions'


function mapStateToProps(state) {
    return {
        messages:state.messages,
        privateMessages: state.privateMessages,
        onlineUsers: state.onlineUsers,
        user: state.userState,
        isNeedScroll: state.pageState.isNeedScroll
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setScrollState },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatArea);