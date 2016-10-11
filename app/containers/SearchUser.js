import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchUser from '../components/SearchUser.jsx'
import Immutable from 'immutable'

import { setSearchUserState, changeRoom, searchUser } from '../actions'

function mapStateToProps(state) {
    return {
        room: state.getIn(['userState','room']),
        isShow: state.getIn(['pageState','isShowSearchUser']),
        userList: state.get('searchUser') || Immutable.fromJS({})
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSearchUserState, changeRoom, searchUser },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchUser);