/*
Write a function doubleandSquareandSum which does three things:

Double and square each element and sum up all of these values.
Further restrictions: Use arrow function expressions and do it in 1 line of code.
let nums = [2, 4, 5];

// Result: 180
console.log(doubleandSquareandSum([2, 4, 5]));
*/

const doubleandSquareandSum = list => list.reduce((sum, num) => sum + (num * 2) * (num * 2), 0);

let list = [2, 4, 5];
console.log(doubleandSquareandSum(list)); 