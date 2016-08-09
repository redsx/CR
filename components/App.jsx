import React, {PropTypes} from 'react'

import Menu from './Menu.jsx'
import ChatArea from '../containers/ChatArea.js'
import AudioGroup from '../containers/AudioGroup.js'
import ImageSlide from '../containers/ImageSlide.js'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const styles = {
    container: {
        width: '100%',
        height: '100%',
        overflow:'hidden',
        position:'relative'
    },
    block2: {
        height: '100%',
    }
}
class App extends React.Component{
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
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div style = {styles.container}>
                    <ImageSlide />
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
                        <div data-flex = 'main:center box:mean' style = {styles.block2}>
                            <ChatArea />
                        </div>
                    </div>
                    <AudioGroup />
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    menuState: PropTypes.bool,
}

export default App;

// {this.props.children}