interface List {
    readonly address:string //只读属生
    id: number;
    name: string;
    [x: string]: any;//签名
    age?: number ; //可选属性
}

interface Result {
    data: List[]
}

function render(result: Result) {
    result.data.forEach((value) => {
        console.log(value.id, value.name)
        if(value.age)
        console.log(value.age);
    });
}

let result = {
    data: [
        { id: 1, name: 'A', sex: 'male', address:'abc' },
        { id: 2, name: 'B',age:15, address:'abc' }
    ]
}
render(result)


//签名的方式
render(
    {
        data: [
            { id: 1, name: 'A', sex: 'male' , address:'abc'},
            { id: 2, name: 'B', address:'gdf' }
        ]
    }
)
//直接传对象的方式(as)
render(
    {
        data: [
            { id: 1, name: 'A', sex: 'male' },
            { id: 2, name: 'B' }
        ]
    } as Result
)

//强制类型转化
render(
    <Result>{
        data: [
            { id: 1, name: 'A', sex: 'male' },
            { id: 2, name: 'B' }
        ]
    }
)

//索引属生的定义
interface StringArray
{
    [x:number]:string
}
let name1:StringArray=["a","b","cc"]
console.log(name1)

interface Names {
    [x: number]: string;
    [y: string]: any
}

let name2: Names ={
    "name":"jack",
    "age":10
}

let name3:Names=["a","cc"]
console.log(name2,name3);


interface Lib{
    ():void;
    version:string;
    DoSomething():void
}


function getLib(){
    let lib:Lib=(()=>{
        console.log('hello');
    }) as Lib
    lib.version='1.1'
    lib.DoSomething=()=>{};
    return lib;
}

let lib1=getLib();
lib1.DoSomething()
console.log(lib1.version)
