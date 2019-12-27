使用面向对象的方式来编写javascript代码
-----------------------------------------------------------------
[toc]

#### javascript介绍
在写之前，我想稍微介绍下javascript,因为后面会讲到一些术语,比如es5,es6等等一些标准
众所周知，javascript是一门弱类型的语言，准确的说是客户端脚本, 在早期阶段, 大的互联网公司都会开发自己的浏览器, 像网景公司，微软, 还的后来的谷歌公司，大家都有自己的产品，每次更新迭代都会出现新的html标记，典型的例子就是html5, 时至今日也不是所有浏览器都支持所有的标签，因此在这种局面下javascript不能像后端语言那样成为一种唯一的标准，只能说哪个浏览器的市场份额大，就依哪个为标准，直到每个浏览器都向w3c组织提交了变化之后，才会说某个版本都达到兼容，比如现在的firefox，chrome,opera 这些主流浏览器对新的特性支持还比较好

javascript 虽然看上去有java的影子，但实际上一点关系也没有，它是由ECMAScript核心语法+dom文档模型+bom浏览器对象模型构型，我们后面谈的es5，es6指的是ECMAScript 第五个版本、第六个版本，关于javascript的介绍就这么多，更多的话就参考官方文档
https://developer.mozilla.org/zh-CN/docs/Web

####  传统的写法
今天讲的主题就是用面向对象的方式来编写Javascript代码，这些代码只是作为入门的基础，并不代表最新javascript进展，即便如此，在新版本下这些代码仍然能够得到运行,因为新版本做了兼容,传统的编写javascript方式如下
``` javasscript
function add(){
    ....
    ...
}
function remove(){
    ...
}
function ...
function ...
```

#### 采用构造函数来创建对象
``` javascript
 var obj1 = new Object();
        obj1.name = "福特汽车";
        obj1.color = "green";
        obj1.action = function () {
            console.log(`the car ${this.name} is running,color is ${this.color}`);
        }
        obj1.action();
```

#### 采用object.create方法来创建对象
``` javascript
  var obj2 = Object.create({});
        //or Object.create(Object.prototype);
        //or Object.create({});
        obj2.name = "大众汽车";
        obj2.color = "white";
        obj2.action = function () {
            console.log(`the car ${this.name} is running,color is ${this.color}`);
        }
        obj2.action();
```
> 注意，使用Object.create方法来创建对象需要写上参数，否则程序将会报错:
>  Uncaught TypeError: Object prototype may only be an Object or null: 
> undefined at Function.create (<anonymous>)
> 除此之外，你还可以使用Object.create(Object.prototype) 或者 Object.create({}) 来创建都可以，你甚至可以写成Object.create(null), 但是不建议这么做，因为如果你要实施继承的策略，那么你会遇到麻烦，因为null对象不能作为继承的基类


#### 采用字典变量来创建对象
``` javascript
var obj3 = {
            "name": "雪佛兰",
            "color": "red",
            "action": function () {
                console.log(`the car ${this.name} is running,color is ${this.color}`);
            }
        };
        obj3.action();
```

#### 采用自定义函数来创建对象
``` javascript
  function obj4(name, color) {
            this.name = name;
            this.color = color;
            this.action = function () {
                console.log(`the car ${this.name} is running,color is ${this.color}`);
            }
        }
        var newobj = new obj4("起亚K5", "green");
        newobj.action();
```

#### 采用自函数的原型来创建对象
> 思考一下，如果对一个已有的对象添加新方法，或者覆盖某个方法，这个时候就要去动原来的代码
> 这种时候就会存在风险，因为已有的方法可能被别的地方引用了,如果修改不到位就会引发bug,所以这个时候原型
> 化对象就会带来便捷,还是在自定义构造函数基础上来写一个原型对象
``` javascript
 function obj5(name, color) {
            this.name = name;
            this.color = color;
        }
        obj5.prototype.action = function () {
            console.log(`the car ${this.name} is running,color is ${this.color}`);
        }
        var newobj5 = new obj5("东风雪铁龙", "blue");
        newobj5.action();
        //重写action，因为我不想动原来的代码
        obj5.prototype.action = function () {
            console.log(`the car ${this.name} is running,color is ${this.color}`);
            console.log("I like this car");
        }
        var newobj6 = new obj5("北京现代", "black");
        newobj6.action();
```


