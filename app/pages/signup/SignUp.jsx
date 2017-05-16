import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import Sign from '../../containers/Sign.js'
import { signUp } from '../../actions' 

class SignUp extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Sign 
                    linkText = 'login'
                    btnText = 'sign up'
                    link = '/login'
                    clickFunc = {signUp}
                    history = {this.props.history}
                />
            </div>
        );
    }
}
SignUp.contextTypes = {
    router: PropTypes.object.isRequired
}
export default SignUp;
