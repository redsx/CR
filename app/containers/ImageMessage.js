import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImageMessage from '../components/ImageMessage.jsx'
import { setSlideState, findSlideArr } from '../actions'
function mapStateToProps(state) {
    return {}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSlideState, findSlideArr },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ImageMessage);