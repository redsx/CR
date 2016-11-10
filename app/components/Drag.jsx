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
            pageY = e.pageY,
            width = this.props.width,
            height = this.props.height,
            x = pageX - this.state.offsetX,
            y = pageY - this.state.offsetY;
        if(x < 0) x = 0;
        if(x > window.innerWidth - width) x = window.innerWidth - width;
        if(y < 0) y = 0;
        if(y > window.innerHeight - height) y = window.innerHeight - height;
        if(pageX !== 0 && pageY !== 0){
            this.setState({x,y})
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
Drag.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
}
export default Drag;
