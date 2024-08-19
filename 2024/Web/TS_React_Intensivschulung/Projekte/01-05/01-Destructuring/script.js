// Aufgabe 1: Array Destructuring

// Ursprünglicher Code
// let item = ["Egg", 0.25, 12];
// let name = item[0];
// let price = item[1];
// let quantity = item[2];

item = 2;

// Array Destructuring
let item = ["Egg", 0.25, 12];
let [name, price, quantity] = item;

console.log(name);     // Ausgabe: Egg
console.log(price);    // Ausgabe: 0.25
console.log(quantity); // Ausgabe: 12

function mergeObjects(a, b) {
  return { ...a, ...b };
}
