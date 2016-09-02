import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Setting from '../components/Setting.jsx'
import { getUserInfo } from '../actions'
function mapStateToProps(state) {
    return {
        setting:state.get('setting')
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getUserInfo },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Setting);