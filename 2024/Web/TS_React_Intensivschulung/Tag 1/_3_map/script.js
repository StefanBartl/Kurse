/*
In the file util.js do the following:

Create a transformToObjects 
function that transforms a list of numbers into a list of JavaScript objects.

Example: For the provided input [1, 2, 3] the transformToObjects() 
function should return [{val: 1}, {val: 2}, {val: 3}].

*/

function transformToObjects(numbers) {
    return numbers.map(number => ({ val: number }));
  }
  
  const list = [1, 2, 3];
  const result = transformToObjects(list);
  console.log(result); 