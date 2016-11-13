import jQuery from 'jquery';
import api from '../api.js';

const shitImg =`data:image/gif;base64,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`

window.jQuery = jQuery;
window.$ = jQuery;

const $ = window.$;

const width = 40;
const $shitTpl = $(`<img style="width:${width}px;" src=${shitImg}>`);


const name = 'shit';
const showBase = true;

function process(message) {
    const match = message.content.trim().match(/^([a-zA-Z0-9_-]+)\s*\(([\s\S]*)\)\s*;?\s*$/);
    return {
        from: message.from.username,
        content: match[2],
    };
}

function render(info, isNew) {
    const $bomb = $shitTpl.clone();

    if (!isNew) {
        return $bomb;
    }

    let argStr = info.get('content');
    const from = info.get('from');

    argStr = argStr.replace(/&quot;/g, '"');

    let userName;
    let radius;
    if (argStr === '，') {
        userName = '，';
    } else {
        argStr = argStr.split('，').join(',');
        const args = argStr.split(/(?=[^\\]),/);
        userName = args[0];
        radius = args[1];
    }
    if (!radius) {
        radius = 1;
    }
    if (radius > 50) {
        radius = 50;
    }

    setTimeout(() => {
        const $source = api.findUserMessage(from);


        let $target = api.findUserMessage(userName);
        let $targetAvatar;
        if (!$target) {
            console.warn(`目标${userName}不存在, 即将自扔`);
            $target = $source;
            $targetAvatar = $source.avatar;
        } else {
            $targetAvatar = $target.avatar;
        }


        if (!$targetAvatar.length) {
            console.warn(`目标${userName}头像不存在, 即将自扔`);
            $target = $source;
            $targetAvatar = $source.avatar;
        }


        $source.find('.text').replaceWith($bomb);
        const pos1 = $targetAvatar.offset();
        pos1.top -= $targetAvatar.height();
        pos1.top += 13;
        const pos2 = $bomb.offset();
        let finalDeg;
        if ($target[0] === $source[0]) {
            finalDeg = -10;
            pos1.left -= 10;
        } else {
            finalDeg = 10;
            pos1.left += 10;
        }


        if ($source.css('flex-direction') === 'row') {
            $bomb.css('left', '-20px')
                .css('bottom', '-20px')
                .css('transform', 'translate(50%,-50%)');
        } else {
            $bomb.css('left', `${width / 2}px`)
                .css('bottom', `-${width / 2}px`)
                .css('transform', 'translate(-50%,-50%)');
        }

        const G = 0.0007;
        const time = 1000;

//      x=vt+at2; v=(x-at2)/t 贴心小公式 helpful-little-format
        const v = (pos1.top - pos2.top - G * time * time) / time;

        $bomb.css('opacity', '0')
            .css('position', 'relative')
            .animate({
                opacity: '1',
            }, {
                duration: 500,
                easing: 'easeOutBack',
                done: function () {
                    $(this).css('left', '')
                        .css('bottom', '')
                        .css('transform', '');
                },
            })
            .delay(200)
            .animate({
                left: pos1.left - pos2.left,
                borderSpacing: 1000,
            }, {
                duration: 1000,
                easing: 'linear',
                step: function (now, fx) {
                    if (fx.prop === 'borderSpacing') {
                        $bomb.css({
                            transform: `rotate(${now / 1000 * 360 + finalDeg}deg)`,
                            top: v * now + G * now * now,
                        });
                    }
                },
                done: function () {
                    $(this).css('transform', '')
                        .css('borderSpacing', '1000')
                        .css('left', pos1.left - pos2.left - width / 2)
                        .css('top', (pos1.top - pos2.top) + width / 2)
                        .css('transform', `translate(50%,-50%) rotate(${finalDeg}deg)`);
                },
            });
    });
    $bomb.css('opacity', '0');
    return $bomb;
}
api.registerMessage({
    name,
    showBase,
    process,
    render,
});
