//原始类型
let bool:boolean=true
let num:number=1
let str:string="hello"

console.log(bool);
console.log(num);
console.log(str);

//数组
let arr1:number[]=[1,2,3]
let arr2:Array<number>=[2,3,4,4,5]
let arr3:Array<number | string>=[1,4,5,"hello"]
arr3.push(7);
console.log(arr1);
console.log(arr2);
console.log(arr3);

//元组
let tuple:[number,string]=[1,"test"]
console.log(tuple[0]);


//函数
let func=(x:number,y:number)=> x+y;
console.log(func(2,3));
//定义一个函数类型
let compute:(x:number,y:number)=>number
compute=(a,b)=>a+b;
console.log(compute(1,2));

//对象
let obj: { x: number, y: string } = { x: 1, y: "test" }
console.log(obj.y);


let s1:symbol=Symbol()
let s2=Symbol();
console.log(s1===s2);

//undefined ,null
let un:undefined=undefined
let nu:null=null

//定义联合类型
let num1:number | undefined| null
num1=undefined
num1=null
num1=3
console.log(num1)

//any
let a
a=1
console.log(a)
a="jfkdj"
console.log(a)

//void
let b=()=>{}


//never
let error=()=>{
    throw new Error('error')
}

let endless=()=>{
    while(true){

    }
}




