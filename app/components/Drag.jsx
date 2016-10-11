import React, {PropTypes} from 'react'

class Drag extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            x:this.props.x,
            y:this.props.y,
        }
    }
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
