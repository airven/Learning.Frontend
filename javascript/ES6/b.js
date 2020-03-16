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