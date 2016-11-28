import React, {PropTypes} from 'react/'

import Menu from '../../components/Menu.jsx'
import Loading from '../../components/Loading.jsx'
import ChatArea from '../../containers/ChatArea.js'
import AudioGroup from '../../containers/AudioGroup.js'
import ImageSlide from '../../containers/ImageSlide.js'
import CreateRoom from '../../containers/CreateRoom.js'
import SearchUser from '../../containers/SearchUser.js'
import SystemSetting from '../../containers/SystemSetting.js'
import RichText from '../../containers/RichText.js'
import Modal from '../../containers/Modal.js'
import browser from '../../util/browser.js'

import '../../less/indexpage.less'

class Index extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
        let handle = null;
        let rightBox = this.refs.rightBox;
        window.addEventListener('resize',(event) => {
            if(window.innerWidth>980){
                handle && clearTimeout(handle);
                handle = setTimeout(function () {
                    rightBox.style.width = window.innerWidth - 275 + 'px'
                },200)
            }
            if(browser.versions.mobile){
                this.props.setScrollState(true);
            }
            if(this.props.isShowRoomInfo && window.innerWidth < 581){
                this.props.setRoomInfoState(false);
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
                    {
                        this.props.loadingState ?  <Loading color = '#ccc'/> : <ChatArea />
                    }
                    </div>
                </div>
                <SystemSetting />
                <ImageSlide />
                <AudioGroup />
                <CreateRoom />
                <SearchUser />
                <RichText />
                <Modal />
            </div>
        );
    }
}

App.propTypes = {
    menuState: PropTypes.bool,
}

export default Index;
