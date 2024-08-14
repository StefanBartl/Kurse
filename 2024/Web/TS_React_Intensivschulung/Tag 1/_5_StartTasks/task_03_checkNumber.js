/* 
Create a new exported function checkNumber. Your function receives a parameter data.
Your function must always return a promise
If data is not a number, return a promise rejected instantly and give the data "error" 
(in a string)
If data is an odd number, return a promise resolved 1 second later and give the data "odd" (in a string)
If data is an even number, return a promise rejected 2 seconds later and give the data "even" (in a string)
Import and test your function with the parameters "test", 1 and 2


Modify the function checkNumber that it returns the value as is (so the actual number). Resolve
 in case of odd or even number and reject if the number is greater than 5
Modify your then and catch block, that it either doubles the value or prints an error to the console, 
that the generated number is greater than 5
*/

export function checkNumber(data) {
    return new Promise((resolve, reject) => {
        if (typeof data !== 'number') {
            reject('error');
        } else if (data % 2 !== 0) {
            setTimeout(() => resolve('odd'), 1000);
        } else if (data % 2 === 0) {
            setTimeout(() => reject('even'), 2000);
        }
    });
}

export function checkNumber2(data) {
    return new Promise((resolve, reject) => {
        if (typeof data !== 'number') {
            reject('error');
        } else if (data > 5) {
            reject(data);
        } else {
            resolve(data);
        }
    });
}
