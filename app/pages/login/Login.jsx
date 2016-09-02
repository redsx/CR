import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import Sign from '../../containers/Sign.js'
import { login } from '../../actions' 

class Login extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Sign 
                    linkText = 'sign up'
                    btnText = 'login'
                    link = '/signUp'
                    clickFunc = {login}
                />
            </div>
        );
    }
}
Login.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Login;
