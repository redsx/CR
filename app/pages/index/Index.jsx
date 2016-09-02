import React, {PropTypes} from 'react/'
import { browserHistory, hashHistory, Router, Route, IndexRoute } from 'react-router'

import Menu from '../../components/Menu.jsx'
import ChatArea from '../../containers/ChatArea.js'
import AudioGroup from '../../containers/AudioGroup.js'
import ImageSlide from '../../containers/ImageSlide.js'
import Snackbar from '../../containers/Snackbar.js'


class Index extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
        let handle = null;
        let rightBox = this.refs.rightBox;
        window.addEventListener('resize',function(event){
            if(window.innerWidth>980){
                handle && clearTimeout(handle);
                handle = setTimeout(function () {
                    rightBox.style.width = window.innerWidth - 275 + 'px'
                },200)
            }
        });
    }
    render(){
        return (
            <div>
                <div 
                    className = {this.props.menuState?'left-box':'left-box-show'}
                >
                    <Menu />
                </div>
                <div 
                    className = {this.props.menuState?'right-box':'right-box-show'}
                    ref = 'rightBox'
                    style = {{
                        width: window.innerWidth - 275 + 'px'
                    }}
                >
                    <div data-flex = 'main:center box:mean' style = {{height:'100%'}}>
                        <ChatArea />
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    menuState: PropTypes.bool,
}

export default Index;
