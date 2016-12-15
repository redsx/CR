import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import '../less/snackbar.less'

class Snackbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: this.props.snackbar.get('open') || false,
        };
        this.timer = null;
    }
    componentWillReceiveProps(nextProps){
        let snackbar = this.props.snackbar.toJS(),
            nextSnackbar = nextProps.snackbar.toJS();
        let autoHideDuration= snackbar.autoHideDuration || 3000;
        console.log(nextSnackbar);
        if(!nextSnackbar.open) return this.handleClose();
        if(!this.state.open){
            this.setState({open: nextSnackbar.open});
        } else{
            setTimeout(()=>this.setState({open: nextSnackbar.open}),autoHideDuration);
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.state.open != nextState.open){
            return true
        }
        return false;
    }
    handleClose(timer){
        this.timer ? clearTimeout(this.timer) : null;
        this.setState({open:false});
        this.props.onRequestClose ? this.props.onRequestClose() : null;
    }
    componentDidUpdate(){
        let autoHideDuration= this.props.snackbar.get('autoHideDuration') || 3000;
        if(this.state.open && autoHideDuration < 60*1000){
            this.timer = setTimeout(()=>this.setState({open:false}),autoHideDuration);
        }
    }
    render(){
        return (
            <ReactCSSTransitionGroup
                component = 'div'
                transitionName = 'snackbar'
                transitionEnterTimeout = {500}
                transitionLeaveTimeout = {500}
            >
            {
                !this.state.open ? null :
                <div className = 'snackbar'>
                    <span>
                        {this.props.snackbar.get('content') || 'default content'}
                    </span>
                    <span className = 'close-btn' onClick = {()=>{this.handleClose()}}>
                        关闭
                    </span>
                </div>
            }
            </ReactCSSTransitionGroup>
        );
    }
}
Snackbar.propTypes = {
    open: PropTypes.bool,
    autoHideDuration: PropTypes.number
}
export default Snackbar;