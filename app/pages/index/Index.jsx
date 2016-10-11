import React, {PropTypes} from 'react/'

import Menu from '../../components/Menu.jsx'
import ChatArea from '../../containers/ChatArea.js'
import AudioGroup from '../../containers/AudioGroup.js'
import ImageSlide from '../../containers/ImageSlide.js'
import CreateRoom from '../../containers/CreateRoom.js'
import SearchUser from '../../containers/SearchUser.js'
import SystemSetting from '../../containers/SystemSetting.js'
import '../../less/indexpage.less'

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
    //背景图片可控制
    render(){
        return (
            <div style = {{
                backgroundImage: 'url(' + this.props.bgImage + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(245,245,245,1)',
            }}>
                
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
                <SystemSetting />
                <ImageSlide />
                <AudioGroup />
                <CreateRoom />
                <SearchUser />
            </div>
        );
    }
}

App.propTypes = {
    menuState: PropTypes.bool,
}

export default Index;
