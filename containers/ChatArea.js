import { connect } from 'react-redux'
import ChatArea from '../components/ChatArea.jsx'

function mapStateToProps(state) {
    return {
        messages:state.messages,
        privateMessages: state.privateMessages,
        onlineUsers: state.onlineUsers,
        user: state.userState
    }
}
export default connect(mapStateToProps)(ChatArea);