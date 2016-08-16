import React, {PropTypes} from 'react'

class SystemMessage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div 
                data-flex = 'main:center cross:center'
                style = {{
                    padding:'10px 0px 0px 0px'
                }}
            >
                <span
                    style = {{
                        color: '#998',
                        fontSize: '0.8rem',
                        textAlign: 'center'
                    }}
                >
                    {this.props.content}
                </span>
            </div>
        );
    }
}
export default SystemMessage;