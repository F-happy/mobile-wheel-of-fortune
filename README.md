# mobile-rotate
[![npm](https://img.shields.io/npm/v/mobile-rotate.svg?style=flat)](https://www.npmjs.com/package/mobile-rotate)
[![npm](https://img.shields.io/npm/l/mobile-rotate.svg?style=flat)](https://www.npmjs.com/package/mobile-rotate)
> 这是一个由原生 js 编写的移动端高性能转盘插件, 在移动端上面使用了requestAnimationFrame 请求动画帧来进行逻辑的实现。

### 安装：
```
npm install --save-dev mobile-rotate
```

### 开始使用：
```javascript
import rotate from 'mobile-rotate';

let warp = document.querySelector('.rotate-warp');

rotate(warp).rotate({
    angle: 0,				// 开始旋转的原点
    animateTo: 3000,	// 转动的角度
    duration: 3000,		// 转动的时间
    callback: ()=>{		// 旋转结束后的回调函数
        // 活动旋转结束后的角度
        console.log(rotate(bg).getRotateAngle())
    }
});

```

## API

### rotate([opt])

* opt

Type：object

这是组件的配置信息，用来设置组件的初始化信息，参数的内容参考上面的 demo。

### getRotateAngle()

* return string

Type：function

返回当前组件包裹的元素的旋转角度。


## 兼容性：
这个组件是用在移动端上面的，所以不兼容 IE 浏览器，
并且由于使用了 requestAnimationFrame 因此请在使用前确保代码中有对请求动画帧做适配，如果没有的话请参考下面的代码。

```javascript
(function (window) {
    var lastTime = 0;
    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            var currTime   = new Date().getTime(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                id         = setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
})(window);
```
