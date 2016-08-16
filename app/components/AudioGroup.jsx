import React, {PropTypes} from 'react'
 class AudioGroup extends React.Component{
     constructor(props){
         super(props);
     }
     render(){
         let { src1, src2, src3 } = this.props.src;
         return (
             <div>
                <audio src = {src1} id = 'audio1'></audio>
                <audio src = {src2} id = 'audio2'></audio>
                <audio src = {src3} id = 'audio3'></audio>
            </div>
         );
     }
 }
 AudioGroup.protoTypes = {
     src: PropTypes.object
 }
 export default AudioGroup;