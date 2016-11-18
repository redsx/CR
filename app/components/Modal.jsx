import React, {PropTypes} from 'react'
import Immutable from 'immutable'
import Loading from './Loading.jsx'

import { getRichTextContent } from '../actions'

import '../less/modal.less'

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content: ''
        }
    }
    handleClick(){
        this.props.setModalState({
            modalInfo: {
                title: '',
                owner: '',
                timestamp: 0,
            },
            isShow: false
        })
    }
    componentWillReceiveProps(nextProps){
        let npm = nextProps.modalState.get('modalInfo').toJS()
        let willGet = !Immutable.is(this.props.modalState.get('modalInfo'),nextProps.modalState.get('modalInfo')) && npm.title !== '';
        if(willGet){
            this.setState({content: ''});
            getRichTextContent(npm).then((resault) => {
                this.setState({content: resault.content});
            }).catch((err) => {
                this.props.setSnackbarState({
                    content: body.errMsg,
                    open: true
                })
            });
        }
    }
    render(){
        let { modalInfo, isShow } = this.props.modalState.toJS();
        return isShow ? 
            (
                <div className = 'modal-container'>
                    <div className = 'modal'>
                        <div className = 'modal-header'>
                            <span className = 'modal-title'> {modalInfo.title} </span>
                            <span 
                                className = 'modal-close-btn'
                                onClick = {() => this.handleClick()}
                            >
                                <i className = 'icon'>&#xe672;</i>
                            </span>
                        </div>
                        <div className = 'modal-content'>
                            {
                                this.state.content === '' ?
                                <Loading 
                                    color = '#ccc'
                                    height = '80%'
                                    width = '100%'
                                />
                                :
                                <div dangerouslySetInnerHTML= { {__html: this.state.content}} />
                            }
                        </div>
                    </div>
                </div>
            )
            : null
    }
}
export default Modal;