import React, {PropTypes} from 'react'
 class AudioGroup extends React.Component{
     constructor(props){
         super(props);
         this.firstClick = true;
         this.isChange = false;
     }
     componentDidMount(){
         let audios = [];
         audios[0] = document.getElementById('audio1');
         audios[1] = document.getElementById('audio2');
         audios[2] = document.getElementById('audio3');
         document.addEventListener('click', () => {
             if(this.isChange || this.firstClick){
                this.firstClick = false;
                this.isChange = false;
                for(let i = 0;i < audios.length; i++){
                    audios[i].volume = 0;
                    audios[i].play();
                    setTimeout(()=>{
                        audios[i].pause();
                        audios[i].currentTime = 0
                        audios[i].volume = 1; 
                    },1000);
                }
             }
         })
     }
     shouldComponentUpdate(nextProps,nextState){
         if(this.props.src.src1 != nextProps.src.src1){
            this.isChange = true;
            return true;
        }
        return false;
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