import React, {PropTypes} from 'react'

class Avatar extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(e){
        let { nickname, addExpression, getUserInfo } = this.props;
        if(e.shiftKey){
            nickname === '' ? null : addExpression('@'+nickname+' ');
        } else{
            nickname === '' ? null : getUserInfo(nickname);
        }
    }
    render(){
        let { size, src, nickname, getUserInfo } = this.props;
        return (
            <div 
                style = {{
                    width: size + 'px',
                    height: size + 'px',
                    borderRadius: '50%',
                    backgroundImage: 'url(' + src + ')',
                    backgroundColor: 'white',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                }}
                onClick = {(e)=>this.handleClick(e)}
            >
            </div>
            
        );
    }
}
Avatar.propTypes = {
    size: PropTypes.number,
    src: PropTypes.string,
    nickname: PropTypes.string,
    getUserInfo: PropTypes.func,
    addExpression: PropTypes.func
}
export default Avatar;
