import React, {PropTypes} from 'react'

import InputAreaM from '../containers/InputAreaM.js'

class Dialog extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className = 'richtext-container'>
                <InputAreaM />
            </div>
        );
    }
}
export default Dialog;