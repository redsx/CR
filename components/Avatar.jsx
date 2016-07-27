import React, {PropTypes} from 'react'

class Avatar extends React.Component{
    constructor(props){
        super(props);
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
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
                onClick = {()=>{nickname === ''?null:getUserInfo(nickname)}}
            >
            </div>
            
        );
    }
}
Avatar.propTypes = {
    size: PropTypes.number,
    src: PropTypes.string,
    nickname: PropTypes.string,
    getUserInfo: PropTypes.func
}
export default Avatar;

// <MAvatar 
//     src = {src}
//     size = {size}
//     onClick = {()=>{getUserInfo(nickname)}}
// />