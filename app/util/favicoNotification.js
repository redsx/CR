import Favico from './favico.js'

const favicoNotification = (function (Favico,animation = 'popFade',type = '') {
    var favico = new Favico({
        type: type,
        animation:animation,
        bgColor : '#2ea3f2',
        textColor : '#fff',
    });
    var count = 0;
    var addBage = function () {
        count<=99 ? count++ : count = 'n'
        favico.badge(count);
    };
    var resetBage = function () {
        favico.badge(0);
        favico = new Favico({
            type: type,
            animation:animation,
            bgColor : '#2ea3f2',
            textColor : '#fff',
        });
        count = 0;
    };
    var errorBage = function () {
        favico.badge(0);
        favico = new Favico({
            type: type,
            animation:animation,
            bgColor : '#bf0a30',
            textColor : '#fff',
        });
        count = '!';
        favico.badge(count);
    }
    var resetWhenDocVisibility = function () {
        document.addEventListener('visibilitychange',() => {
            if(!document.hidden && count !== '!'){
                resetBage();
            }
        })
    };
    return {
        addBage,
        resetBage,
        resetWhenDocVisibility,
        errorBage
    }
})(Favico,'popFade');
export default favicoNotification;