import { connect } from 'react-redux'
import AudioGroup from '../components/AudioGroup.jsx'

function mapStateToProps(state) {
    return {
        src: state.setting.audio.src
    }
}
export default connect(mapStateToProps)(AudioGroup);