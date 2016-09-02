import { connect } from 'react-redux'
import ChatArea from '../components/ChatArea.jsx'
import { bindActionCreators } from 'redux'
import { setScrollState } from '../actions'


function mapStateToProps(state) {
    return {
        messages:state.get('messages'),
        privateMessages: state.get('privateMessages'),
        onlineUsers: state.get('onlineUsers'),
        user: state.get('userState'),
        isNeedScroll: state.getIn(['pageState','isNeedScroll'])
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setScrollState },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatArea);