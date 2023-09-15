const testbox = document.querySelector('#testbox')

function math_sqrt(x) {
  if (x < 0) {
    throw new Error("Cannot compute square root of a negative number");
  }

  if (x === 0) {
    return 0;
  }

  let guess = x;
  let epsilon = 1e-15; // Tolerance level for approximation

  while (Math.abs(guess * guess - x) > epsilon) {
    guess = (guess + x / guess) / 2;
  }

  return guess;
}

// Exercise 1.3 Declare a function that takes three numbers as arguments and returns the sum of the squares of the two larger numbers.

function sumSquares(a, b, c) {
    let result;
    if(a + b > b + c) result = (a * a) + (b * b)    
    if (a + c > b + c) result = (a * a) + (c * c) 
    if((b * b) + (c * c) > result) result = (b * b) + (c * c)    
    return result;
}
// console.log(sumSquares(5, 2, 3))

// Factorial
function fact(x){
    return x === 1 ?
        1 :
        x * fact(x -1)
} 

//console.log(fact(5))

function square(x){
    return x * x;
}

function f(g){
    return g(2);
}

//console.log(f(square));
//console.log(f(z => z * (z + 1)));

// 196 / Exercise 3.1: Write a function make_accumulator that generates accumulators, each maintaining an independent sum.
function make_accumulator(init){
    // Mit separater local state variable: 
    // let sum = init;
    // return x => sum = sum + x;
    
    // Mit init als local state variable
    return x => init = init + x;
}

const a = make_accumulator(5)
// console.log(a(10))
// 15
// console.log(a(10))
// 25


// 196 / Exercise 3.2
function make_monitored(f){
    let counter = 0; /// WICHTIG: Da die Aufrufe von mf gezählt werden sollen, darf der counter n icht in mf sein
    function mf(x){
        if (x === 'how many calls'){ 
            return counter } 
            else if (x === 'reset count'){
                counter = 0} 
                else {
                    counter++
                    return f(x) // mf wird beim ersten return übergeben und die return jetzt die Ursprungsfuntkion vom User mit dem Argument der calls nach dem instanzieren
                }
    } 
    return mf // WICHTIG: Funktion ohne () zurückgeben - mf gibt sich selbst als Objektinstanz zurück, die auf die Userfunktion zugriff hat und sie zurückgibt
}
const s = make_monitored(math_sqrt)
//console.log(s("how many calls"))
//console.log(s(100))
//console.log(s("how many calls"))


function make_account(initialBalance, password, call_the_cops) {
  let balance = initialBalance;
  let consecutiveIncorrectAttempts = 0;

  function withdraw(password, amount) {
    if (password === password) {
      if (balance >= amount) {
        balance -= amount;
        consecutiveIncorrectAttempts = 0;
        return balance;
      } else {
        return "Insufficient funds";
      }
    } else {
      consecutiveIncorrectAttempts++;
      if (consecutiveIncorrectAttempts > 7) {
        call_the_cops();
      }
      return "Incorrect password";
    }
  }

  function deposit(password, amount) {
    if (password === password) {
      balance += amount;
      consecutiveIncorrectAttempts = 0;
      return balance;
    } else {
      consecutiveIncorrectAttempts++;
      if (consecutiveIncorrectAttempts > 7) {
        call_the_cops();
      }
      return "Incorrect password";
    }
  }

  function dispatch(password, request) {
    return request === "withdraw"
      ? withdraw.bind(null, password)
      : request === "deposit"
      ? deposit.bind(null, password)
      : "Unknown request";
  }

  return dispatch.bind(null, password);
}

function call_the_cops() {
  console.log("Calling the cops!");
}

//const acc = make_account(100, "secret password", call_the_cops);
//console.log(acc("wrong password", "withdraw")(40)); // Output: "Incorrect password"
//console.log(acc("wrong password", "deposit")(40)); // Output: "Incorrect password"
//console.log(acc("wrong password", "withdraw")(40)); // Output: "Incorrect password"
//console.log(acc("wrong password", "deposit")(40)); // Output: "Incorrect password"
//console.log(acc("wrong password", "withdraw")(40)); // Output: "Incorrect password"
//console.log(acc("wrong password", "deposit")(40)); // Output: "Incorrect password"
//console.log(acc("wrong password", "withdraw")(40)); // Output: "Incorrect password"
//console.log(acc("wrong password", "deposit")(40)); // Output: "Incorrect password"
//console.log(acc("wrong password", "withdraw")(40)); // Output: "Calling the cops!"




