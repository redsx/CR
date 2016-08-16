import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InfoCard from '../components/InfoCard.jsx'
import { hiddenInfoCard, setUserInfo } from '../actions'
function mapStateToProps(state) {
    return {
        infoCardState: state.pageState.infoCardState,
        user: state.userState
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ hiddenInfoCard, setUserInfo },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(InfoCard);