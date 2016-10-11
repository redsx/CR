import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Index from './Index.jsx'

import { setMenuState } from '../../actions'
function mapStateToProps(state) {
    return {
        menuState: state.getIn(['pageState','isShowMenu']),
        bgImage: state.getIn(['setting','bgImage'])
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setMenuState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Index);