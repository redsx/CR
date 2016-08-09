import React, {PropTypes} from 'react'

class Drag extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            x:this.props.x,
            y:this.props.y,
            isDown: false
        }
    }
    handleDown(e){
        this.setState({
            offsetX: e.nativeEvent.offsetX,
            offsetY: e.nativeEvent.offsetY,
            isDown: true
        });
    }
    handleMove(e){
        if(this.state.isDown){
            let pageX = e.pageX,
                pageY = e.pageY;
            this.setState({
                x: pageX - this.state.offsetX,
                y: pageY - this.state.offsetY
            })
        }
    }
    // handleTouchStart(e){
    //     let pageX = e.nativeEvent.touches[0].pageX,
    //         pageY = e.nativeEvent.touches[0].pageY,
    //         x = this.props.x,
    //         y = this.props.y;
    //     this.setState({
    //         offsetX: pageX - x,
    //         offsetY: pageY - y,
    //         isDown: true
    //     });
    // }
    // handleTouchMove(e){
    //     if(this.state.isDown){
    //         let pageX = e.nativeEvent.touches[0].pageX,
    //             pageY = e.nativeEvent.touches[0].pageY;
    //         this.setState({
    //             x: pageX - this.state.offsetX,
    //             y: pageY - this.state.offsetY
    //         })
    //     }
    // }
    componentDidMount(){
        document.addEventListener('mouseup',()=>{
            if(this.state.isDown){
                this.setState({
                    isDown: false
                });
            }
        })
        document.addEventListener('touchend',()=>{
            if(this.state.isDown){
                this.setState({
                    isDown: false
                });
            }
        })
    }
    render(){
        return (
            <span 
                style = {{
                    position: 'fixed',
                    cursor: 'move',
                    zIndex: '999',
                    top: this.state.y,
                    left: this.state.x
                }}
                onMouseDown = {(e)=>{this.handleDown(e)}}
                onMouseMove = {(e)=>{this.handleMove(e)}}
            >
                {this.props.component}
            </span>
        );
    }
}
Drag.defaultProps = {
    x:0,
    y:0
}
export default Drag;

// onTouchStart = {(e)=>{this.handleTouchStart(e)}}
// onTouchMove = {(e)=>{this.handleTouchMove(e)}}