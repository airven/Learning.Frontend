javascript中实现对象继承的几种方式
-------------------------------------------
[toc]


#### 采用原型链方式实现继承
> 示例如下,主要是利用prototype对象完成

``` javascript
function SuperType() {
    this.colors = ['red', 'blue', 'green']
}
SuperType.prototype.Action = function () {
    console.log(`(the color is ${this.colors})`);
}
function SuberType() {
}
SuberType.prototype = new SuperType();

SuberType.prototype.Show = function () {
    console.log("hello,welcome");
}
SuberType.prototype.Action = function () {
    console.log(`(the color is ${this.colors}abc)`);
}
var instance1 = new SuberType();
instance1.Action();

instance1.colors.push("black");
instance1.Action();

var instance2 = new SuberType();
instance2.Action();
var instance3 = new SuberType();
instance3.Show();
```
#### 采用构造函数的方式来实现继承
>借助apply()和call()方法来改变对象的执行上下文,使得每个对象有自己的独立属性
>call和apply的区别在于,call使用逗号隔开的参数表示,而apply则用的是数组

>示例如下,组合式继承是用的最多的一种继承方式
``` javascript
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green']
}
function SubType(name) {
    SuperType.call(this, name);
    //SuperType.apply(this, [name]);
}
var instance1 = new SubType("apple");
console.log(instance1.name + "_" + instance1.colors);

instance1.colors.push("black");
var instance2 = new SubType("pear");
console.log(instance2.name + "_" + instance2.colors);
```
#### 组合式继承(原型+构造函数)

``` javascript
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function () {
    console.log(this.name)
}
function SubType(name, job) {
    //继承属性
    SuperType.call(this, name)
    this.job = job
}
// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SuperType;
SubType.prototype.sayJob = function () {
    console.log(this.job)
}
var instance1 = new SubType('Jiang', 'student');
instance1.colors.push('black');
console.log(instance1.colors) //["red", "blue", "green", "black"]
instance1.sayName() // 'Jiang'
instance1.sayJob() // 'student'

var instance2 = new SubType('J', 'doctor');
console.log(instance2.colors) // //["red", "blue", "green"]
instance2.sayName() // 'J'
instance2.sayJob() // 'doctor'
```

#### 寄生式继承
> 即使用object.create方法在已有的对象上创建新对象
> 在面向对象一文当中讲述了采用object.create方式创建
``` javascript
function OldObject(name, age) {
    this.name = name;
    this.age = age;
}
var newObj = Object.create(OldObject.prototype);
newObj.name = "abc";
newObj.age = 12;
console.log(newObj);

var newObj1 = Object.create(OldObject.prototype, {
    bar: {
        get: function () { return 10 },
        set: function (value) {
            console.log("Setting `o.bar` to", value);
        }
    }, foo: {
        writable: true,
        configurable: true,
        value: "hello"
    },
});
newObj1.foo="hello,world";
console.log(newObj1.bar);   
console.log(newObj1.foo);
```

#### 寄生组合式继承
> 在上面的传统组合式继承中,每一次new 子实例时都会调用父类的构造方法,因此才用结合寄生式的create方法来创建副本,这样就可以解决问题
> 示例如下：
``` javascript
function Shape(x, y) {
    this.x = x;
    this.y = y;
}
Shape.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    console.info(`Shape moved.${this.x},${this.y}`);
}

function Rectangle(a, b) {
    Shape.call(this, a, b);
}

//Rectangle.prototype = Object.create(Shape.prototype);
//Rectangle.prototype.constructor = Rectangle;

//上面两行或者
//ES6新增了一个方法，Object.setPrototypeOf
Object.setPrototypeOf(Rectangle.prototype, Shape.prototype)

var model = new Rectangle(1, 2);
model.move(1, 3);

console.log(Rectangle.prototype.constructor === Rectangle) // true
console.log(model instanceof Rectangle); // true
console.log(model instanceof Shape); // true
```
> 上述方式可以封装成inheritPrototype方法
> 如下所示:
``` javascript     
function inheritPrototype(subType, superType) { 
    var prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}
function Shape(x, y) {
    this.x = x;
    this.y = y;
}
Shape.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    console.info(`Shape moved.${this.x},${this.y}`);
}

function Rectangle(a, b,c) {
    Shape.call(this, a, b);
    this.z=c;
}

//调用inheritPrototype方法完成继承
inheritPrototype(Rectangle, Shape);
Rectangle.prototype.move=function(x,y,z){
    this.x += x;
    this.y += y;
    this.z+=z;
    console.info(`Shape moved.${this.x},${this.y},${this.z}`);
}       
var rect=new Rectangle(1,3,4);
rect.move(1,2,3);       
```

#### 使用es6方式来实现继承
> es6全称为ECMAScript 6,它是javascript于2015年发布的第六个版本,es6的出现,让
前端开发人员也能向后端开发语言一样,使用更为面向对象的方式编写代码
> 示例如下
``` javascript
class Animal {
constructor(name, color) {
    this.name = name;
    this.color = color;
}
get GetName(){
    return this.name;
}
set SetName(name){
    this.name=name;
}
get GetColor(){
    return this.color;
}
set SetColor(color){
    this.color=color;
}
sleep() {
    console.log(this.name + ' 正在睡觉,颜色是' + this.color);
}
eat(food) {
    console.log(this.name + '正在吃' + food)
}
}

class Dog extends Animal {
    constructor(name, color,feature) {
        super(name,color);
        this.feature = feature;
    }
    eat(food) {
        console.log(this.name + '正在吃' + food + ' and feature is ' + this.feature + ')');
    }
}

var a=new Dog("a","b","c");
a.SetName="jack";
a.eat("fish");
```
> 关于es6部分,在下一篇javascript模块化开发中讲述
##### 文件资料
>全面理解面向对象的 JavaScript

https://www.ibm.com/developerworks/cn/web/1304_zengyz_jsoo/index.html
>JavaScript六种继承方式详解

http://caibaojian.com/6-javascript-prototype.html

> Classical Inheritance in JavaScript

http://www.crockford.com/javascript/inheritance.html

>《JavaScript模式》设计模式

http://caibaojian.com/javascript-patterns-chapter7.html