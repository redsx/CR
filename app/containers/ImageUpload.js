import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ImageUpload from '../components/ImageUpload.jsx'

import { addPrivateMessage } from '../actions'

function mapStateToProps(state) {
    return {
        user: state.get('userState')
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addPrivateMessage },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ImageUpload);