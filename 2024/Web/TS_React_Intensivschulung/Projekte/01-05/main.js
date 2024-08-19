// import userCreator from "./export"
// import { printFirstName, printDOB} from "./export"; // Ist erster name immer erste Funktion ?
// userCreator();
// printFirstName();
// printDOB();



// Task 03 Promise
/*
Now we have to deal with the difficult part of promises: chaining. Chaining promises is the 
very reason we have promises in the first place. It's a proper way to tell JavaScript the next 
thing to do after an asynchronous task is done, thus avoiding the pyramid of doom we saw in the previous
lessons.
Import the functions created in one and 2 and chain them.
Add another then and catch block to log the result or the error


*/

import { job } from './task_03_Promises.js';
import { checkNumber } from './task_03_checkNumber.js';

job()
    .then((data) => {
        console.log(`Zufallsnummer: ${data}`);
        return checkNumber(data);
    })
    .then((result) => {
        console.log(`Doppelt: ${result * 2}`);
    })
    .catch((error) => {
        if (typeof error === 'string') {
            console.log(`${error}`);
        } else if (typeof error === 'number' && error > 5) {
            console.log('Nummer ist größer als 5.');
        }
    });