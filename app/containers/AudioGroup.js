import { connect } from 'react-redux'
import AudioGroup from '../components/AudioGroup.jsx'

function mapStateToProps(state) {
    return {
        audioNotification: state.getIn(['setting','audioNotification'])
    };
}
export default connect(mapStateToProps)(AudioGroup);