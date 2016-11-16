import React, {PropTypes} from 'react'

import InputAreaM from '../containers/InputAreaM.js'

class RichText extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
                this.props.isShowRichText ?
                <div className = 'richtext-container'>
                    <InputAreaM />
                </div>
                :null
        );
    }
}
export default RichText;