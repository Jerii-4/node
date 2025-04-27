//console.log(arguments);
//console.log(require('module').wrapper);
const N = require('./test1');
const calc1 = new N();
console.log(calc1.add(5, 7));

//esports
const { add, multiply, divide } = require('./test2');
console.log(multiply(8, 9), divide(8, 8), add(8, 9));
//caching
require('./test3')();
require('./test3')();
require('./test3')();
require('./test3')();
