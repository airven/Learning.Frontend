#### 使用jquery开发插件
* 通过$.extend()来扩展jQuery
* 通过$.fn 向jQuery添加新的方法

>示例
```javascript
(function ($) {
    $.fn.accordion = function (options) {
        /* var defaults={
            "open":false
        }; */
        var settings = $.extend({}, { open: false }, options);
        return this.each(function () {
            var dts = $(this).children('dt');
            dts.click(onClick);
            dts.each(reset);
            if (settings.open) $(this).children('dt:first-child').next().show();
        });

        function onClick() {
            $(this).siblings('dt').each(hide);
            $(this).next().slideDown('fast');
            return false;
        }

        function hide() {
            $(this).next().slideUp('fast');
        }

        function reset() {
            $(this).next().hide();
        }
    }
})(jQuery);

$(document).ready(function () {
    $('dl#my-accordion').accordion({ open: true });
    $('dl#my-accordion2').accordion({ open: false });
});
```

> 若是简单向jquery类库本身添加方法,则可以用extend来实现
``` javascript
$.extend({
    "Print": function () {
        console.log("hello,welcome");
    },
    Log: function () {
        console.log("jquery logging..");
    }
});

$.Print();
$.Log();
```

> jquery.extend方法可以接受多个参数
例如:$.extend({}, { open: false }, options)
这种的结果就是合并defaults参数和options参数,并传递给空对象{}
而$.extend{{ open: false }, options} 这种就是直接合并,相比较而言就没有默认参数的说法或者默认参数被篡改
因为defaults被覆盖了

``` javascript
var defaults = { open: false };
var a = $.extend(defaults, { open: true, color: "red" })
var b = $.extend({}, defaults, { open: false, color: "blue" })

console.log(a);//{open: true, color: "red"}
console.log(defaults);//{open: true, color: "red"}

console.log(b);//{open: false, color: "blue"}
console.log(defaults);//{open: true, color: "red"}
```