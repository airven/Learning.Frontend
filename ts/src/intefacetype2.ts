interface Tool{
    name:string;
    run():void;
    show(name:string):string
}

interface RoadTool{
    waring(str:string):string
}

interface waterTool extends Tool{
    feature:string;
    action(info:string):void
}
class bus implements Tool,RoadTool{
    name:string;
    constructor(name:string,public str:string,public msg:string){
        this.name=name;
        this.str=str;
        this.msg=msg;
    }
    run(){
        console.log(this.str);
    }
    show(a:string){
        return a;
    }
    waring(b:string){
        return b;
    }
}

let traffictool=new bus("jing long","jj","fjkjfkdjf");
traffictool.run();
console.log(traffictool.show("this is bus"));
console.log(traffictool.waring("hello,bus"));



class ship implements waterTool{
    constructor(public feature:string,public name:string){
        this.feature=feature;
        this.name=name;
    }
    action(info: string): void {
        console.log("ship ruuning on the warter"+info);
    }
    run(): void {
        throw new Error("Method not implemented.");
    }
    show(name: string): string {
        throw new Error("Method not implemented.");
    }

}
let boat=new ship("on water","boat");
boat.action(' xiaoxiao ');