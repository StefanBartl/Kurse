/*
Create a file util.js and do the following:

For this exercise, you should create two new functions:

A double function that takes a single value and returns the doubled value (e.g., returns 6 for input 3)

A transform function that takes two inputs:

A number as a first argument
Another function (!) as the second argument
Inside of the implementation of transform, the goal is to call that 
received function and pass the number argument into it. The result produced by calling that 
received function (b) with the received number (a) inside of transform should then be returned 
by transform.

In fact, transform should be callable like this:
 transform(10, double);
And this should return 20 as a value (because double should be executed inside of transform and receive 10 as input)
*/

function double (value) {
  return value * 2;
}

function transform(num, fn) {
   return fn(num);
}

console.log(transform(10, double));
console.log(transform(10, (x) => x * 2));