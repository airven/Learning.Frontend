/*
 * public 对所有可见,默认是public修饰符
 * protected 类本 身及子类可访问, 不能被实例调用
 * private  对当前类可访问
 */
class Animal {
    constructor(names: string, age: number,food:string) {
        this.names = names;
        this.age = age;
    }
    public names: string = 'abc';
    public food: string = '';
    readonly age: number = 1;
    static size:string='small';
    protected eat() {
        console.log('eatting:') + this.food;
    }
    protected run() {
        console.log('animal  is :running');
    }
    showInfo(){
        console.log('animal age is '+this.age);
    }
}

class Dog extends Animal{
    constructor(names: string, age: number,food:string)
    {
        super(names,age,food)
    }
}
let dog=new Dog("black dog",10,"fish");
dog.showInfo();

class Cat extends Animal{
    constructor(names: string, age: number,food:string, move:string)
    {
        super(names,age,food)
        this.move=move;
    }
    move:string
    showInfo(){
        console.log(name+'moving'+this.move);
    }
}
let cat=new Cat("black cat",5,"fish",'dump dump');
cat.showInfo();

Cat.size="big"
console.log(Cat.size)

