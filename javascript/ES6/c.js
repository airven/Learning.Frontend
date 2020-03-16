import { square, diag } from './a.js'
import { Dog } from './b.js'

console.log(square(11)); // 121
console.log(diag(4, 3)); // 5

var dog = new Dog("jack", "green", "large");
console.log(dog.eat("grass"));