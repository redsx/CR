import React, {PropTypes} from 'react'


import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import ArrowBack from 'material-ui/svg-icons/content/font-download.js'
import ArrowForward from 'material-ui/svg-icons/navigation/chevron-right.js'

const styles = {
    imageContent: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex:'998',
        overflow: 'scroll',
        background: 'rgba(0,0,0,0.7)'
    },
    image: {
        position: 'relative',
        maxWidth: '100%',
        margin: 'auto',
        textAlign: 'center',
        overflow: 'visible',
    },
    menu: {
        position: 'fixed',
        left: '50%',
        bottom: '60px',
        marginLeft: '-125px',
        padding: '0 10px',
        width: '260px',
        height: '45px',
        borderRadius: '20px',
        background: 'rgba(8, 8, 8, 0.52)'
    },
    icon: {
        fontFamily: 'iconfont',
        color: '#BDBDBD',
        fontSize: '1.5rem',
        width: '40px',
        height: '45px',
        textAlign: 'center',
        lineHeight: '45px',
        cursor: 'pointer'
    },
    arrowBack: {
        position: 'absolute',
        top: '50%',
        marginTop: '-64px',
        left: '-6rem',
        zIndex: '1'
    },
    arrowForward: {
        position: 'absolute',
        top: '50%',
        marginTop: '-64px',
        right: '-6rem',
        zIndex: '1'
    }
}
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
        let { imageSlide, addStorageExpression, storageSetting, deleteStorageExpression, expressions } = this.props;
        expressions.indexOf(imageSlide.slideArr[1].image) === -1 ? 
        addStorageExpression(imageSlide.slideArr[1].image)
        :deleteStorageExpression(imageSlide.slideArr[1].image);
        storageSetting();
    }
    render(){
        let { isShowSlide, slideArr } = this.props.imageSlide,
            expressions = this.props.expressions;
        return !isShowSlide? null : (
            <div 
                ref = 'content' 
                style = {styles.imageContent} 
                onClick = {(e)=>{this.handleClick(e)}} 
                data-flex = 'main:center cross:center'
            >
                <div style = {styles.image} >   
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
                    style = {styles.menu}
                >
                    <div data-flex = 'main:center cross center' data-flex-box = '1' style = {styles.icon}>
                        <span 
                            onClick = {slideArr[0] === -1 ? null : ()=>this.handleSwitch('pre')}
                            style = {{
                                color: slideArr[0] === -1 ? '#666' : '#BDBDBD'
                            }}
                        >
                            &#xe618;
                        </span>
                    </div>
                    <div data-flex = 'main:center cross center' data-flex-box = '1' style = {styles.icon}>
                        <span
                            onClick = {()=>this.setState({zoom:this.state.zoom+10})}
                        >
                            &#xe623;
                        </span>
                    </div>
                    <div data-flex = 'main:center cross center' data-flex-box = '1' style = {styles.icon}>
                        <span
                            onClick = {()=>this.setState({zoom:this.state.zoom-10})}
                        >
                            &#xe622;
                        </span>
                    </div>
                    <div data-flex = 'main:center cross center' data-flex-box = '1' style = {styles.icon}>
                        <span
                            onClick = {()=>this.handleStorage()}
                            style = {{
                                color: expressions.indexOf(slideArr[1].image) === -1?'#BDBDBD':'#FFC809'
                            }}
                        >
                            &#xe62e;
                        </span>
                    </div>
                    <div data-flex = 'main:center cross center' data-flex-box = '1' style = {styles.icon}>
                        <a href = {slideArr[1].image} target = '_blank'>
                            <span style = {styles.icon}>&#xe636;</span>
                        </a>
                    </div>
                    <div data-flex = 'main:center cross center' data-flex-box = '1' style = {styles.icon}>
                        <span
                            onClick = {slideArr[2] === -1 ? null : ()=>this.handleSwitch('next')}
                            style = {{
                                color: slideArr[2] === -1 ? '#666' : '#BDBDBD'
                            }}
                        >
                            &#xe617;
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
ImageSlide.propTypes = {
    imageSlide: PropTypes.object,
    switchImage: PropTypes.func,
    setSlideState: PropTypes.func,
    storageSetting: PropTypes.func,
    addStorageExpression: PropTypes.func,
    deleteStorageExpression: PropTypes.func,
    expressions: PropTypes.array
}
export default ImageSlide;
