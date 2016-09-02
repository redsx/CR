import React, {PropTypes} from 'react'


import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import ArrowBack from 'material-ui/svg-icons/content/font-download.js'
import ArrowForward from 'material-ui/svg-icons/navigation/chevron-right.js'

import '../less/imageslide.less'


class ImageSlide extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zoom: 100
        };
    }
    handleClick(e){
        if(e.target === this.refs.content){
            this.props.setSlideState(false);
            this.setState({zoom:100});
        }
    }
    handleSwitch(path){
        if(path === 'pre'){
            this.props.switchImage('pre');
        } else{
            this.props.switchImage('next');
        }
        this.setState({zoom:100});
    }
    handleStorage(){
        let { addStorageExpression, storageSetting, deleteStorageExpression } = this.props;
        let imageSlide = this.props.imageSlide.toJS(),
            expressions = this.props.expressions.toJS();
        expressions.indexOf(imageSlide.slideArr[1].image) === -1 ? 
        addStorageExpression(imageSlide.slideArr[1].image)
        :deleteStorageExpression(imageSlide.slideArr[1].image);
        storageSetting();
    }
    render(){
        let { isShowSlide, slideArr } = this.props.imageSlide.toJS(),
            expressions = this.props.expressions.toJS();
        return !isShowSlide? null : (
            <div 
                ref = 'content' 
                className = 'imageContent'
                onClick = {(e)=>{this.handleClick(e)}} 
                data-flex = 'main:center cross:center'
            >
                <div className = 'image-slide-close-btn' onClick = {(e)=>this.props.setSlideState(false)}>
                    <i className = 'image-slide-close-icon'>&#xe674;</i>
                </div>
                <div className = 'image'>   
                    <img src = {slideArr[1].image} style = {{
                        overflow:'visible',
                        display: 'block',
                        margin: 'auto',
                        boxShadow: 'rgb(204, 204, 204) 0px 0px 4px 0px',
                        width: this.state.zoom + '%',
                    }}/>
                </div>
                <div
                    data-flex = 'center:main box:mean'
                    className = 'menu'
                >
                    <div data-flex = 'main:center cross center' data-flex-box = '1' className = 'image-slide-icon'>
                        <i 
                            onClick = {slideArr[0] === -1 ? null : ()=>this.handleSwitch('pre')}
                            className = 'image-slide-icon'
                            style = {{
                                color: slideArr[0] === -1 ? '#666' : '#BDBDBD'
                            }}
                        >
                            &#xe618;
                        </i>
                    </div>
                    <div data-flex = 'main:center cross center' data-flex-box = '1' className = 'image-slide-icon'>
                        <i
                            className = 'image-slide-icon'
                            onClick = {()=>this.setState({zoom:this.state.zoom+10})}
                        >
                            &#xe623;
                        </i>
                    </div>
                    <div data-flex = 'main:center cross center' data-flex-box = '1' className = 'image-slide-icon'>
                        <i
                            className = 'image-slide-icon'
                            onClick = {()=>this.setState({zoom:this.state.zoom-10})}
                        >
                            &#xe622;
                        </i>
                    </div>
                    <div data-flex = 'main:center cross center' data-flex-box = '1' className = 'image-slide-icon'>
                        <i
                            onClick = {()=>this.handleStorage()}
                            className = 'image-slide-icon'
                            style = {{
                                color: expressions.indexOf(slideArr[1].image) === -1?'#BDBDBD':'rgb(245, 182, 30)'
                            }}
                        >
                            &#xe62e;
                        </i>
                    </div>
                    <div data-flex = 'main:center cross center' data-flex-box = '1' className = 'image-slide-icon'>
                        <a href = {slideArr[1].image} target = '_blank'>
                            <i className = 'image-slide-icon' >&#xe636;</i>
                        </a>
                    </div>
                    <div data-flex = 'main:center cross center' data-flex-box = '1' className = 'image-slide-icon'>
                        <i
                            onClick = {slideArr[2] === -1 ? null : ()=>this.handleSwitch('next')}
                            className = 'image-slide-icon'
                            style = {{
                                color: slideArr[2] === -1 ? '#666' : '#BDBDBD'
                            }}
                        >
                            &#xe617;
                        </i>
                    </div>
                </div>
            </div>
        );
    }
}
ImageSlide.propTypes = {
    // imageSlide: PropTypes.object,
    switchImage: PropTypes.func,
    setSlideState: PropTypes.func,
    storageSetting: PropTypes.func,
    addStorageExpression: PropTypes.func,
    deleteStorageExpression: PropTypes.func,
    // expressions: PropTypes.array
}
export default ImageSlide;
