import React, {PropTypes} from 'react'

import '../less/loading.less'
class  Loading extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div 
                className= 'loading'
                style = {{
                    width: this.props.size + 'px',
                    height: this.props.size + 'px'
                }}
            >
            <div className= 'loading-center'>
                <div className= 'loading-center-absolute'>
                    <div className = 'object object_one' style = {{background: this.props.color}}></div>
                    <div className = 'object object_two' style = {{background: this.props.color}}></div>
                    <div className = 'object object_three' style = {{background: this.props.color}}></div>
                    <div className = 'object object_four' style = {{background: this.props.color}}></div>
                </div>
            </div>
            </div>
        );
    }
}
export default Loading;
