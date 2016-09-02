import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import App from '../components/App.jsx'

import { setMenuState } from '../actions'
function mapStateToProps(state) {
    return {
        menuState: state.getIn(['pageState','isShowMenu'])
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setMenuState },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(App);