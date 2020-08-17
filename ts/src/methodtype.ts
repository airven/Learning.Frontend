//方法类型的定义
//1
interface IMethod1{
  (a:number,b:number):number
}
//2
let IMethod2:(a:number,b:number)=>number
//3
type IMethod3=(a:number,b:number)=>number

let method:IMethod1=function(a,b){return a+b};
console.log(method(1,2))

IMethod2=(a,b)=>a+b;
console.log(IMethod2(1,2))

let method2:IMethod3=(a,b)=>a+b;
console.log(method2(1,2))

//方法中可选参数
function Add1(a:number, b:number, c?:number){
    return c?a+b+c:a+b;
}
console.log(Add1(1,2,3))

//方法中参数的默认值
function Add2(a:number, b=2, c:number, d=0){
    return a+b+c+d
} 
console.log(Add2(1,undefined,3))

//方法中的剩余参数
function Add3(a:number,...b:number[]){
return a+b.reduce((x,y)=>x+y);
}
console.log(Add3(1,2,4,5,5))


//方法的重载
function Add4(...a: number[]): number;
function Add4(...a: string[]): string;
function Add4(...a: any[]): any {
    let param = a[0]
    if (typeof param === 'string') {
        return a.join('~');
    }
    if (typeof param === 'number') {
        return a.reduce((a, b) => a + b)
    }
}
console.log(Add4(1,2,4,5,6,7))
console.log(Add4("a","b","c","d"))
