import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Index from './Index.jsx'

import { setMenuState, setScrollState, setRoomInfoState } from '../../actions'
function mapStateToProps(state) {
    return {
        loadingState: state.getIn(['pageState','isLoading']),
        menuState: state.getIn(['pageState','isShowMenu']),
        bgImage: state.getIn(['setting','bgImage']),
        isShowRoomInfo: state.getIn(['pageState','isShowRoomInfo']),
        userState: state.get('userState')
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setMenuState, setScrollState, setRoomInfoState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Index);