import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Immutable from 'immutable'

import RichText from '../components/RichText.jsx'
function mapStateToProps(state) {
    return {
        isShowRichText: state.getIn(['pageState','isShowRichText']),
    };
}

export default connect(mapStateToProps)(RichText);