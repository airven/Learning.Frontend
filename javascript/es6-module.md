javascript模块化开发实践(es6)

#### 前置条件
* 选用visual studio code作为代码编辑器,因为vscode中能集成很多开发工具,像git,命令行工具,debuger等可以直接
在一个界面完成

* 当然vscode中进行javascript开发,需要一些开发插件,这样能方便调试和语法问题的检查

  ![avatar](https://note.youdao.com/yws/public/resource/ce63e85ba73ac659a5b2eb3d91fd5943/xmlnote/WEBRESOURCE29a0c2c407d7a1dd20fe42bfe9ed09ae/6880)

* 使用webpack工具进行前端的工程化管理

#### 项目创建
> 新建三个js文件以及一个初始化html文件进行引导

a.js,b.js,c.js,index.html

> 目录如下所示

![avatar](https://note.youdao.com/yws/public/resource/ce63e85ba73ac659a5b2eb3d91fd5943/xmlnote/WEBRESOURCE3db69163c8ae08c0d73e1ff1d62d2598/6882)

>a.js 内容
``` javascript
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
```

>b.js 内容
``` javascript
class Animal {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
    get GetName() {
        return this.name;
    }
    set SetName(name) {
        this.name = name;
    }
    get GetColor() {
        return this.color;
    }
    set SetColor(color) {
        this.color = color;
    }
    sleep() {
        console.log(this.name + ' 正在睡觉,颜色是' + this.color);
    }
    eat(food) {
        console.log(this.name + '正在吃' + food)
    }
}
export class Dog extends Animal {
    constructor(name, color, feature) {
        super(name, color);
        this.feature = feature;
    }
    eat(food) {
        console.log(this.name + '正在吃' + food + ' and feature is ' + this.feature);
    }
}
```

>c.js内容
c.js 中引入了a.js和b.js的方法
``` javascript
import { square, diag } from './a.js'
import { Dog } from './b.js'

console.log(square(11)); // 121
console.log(diag(4, 3)); // 5

var dog = new Dog("jack", "green", "large");
console.log(dog.eat("grass"));
```

> 编译javascript

因为es6中模块的导出与导入语法在浏览器中不受支持，因此需要需要编译成能支持的版本,这里我们编译成es5,这样就可以了
编译方面babel进行处理,将es6编译成es5, 通过webpack进行整个项目的编译与调试管理

使用npm工具下载前端需要的工具包,npm本身不需要下载,在下载nodejs的时候自动包含了

> package.json 文件如下:
``` json
{
  "name": "javascript",
  "version": "1.0.0",
  "description": "",
  "main": "jquery插件开发.js",
  "scripts": {
    "start": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-plugin-transform-runtime": "^6.23.0",
    "jquery": "^3.4.1"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-preset-es2015": "^6.24.1",
    "webpack": "^4.42.0",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3"
  }
}
```

> webpack.config.js

``` javascript
var webpack = require("webpack")
var path = require('path')
module.exports = {
    devtool:'eval-source-map',
    entry: __dirname + '/ES6/c.js',
    output: {
        path: __dirname + '/ES6',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query:
                {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    },
    devServer:{
        contentBase:"./public",
        colors:true,
        historyapiFallback:true,
        inline:true
    }
}
```

>以下是调试画面

当然之所以编译后还能调试，这要得益于webpack的插件webpack-dev-server
中的eval-source-map，它能映射到源文件进行debuger
![avatar](https://note.youdao.com/yws/public/resource/ce63e85ba73ac659a5b2eb3d91fd5943/xmlnote/WEBRESOURCE048b56a3f02b5bfb114a409a4c69eac4/6873)



