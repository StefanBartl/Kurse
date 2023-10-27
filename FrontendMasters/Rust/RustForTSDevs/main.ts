
/*
const { readFileSync } = require("fs");

function readFile(){
    try {
        const file = readFileSync("./lines", "utf-8")
        console.log(file)
    } catch (e){
        console.error(e)
    }
}

readFile();
*/

type Custom = {
    age: number,
    name: string
}

type Item = number | string | Custom

function append(items: Item[]){
    items.push("Hello Fem!")
}

const items: Item[] = [];
append(items)
console.log(items)

const nums: number[] = [1]
append(nums)
console.log(nums)
console.log(items)