#### 采用函数表达式的方式创建对象
``` javascript
 var obj6 = function () {
            console.log("hello,welcome!");
        }
        obj6();
```

> 这种写法又称之为匿名写法
> 注意函数表达式的定义其实是变量，因此函数的调用是不用适先调用的, 必须先声明，后调用
>当前这种函数表达式也是较传统的写法，在ECMA Script 6版本上出现了箭头函数
>```  javascript
>  var test1 = (a, b) => { console.log(a + b); }
>  test1(5, 6);
>  var test2 = () => { console.log("我爱我的祖国"); }
>  test2();
>  var test3 = a => { console.log(`${a}`); }
>  test3("welcome to china");
> ```

####  基于es6标准来创建对象以及成员方法
> 基于es6的标准,也让后端开发人员看到一丝希望,那就是在前端看到类式写法的影子,
>以下示例模拟了类，属性，方法这些成员信息, 看上去已经和面向对象的语言很相似了
``` javascript
 class Animal {
            constructor(name, color) {
                this.name = name;
                this.color = color;
            }
            get animalName(){
                return this.name;
            }
            get animalColor(){
                return this.color;
            }
            set  nameAttribute(name){
                this.name=name;
            }
            set  colorAttribute(color){
                this.color=color;
            }
            sleep() {
                console.log(this.name + ' 正在睡觉,颜色是' + this.color);
            }
            eat(food) {
                console.log(this.name + '正在吃' + food)
            }
        }
        let cat = new Animal("tom", "gray");
        cat.sleep();
        cat.eat("bread");

        cat.nameAttribute="jack";
        cat.colorAttribute="black";
        cat.sleep();

```

#### 面向对象过程中闭包的使用
> 所谓闭包的意思就是仅提供自身对象使用，不对外提供方法的访问, 请看以下示示例
``` javascript
function User(pwd) {
            // 定义私有属性
            var password = pwd;
            // 定义私有方法
            function getPassword() {
                // 返回了闭包中的 password 
                return password;
            }
            //特权函数声明，用于该对象其他公有方法能通过该特权方法访问到私有成员
            this.passwordService = function () {
                return getPassword();
            }
        }
        // 公有成员声明 
        User.prototype.checkPassword = function (pwd) {
            return this.passwordService() ===
                pwd;
        };
        // 验证隐藏性 
        var u = new User("123456");
        // 打印 true
        console.log(u.checkPassword(
            "123456"));
        // 打印 undefined 
        console.log(u.password);
        // 打印 true 
        console.log(typeof u.getPassword === "undefined");
```
> 这是在自定义构造函数中的写法，如果在匿名对象中呢，如何使用闭包来达到私有成员的目的
> 示例如下：
``` javascript
 var calculator = (function () {
            // 这里形成一个单独的私有的空间
            // 私有成员的作用：
            // 1、将一个成员私有化
            // 2、抽象公共方法（其他成员中会用到的）
            // 私有的转换逻辑
            function convert(input) {
                return parseInt(input);
            }
            function add(a, b) {
                return convert(a) + convert(b);
            }
            function subtract(a, b) { }
            function multiply(a, b) { }
            function divide(a, b) { }
            return {
                add: add,
                subtract: subtract,
                multiply: multiply,
                divide: divide
            }
        })();
        calculator.print = function () {
            console.log("jkfdjfkjdfkjd");
        }
        calculator.print();
```

#### 总结
尽管编写javascript的方式有很多种, 但是需要理解各种写法的意义，在大型应用开发过程中显得极其重要，通常都是混合的去编写，例如插件的开发，复杂的DOM交互，基于DOM事件的侦听等，当然后续一些实际的例子上会得到一些体现，敬请期待