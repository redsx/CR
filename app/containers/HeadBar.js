import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HeadBar from '../components/HeadBar.jsx'
import { setMenuState } from '../actions'
function mapStateToProps(state) {
    return {
        menuState:state.getIn(['pageState','isShowMenu']),
        curRoom: state.getIn(['userState','curRoom'])
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setMenuState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(HeadBar);