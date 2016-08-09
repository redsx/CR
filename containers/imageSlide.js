import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ImageSlide from '../components/ImageSlide.jsx'

import { setSlideState, switchImage, addStorageExpression, storageSetting, deleteStorageExpression } from '../actions'

function mapStateToProps(state) {
    return {
        imageSlide: state.imageSlide,
        expressions: state.storageExpressions
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSlideState, switchImage, addStorageExpression, storageSetting, deleteStorageExpression },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ImageSlide);