import Favico from './favico.js'

const favicoNotification = (function (Favico,animation = 'popFade',type = '') {
    var favico = new Favico({
        type: type,
        animation:animation
    });
    var count = 0;
    var addBage = function () {
        count<=9 ? count++ : count = 'n'
        favico.badge(count);
    };
    var resetBage = function () {
        count = 0;
        favico.badge(count);
    };
    var resetWhenDocVisibility = function () {
        document.addEventListener('visibilitychange',() => {
            if(!document.hidden){
                count = 0;
                favico.badge(count);
            }
        })
    };
    return {
        addBage,
        resetBage,
        resetWhenDocVisibility
    }
})(Favico,'popFade');
export default favicoNotification;