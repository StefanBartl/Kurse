# Course Exercises

- [Course Exercises](#course-exercises)
  - [Higher-Order Functions](#higher-order-functions)
    - [Challenge 1](#challenge-1)
    - [Challenge 2](#challenge-2)
    - [Challenge 3](#challenge-3)
    - [Challenge 4](#challenge-4)
    - [Challenge 5](#challenge-5)
    - [Challenge 6](#challenge-6)
    - [Challenge 7](#challenge-7)
    - [Challenge 8](#challenge-8)
    - [Challenge 9](#challenge-9)
    - [Challenge 10](#challenge-10)
    - [Challenge 11](#challenge-11)
    - [Challenge 12](#challenge-12)
    - [Challenge 13](#challenge-13)
    - [Challenge 14](#challenge-14)
    - [Challenge 15](#challenge-15)
  - [Closure](#closure)
    - [Challenge 1b](#challenge-1b)
    - [Challenge 2b](#challenge-2b)
    - [Challenge 3b](#challenge-3b)
    - [Challenge 4b](#challenge-4b)
    - [Challenge 5b](#challenge-5b)
    - [Challenge 6b](#challenge-6b)
    - [Challenge 7b](#challenge-7b)
    - [Challenge 8b](#challenge-8b)
    - [Challenge 9b](#challenge-9b)
    - [Challenge 10b](#challenge-10b)
    - [Challenge 11b](#challenge-11b)
    - [Challenge 12b](#challenge-12b)
  - [Extension Challenges](#extension-challenges)
    - [Challenge 1c](#challenge-1c)
    - [Challenge 2c](#challenge-2c)
    - [Challenge 3c](#challenge-3c)
    - [Challenge 4c](#challenge-4c)
    - [Challenge 5c](#challenge-5c)
    - [Challenge 6c](#challenge-6c)

## Higher-Order Functions

### Challenge 1

Create a function addTwo that accepts one input and adds 2 to it.

### Challenge 2

Create a function addS that accepts one input and adds an "s" to it.

### Challenge 3

Create a function called map that takes two inputs:
an array of numbers (a list of numbers)
a 'callback' function - a function that is applied to each element of the array (inside of the function 'map')
Have map return a new array filled with numbers that are the result of using the 'callback' function on each element of the input array.
map([1,2,3,4,5], multiplyByTwo); //-> [2,4,6,8,10]
multiplyByTwo(1); //-> 2
multiplyByTwo(2); //-> 4

### Challenge 4

The function forEach takes an array and a callback, and runs the callback on each element of the array. forEach does not return anything.
let alphabet = '';
const letters = ['a', 'b', 'c', 'd'];
forEach(letters, char => alphabet += char);

console.log(alphabet);   //prints 'abcd'

### Challenge 5

For this ### challenge, you're going to rebuild map as mapWith. This time you're going to use forEach inside of mapWith i

nstead of using a for loop.

### Challenge 6

The function reduce takes an array and reduces the elements to a single value. For example it can sum all the numbers, multiply them, or any operation that you can put into a function.
const nums = [4, 1, 3];
const add = (a, b) => a + b; 
reduce(nums, add, 0);   //-> 8
Here's how it works. The function has an "accumulator value" which starts as the initialValue and accumulates the output of each loop. The array is iterated over, passing the accumulator and the next array element as arguments to the callback. The callback's return value becomes the new accumulator value. The next loop executes with this new accumulator value. In the example above, the accumulator begins at 0. add(0,4) is called. The accumulator's value is now 4. Then add(4, 1) to make it 5. Finally add(5, 3) brings it to 8, which 
is returned.

### Challenge 7

Construct a function intersection that compares input arrays and returns a new array with elements found in 
all of the inputs. BONUS: Use reduce!

### Challenge 8

Construct a function union that compares input arrays and returns a new array that contains all elements. If there are duplicate elements, only add it once to the new array. Preserve the order of the elements starting 
from the first element of the first input array. BONUS: Use reduce!

### Challenge 9

Construct a function objOfMatches that accepts two arrays and a callback. objOfMatches will build an object and return it. To build the object, objOfMatches will test each element of the first array using the callback to see if the output matches the corresponding element (by index) of the second array. If there is a match, the element from the first array becomes a key in an object, and the element from the second array becomes the 
corresponding value.

### Challenge 10

Construct a function multiMap that will accept two arrays: an array of values and an array of callbacks. multiMap will return an object whose keys match the elements in the array of values. The corresponding values that are assigned to the keys will be arrays consisting of outputs from the array of callbacks, where the 
input to each callback is the key.

### Challenge 11

Create a function commutative that accepts two callbacks and a value. commutative will return a boolean indicating if the passing the value into the first function, and then passing the resulting output into the second function, yields the same output as the same operation with the order of the functions reversed 
(passing the value into the second function, and then passing the output into the first function).

### Challenge 12

Create a function objFilter that accepts an object and a callback. objFilter should make a new object, and then iterate through the passed-in object, using each key as input for the callback. If the output from the callback is equal to the corresponding value, then that key-value pair is copied into the new object. 
objFilter will return this new object.

### Challenge 13

Create a function rating that accepts an array (of functions) and a value. All the functions in the array will return true or false. rating should return the percentage of functions from the array that return true when 
the value is used as input.

### Challenge 14

Create a function pipe that accepts an array (of functions) and a value. pipe should input the value into the first function in the array, and then use the output from that function as input for the second function, and then use the output from that function as input for the third function, and so forth, until we have an output 
from the last function in the array. pipe should return the final output.

### Challenge 15

Create a function highestFunc that accepts an object (which will contain functions) and a subject (which is any value). highestFunc should return the key of the object whose associated value (which will be a function) returns the largest number, when the subject is given as input.

## Closure

### Challenge 1b

Create a function createFunction that creates and returns a function. When that created function is called, it should print "hello".
const function1 = createFunction();
// now we'll call the function we just created
function1(); //should console.log('hello');
  
When you think you completed createFunction, un-comment out those lines in the code and run it to see if it 
works.

### Challenge 2b

Create a function createFunctionPrinter that accepts one input and returns a function. When that created function is called, it should print out the input that was used when the function was created.
const printSample = createFunctionPrinter('sample');
const printHello = createFunctionPrinter('hello')
// now we'll call the functions we just created
printSample(); //should console.log('sample');

printHello(); //should console.log('hello');

### Challenge 3b

Examine the code for the outer function. Notice that we are returning a function and that function is using variables that are outside of its scope.

Uncomment those lines of code. Try to deduce the output before executing.

### Challenge 4b

Now we are going to create a function addByX that returns a function that will add an input by x.
const addByTwo = addByX(2);
addByTwo(1); //should return 3
addByTwo(2); //should return 4
addByTwo(3); //should return 5

const addByThree = addByX(3);
addByThree(1); //should return 4
addByThree(2); //should return 5

const addByFour = addByX(4);
addByFour(4); //should return 8

addByFour(10); //should return 14

### Challenge 5b

Write a function once that accepts a callback as input and returns a function. When the returned function is called the first time, it should call the callback and return that output. If it is called any additional times, instead of calling the callback again it will simply return the output value from the first time it was 
called.

### Challenge 6b

Write a function after that takes the number of times the callback needs to be called before being executed as 
the first parameter and the callback as the second parameter.

### Challenge 7b

Write a function delay that accepts a callback as the first parameter and the wait in milliseconds before allowing the callback to be invoked as the second parameter. Any additional arguments after wait are provided 
to func when it is invoked. HINT: research setTimeout();

### Challenge 8b

Create a function russianRoulette that accepts a number (let us call it n), and returns a function. The returned function will take no arguments, and will return the string 'click' the first n - 1 number of times it is invoked. On the very next invocation (the nth invocation), the returned function will return the string 
'bang'. On every invocation after that, the returned function returns the string 'reload to play again'.

### Challenge 9b

Create a function average that accepts no arguments, and returns a function (that will accept either a number as its lone argument, or no arguments at all). When the returned function is invoked with a number, the output should be average of all the numbers have ever been passed into that function (duplicate numbers count just like any other number). When the returned function is invoked with no arguments, the current average is outputted. If the returned function is invoked with no arguments before any numbers are passed in, then it 
should return 0.

### Challenge 10b

Create a function makeFuncTester that accepts an array (of two-element sub-arrays), and returns a function (that will accept a callback). The returned function should return true if the first elements (of each sub-array) being passed into the callback all yield the corresponding second elements (of the same sub-array). 
Otherwise, the returned function should return false.

### Challenge 11b

Create a function makeHistory that accepts a number (which will serve as a limit), and returns a function (that will accept a string). The returned function will save a history of the most recent "limit" number of strings passed into the returned function (one per invocation only). Every time a string is passed into the function, the function should return that same string with the word 'done' after it (separated by a space). However, if the string 'undo' is passed into the function, then the function should delete the last action saved in the history, and return that delted string with the word 'undone' after (separated by a space). If 'undo' is passed into the function and the function's history is empty, then the function should return the 
string 'nothing to undo'.

### Challenge 12b

Inspect the commented out test cases carefully if you need help to understand these instructions.

Create a function blackjack that accepts an array (which will contain numbers ranging from 1 through 11), and returns a DEALER function. The DEALER function will take two arguments (both numbers), and then return yet ANOTHER function, which we will call the PLAYER function.
On the FIRST invocation of the PLAYER function, it will return the sum of the two numbers passed into the DEALER function.

On the SECOND invocation of the PLAYER function, it will return either:

the first number in the array that was passed into blackjack PLUS the sum of the two numbers passed in as arguments into the DEALER function, IF that sum is 21 or below, OR
the string 'bust' if that sum is over 21.

If it is 'bust', then every invocation of the PLAYER function AFTER THAT will return the string 'you are done!' (but unlike 'bust', the 'you are done!' output will NOT use a number in the array). If it is NOT 'bust', then the next invocation of the PLAYER function will return either:

the most recent sum plus the next number in the array (a new sum) if that new sum is 21 or less, OR
the string 'bust' if the new sum is over 21.

And again, if it is 'bust', then every subsequent invocation of the PLAYER function will return the string 'you are done!'. Otherwise, it can continue on to give the next sum with the next number in the array, and so forth.
You may assume that the given array is long enough to give a 'bust' before running out of numbers.

BONUS: Implement blackjack so the DEALER function can return more PLAYER functions that will each continue to take the next number in the array after the previous PLAYER function left off. You will just need to make sure the array has enough numbers for all the PLAYER functions.


## Extension Challenges

### Challenge 1c

Create a function functionValidator that accepts an array of functions and two different values (let's call them input and output). This function should return a new array containing *only* the functions from the 
original array that, when invoked with input, return the value output. Use reduce!

### Challenge 2c

Create a function allClear that accepts an array of evaluator functions (each returning a boolean value), and a single value. Using reduce, return a single boolean value indicating whether the value "passes" every single 
one of the evaluator functions (i.e. returns true).

### Challenge 3c

Write a function numSelectString that accepts an array of numbers and returns a string. This function should use filter, sort, and reduce to return a string containing only the odd numbers from the array, separated by 
commas, in ascending order.

### Challenge 4c

Write a function movieSelector that accepts an array of objects containing movie information (id, title, and score). Chain together invocations of map, filter AND reduce to return an array containing only movies with a 
score greater than 5. The titles should be all uppercase strings.

### Challenge 5c

Create a function curriedAddThreeNums that adds three numbers together when run thrice in succession as follows:

curriedAddThreeNums(1)(3)(7) //should return 10

### Challenge 6c

Use partial application with your previously-defined curriedAddThreeNums to create a new function curriedAddTwoNumsToFive that when run twice in succession, adds two numbers to five as follows:
curriedAddTwoNumsToFive(6)(7) //should return 18
