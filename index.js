/**
 * 这是一个在移动端的原生高性能Rotate组件
 * @authors jonnyf
 * @date    2016-07-08
 * @version 1.0
 */

module.exports = (eleNode) => {
    var ele     = eleNode,
        supportedCSS,
        styles  = document.querySelector("head").style,
        toCheck = "transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
    supportedCSS = toCheck.filter((item)=> {
        return styles[item] !== undefined;
    }).join('');

    ele.style.opacity = 1;
    ele.style.backfaceVisibility = 'hidden';

    function _rotate(startAngle, animateTo, overTime, callback) {
        var _endAngle = startAngle || 0,
            timeTag   = Date.now(),
            stop      = null;

        function runAnim() {
            _endAngle++;
            if (parseInt(Date.now() - timeTag) >= overTime || (_endAngle >= animateTo)) {
                window.cancelAnimationFrame(stop);
                callback();
                return null;
            }
            var _angle = _easing(Date.now() - timeTag, startAngle, animateTo - startAngle, overTime) + startAngle;
            _animate((~~(_angle * 10)) / 10);
            stop = window.requestAnimationFrame(runAnim);
        }

        stop = window.requestAnimationFrame(runAnim);
    }

    // 真正实际操作 DOM 运动的函数
    function _animate(angle) {
        return ele.style[supportedCSS] = "rotateZ(" + (angle % 360) + "deg)";
    }

    // 变速运动的曲线
    function _easing(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }

    return {
        rotate: function (opt) {
            var angle = 0, animateTo, duration = 1000, callback = function () {
            };
            if (typeof opt == "undefined") {
                return null;
            } else if (typeof opt == "number") {
                animateTo = opt;
            } else {
                angle = opt['angle'];
                animateTo = opt['animateTo'];
                duration = opt['duration'];
                callback = opt['callback'];
            }
            _rotate(angle, animateTo, duration, callback);
        },
        getRotateAngle: function () {
            return ele.style[supportedCSS].replace(/[^0-9\.]+/g, '');
        }
    }
};
