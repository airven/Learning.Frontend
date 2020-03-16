
#### v1 基本架构
> 由于我们几乎将所有内容都包装在匿名函数中，因此，如果我们的代码失败，则不会损坏所有外部javascript
``` javascript
(function (window) {
    'use strict';
    function myLibrary() {
        var _myLibraryObject = {};
        return _myLibraryObject;
    }
    // 我们需要类库能全局访问,因此把对象放到window对象中
    if (typeof (window.myWindowGlobalLibraryName) === 'undefined') {
        window.myWindowGlobalLibraryName = myLibrary();
    }
})(window)

console.log(myWindowGlobalLibraryName._myLibraryObject);
``` 

#### v2 添加方法
 ``` javascript
(function (window) {
    'use strict';
    function myLibrary() {
        var _myLibraryObject = {};
        _myLibraryObject.myCustomLog = function (thingToLog) {
            console.log("My-Custom-Log > Type of variable : " + typeof (thingToLog));
            console.log("My-Custom-Log > Is number : " + !isNaN(thingToLog));
            console.log("My-Custom-Log > Length : " + (thingToLog).length);

            return console.log(thingToLog);
        };
        return _myLibraryObject;
    }
    if (typeof (window.myWindowGlobalLibraryName) === 'undefined') {
        window.myWindowGlobalLibraryName = myLibrary();
    }
})(window)

console.log(myWindowGlobalLibraryName.myCustomLog(["a","b"]));
```

#### v3 封装字段
``` javascript
(function (window) {
    'use strict';
    function myLibrary() {
        var _myLibraryObject = {};

        var settings = {
            volume: 100,
            mute: false
        };

        // 改变私有字段的值
        _myLibraryObject.setVolume = function (volume) {
            settings.volume = volume;
            return volume;
        };

        //  改变私有字段的值
        _myLibraryObject.setMute = function (muteStatus) {
            if (typeof (muteStatus) === 'boolean') {
                settings.mute = muteStatus;
            } else {
                console.error("You need to disable or enable the sound !");
            }

            return settings.mute;
        };

        // 获取私有字段，相当get访问器
        _myLibraryObject.haveSound = function () {
            return settings.mute;
        };

        //获取所有字段
        _myLibraryObject.getSettings = function(){
        var mySecurityCopy = {};

        for(var i in settings){
            if(i){
                mySecurityCopy[i] = settings[i];
            }      
        }

        return mySecurityCopy;
        };
        
        return _myLibraryObject;
    }
    // 将库加入到window中，这样将能全局访问到
    if (typeof (window.myWindowGlobalLibraryName) === 'undefined') {
        window.myWindowGlobalLibraryName = myLibrary();
    }
})(window)

myWindowGlobalLibraryName.setMute(true);
console.log(myWindowGlobalLibraryName.haveSound());
console.log(myWindowGlobalLibraryName.getSettings());
```