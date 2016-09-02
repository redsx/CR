import React, {PropTypes} from 'react'

 class AudioGroup extends React.Component{
     constructor(props){
         super(props);
     }
     shouldComponentUpdate(){
         return false;
     }
     
     componentDidMount(){
         let audios = [{},{},{}];
         let firstLoad = true;
         audios[0].aduio = document.getElementById('audio1');
         audios[0].isPlay = false;
         audios[1].aduio = document.getElementById('audio2');
         audios[1].isPlay = false;
         audios[2].aduio = document.getElementById('audio3');
         audios[2].isPlay = false;
         document.addEventListener('click', () => {
             if(firstLoad){
                for(let i = 0;i < audios.length; i++){
                    audios[i].aduio.volume = 0;
                    audios[i].aduio.playbackRate = 5;
                    audios[i].aduio.play();
                    audios[i].aduio.addEventListener('ended',() => {
                        if(!audios[i].aduio.isPlay){
                            audios[i].aduio.volume = 1;
                            audios[i].aduio.playbackRate = 1;
                            audios[i].isPlay = true;
                        }
                    })
                }
                firstLoad = false;
             }
         })
     }
     render(){
         return (
             <div>
                <audio src = '/audio/line_a_3.ogg' id = 'audio1'></audio>
                <audio src = '/audio/line_b_6.ogg' id = 'audio2'></audio>
                <audio src = '/audio/push_bell_a.ogg' id = 'audio3'></audio>
            </div>
         );
     }
 }
 export default AudioGroup;
