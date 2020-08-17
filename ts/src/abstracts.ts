abstract class Animals
{
    eat(){
        console.log('eat')
    }
    abstract sleep():void
}

class Dogs extends Animals{
    constructor(name:string){
        super();
        this.name=name;
    }
    name:string
    run(){
        console.log('dog is running');
    }
    sleep(){
        console.log('dog is sleep');
    }
}

var dogs=new Dogs('jack');
dogs.sleep();
dogs.run();


//多态
class Cats extends Animals{
sleep(){
    console.log('cat sleep');
}
}

let cats=new Cats();
let animnals:Animals[]=[dogs,cats]
animnals.forEach(i=>{
    i.sleep();
})


//链式调用
class WorkFlow{
    step1(){
        console.log("step 1");
        return this;
    }
    step2(){
        console.log("step 2");
        return this;
    }
}

class MyWorkFlow extends WorkFlow{
    next(){
        console.log("next")
        return this;
    }
}

let workflow =new WorkFlow();
workflow.step1().step2();

let myWorkFlow=new MyWorkFlow();
myWorkFlow.next().step1().step2();