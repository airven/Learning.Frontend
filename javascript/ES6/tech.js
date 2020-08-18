/**
 * JavaScript技巧
 * set()
 * console.time(),console.timelog
 * flat()
 * filter()
 * map()
 * reduce()
 */

const hero = {
    name: 'Spiderman',
    firstName: 'Peter',
    lastName: 'Parker',
    city: 'New York City'
};
console.log(hero);


console.time('factorial');
const number = 10;
let result = 1;
for (let i = 1; i <= number; i++) {
    result *= i;
    console.timeLog('factorial');
}

console.log('factorial result', result);
console.timeEnd('factorial');


const heroes = [
    {
        name: 'Spiderman',
        firstName: 'Peter',
        lastName: 'Parker',
        city: 'New York City'
    }, {
        name: 'Iron Man',
        firstName: 'Tony',
        lastName: 'Stark',
        city: 'New York City'
    }];

console.table(heroes);


//提取唯一值
const names = ['Tony', 'Peter', 'Bruce', 'Bruce', 'Peter', 'Peter'];
var unique_names = [...new Set(names)];
console.log(unique_names);

var entries = [1, 1, 2, 3, 3, 4, 5, 6, 6, 7, 7, 8, 9, 9, 9, 10];
var unique_entries = [...new Set(entries)];
console.log(unique_entries);



//向对象添加属性并追加数组
let batman = { name: 'Batman' };
console.log(batman);
batman = [...batman,{firstName: 'Bruce', lastName: 'Wayne'}];
console.log(batman);


//追加数组
let superHeroes = ['Spiderman', 'Iron Man'];
console.log(superHeroes);
superHeroes = [...superHeroes, 'Batman'];
console.log(superHeroes);


//展平多维数组
let heroes1 = [
    ['Superman', 'Batman', 'Wonderwoman'],
    ['Spiderman', 'Iron Man', 'Hulk']
]
console.log(heroes1.flat());

let heroes2 = [
    ['Superman', 'Batman', 'Wonderwoman'],
    [
        ['Spiderman', 'Amazing Spiderman'],
        'Iron Man', 'Hulk'
    ]
]
console.log(heroes.flat());
console.log(heroes2.flat(Infinity));


//模板文字
const hero1 = { name: 'Batman' };
console.log("I'm " + hero1.name + "!");
console.log(`I'm ${hero1.name}!`);

//filter
const myArray = [
    { name: 'Spiderman', universe: 'Marvel' },
    { name: 'Iron Man', universe: 'Marvel' },
    { name: 'Hulk', universe: 'Marvel' },
    { name: 'Batman', universe: 'DC' },
    { name: 'Superman', universe: 'DC' },
    { name: 'Wonder Woman', universe: 'DC' },
]
let filterResult=myArray.filter(a=>a.name==='Hulk');
console.log(filterResult);

//map
let mapResult=myArray.map(x=>x.address='BeiJing')
console.log(myArray);

//reduce
let dataArray=[2,3,4,5,6,7]
let reduceResult=dataArray.reduce((a,b)=>a*b);
console.log(reduceResult);

let a=dataArray.map(x=>x*x);
console.log(a);



