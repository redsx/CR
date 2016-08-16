import React, {PropTypes} from 'react'

class Drag extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            x:this.props.x,
            y:this.props.y,
        }
    }
    // handleDown(e){
    //     this.setState({
    //         offsetX: e.nativeEvent.offsetX,
    //         offsetY: e.nativeEvent.offsetY,
    //         isDown: true
    //     });
    // }
    // handleMove(e){
    //     if(this.state.isDown){
    //         let pageX = e.pageX,
    //             pageY = e.pageY;
    //         this.setState({
    //             x: pageX - this.state.offsetX,
    //             y: pageY - this.state.offsetY
    //         })
    //     }
    // }
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
    handleDragStart(e){
        e.target.style.opacity = 0;
        this.setState({
            offsetX: e.nativeEvent.offsetX,
            offsetY: e.nativeEvent.offsetY,
        });
    }
    handleDrag(e){
        e.target.style.opacity = 1;
        let pageX = e.pageX,
            pageY = e.pageY;
        if(pageX !== 0 && pageY !== 0){
            this.setState({
                x: pageX - this.state.offsetX,
                y: pageY - this.state.offsetY
            })
        }
    }
    render(){
        return (
            <span 
                draggable = {true}
                style = {{
                    position: 'fixed',
                    cursor: 'move',
                    zIndex: '999',
                    top: this.state.y,
                    left: this.state.x
                }}
                onDragStart = {(e)=>{this.handleDragStart(e)}}
                onDrag = {(e)=>{this.handleDrag(e)}}
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
