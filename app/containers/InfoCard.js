import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InfoCard from '../components/InfoCard.jsx'
import { hiddenInfoCard, setUserInfo, getUserInfo } from '../actions'
function mapStateToProps(state) {
    return {
        infoCardState: state.getIn(['pageState','infoCardState']),
        user: state.getIn(['userState','nickname'])
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ hiddenInfoCard, setUserInfo, getUserInfo },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(InfoCard);