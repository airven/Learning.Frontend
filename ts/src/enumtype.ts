enum Role
{
    Reporter=1,
    Developer,
    Maintainer,
    Owner,
    Guester
}
console.log(Role)
console.log(Role.Developer)

enum Message
{
    Success="hello,welcome!",
    Fail="oh, I'm sorry"
}
console.log(Message.Success)

//异构枚举
enum Answer
{
    N,
    Y='yes'
}
console.log(Answer.N)
console.log(Answer.Y)

//常量枚举
const enum Month
{
    Jan,
    Feb,
    Mar
}
let month:number[]=[
    Month.Jan, Month.Feb, Month.Mar
]
console.log(month)

//枚举成员
enum Char
{
    a,
    b=Char.a,
    c=Math.random(),
    d='abc'.length
}
console.log(Char.c)

let a1:Char=1
let a2:Char=Char.d
console.log(a2)
