# WebAssembly / Jem Young (Senior Dev, Netflix) / Anfang September

[Kurswebsite](https://young.github.io/intro-to-web-assembly/https://young.github.io/intro-to-web-assembly/)

## Takeaways

+ Under the hood, numbers in JavaScript are 64-bit floating points whereas in Web Assembly all memory pointers are 32-bits
+ Der `Number.MAX_SAFE_INTEGER` ist 2 * 53 - 1  und nicht 2 * 64  -1, da die Differenz Header-Daten und andere Informationen sind
+ Der erste Bit ist der "signing Bit": Ist er 0, ist die Zahl positiv, ist  er 1, ist die Zahl negativ
+ Alle OpCodeOperators pushen ihren Wert automatisch auf den Stack


## 1. Hexadecimal

+ Hexadezimal verwendet die Basis 16 zur Berechnung von Bytewerten und die Buchstaben A bis F repräsentieren jeweils die Zahlen 10 bis 15.

| Decimal 	| Hexadecimal 	|
|:-------:	|:-----------:	|
| 0       	| 00          	|
| 1       	| 01          	|
| 2       	| 02          	|
| ..      	| ..          	|
| 9       	| 09          	|
| 10      	| 0A          	|
| 11      	| 0B          	|
| 12      	| 0C          	|
| 13      	| 0D          	|
| 14      	| 0E          	|
| 15      	| 0F          	|
| 16      	| 10          	|
| 17      	| 11          	|
| 18      	| 12          	|


![Hexadezimale Zählweise](mdimages/01_hex.png "Hexadezimale Zählweise")

2E7 = 743
(256 * 2) + (16 * 14) + (1 * 7) = 743

Confused? Totally ok! The first time coming across hex may seem a bit daunting but it's easy to see the advantage of hex when it comes to brevity and readabilty as compared with binary.

1A7 = 423
110100111 = 423

### hexToDecimal()

	```
	function hexToDecimal(hex){
	    return hex.toString(10);  // 10 is the radix
	}
	```

## 3. toString() method

All of this value conversion is a lot of mental overhead. Fortunately we can utilize JavaScript to make our lives easier.

Object.prototype.toString(radix)
toString() returns a string representation of an object. It takes an optional radix parameter.
radix is the number of unique digits. It is also known as base

Radix/Base	Type
2	binary
10	decimal
16	hexadecimal


+
+
+

## 4. What is WebAssembly

Web Assembly (wasm) is a powerful low-level language that is meant to be a compile target for high-level languages. It is designed to be portable and ran in many different environments. It is designed to compliment JavaScript, not replace it.

Web Assembly runs in its own environment at near native speed, can be cached, and runs much faster than JavaScript can be parsed.

File types
Web Assembly has two file types:

.wasm is the actual assembly code in binary format
.wat is the human readable textual representation of the code



## 5. Modules 

+
+
+


The fundamental unit of code is a module. Within the module, we create functions to export which can be called by JavaScript. Function parameters are known as locals and we access them with either get_local or local.get.

IMAGE


A Web Assembly module is a tree-based structure known as an S-expression. Just thought you'd like to know.

Web Assembly Studio
We're going use Web Assembly Studio to write our first hello world.

Our function will take a 32-bit integer as input and return the input unmodified.

	```
	;; main.wat
	(module
	  (func $helloWorld (param $num1 i32) (result i32)
	    get_local $num1
	  )
	  (export "helloWorld" (func $helloWorld))
	)
	```

Notice that a function implicitly returns the last item in the stack. To execute our wasm, click "build and run" to see the output of our hello world function.

Before we can build anything more complex there's two concepts we need to learn: stack and OpCodes.




## 6. Stack and OP code

+
+
+

Stacks
A stack is memory region where variables are stored and accessed by the running program. Once execution is complete the stack is cleared.

While similar in concept, a Stack is data structure that stores information in Last In First Order (LIFO) and is not the as an execution stack.

Web Assembly is stack based language so all operations read and write to the stack in a linear fashion.

Youve probably heard of the call stack in JavaScript which is a reserved portion of memory the interpreter uses to keep track of running functions.

OpCodes
Opcodes (Operation Code) are readable computer instructions representing machine language instructions.
IMAGE 01

[Link to interative table of WA OpCodes](https://pengowray.github.io/wasm-ops/)


IMAGE 02


| **Type** 	|    **Name**    	|
|:--------:	|:--------------:	|
|    i32   	| 32-bit integer 	|
|    i64   	| 64-bit integer 	|
|    f32   	|  32-bit float  	|
|    f64   	|  64-bit float  	|


*Instruction stack*

All Web Assembly instructions read and write from the stack. Think of the stack like a JavaScript array where values are pushed and popped to and from the stack. For example, i32.mul pops two i32 values from the stack and multiplies them together.

	```
	get_local 0 ;; push first parameter onto the stack
	get_local 1 ;; push second parameter onto the stack
	i32.mul ;; pop both values and execute operation
	```

To push a value onto the stack use the i32.const instruction

	`i32.const 99 ;; push 99 onto the stack`


## 7. Assembly Script

AssemblyScript at high level is a TypeScript to WebAssembly compiler. It provides both high-level language features such as loops but also allows for low-level memory access.
[AssemblyScript Website](http://www.assemblyscript.org/introduction.html)

+
+
+


Setup
Make sure we’re on latest version of node

We need to be version 14 or above.
$ nvm install --lts

Install npx
$ npm i -g npx

Create working directory
$ mkdir iwasm && cd iwasm

Install the loader
$ npm i --save @assemblyscript/loader

Install AssemblyScript
$ npm i --save-dev assemblyscript

Scaffold and build an empty project
$ npx asinit .
$ npm run asbuild

We're following the [Official AssemblyScript quick start guide](https://www.assemblyscript.org/getting-started.html)


working repo:
https://github.com/young/intro-to-web-assembly/tree/main











Let's start off with our minusOne example.

export function minusOne(n) {
  return n - 1;
}
Converting this function to AssemblyScript is straightforward. We just need to add types for the function argument and return value. AssemblyScript automatically looks in the /assembly directory for files to compile.

// /assembly/index.ts
export function minusOne(n: i32): i32 {
  return n - 1;
}
Let's convert our AssemblyScript to Web Assembly. The converted files are located in /build/.

npm run asbuild








Loading AssemblyScript - NodeJS
AssemblyScript automatically loads and imports your built wasm files into index.js.

// index.js
const fs = require("fs");
const loader = require("@assemblyscript/loader");
const imports = { /* imports go here */ };
const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), imports);
module.exports = wasmModule.exports;
To run our compiled module we require index.js and call our exported wasm function.

$ node
> const { minusOne } = require('./index.js');
> minusOne(2);
// 1











Loading AssemblyScript - Browser
Working repo
Now we get to the good stuff: using our Web Assembly in the browser just as nature intended.

All modern browsers have the WebAssembly global object that acts the primary API into Web Assembly. WebAssembly has five static methods:

WebAssembly.compile() - Compile wasm
WebAssembly.compileStreaming() - Compile wasm from a streamed source
WebAssembly.instantiate() - Compile and instantiate wasm
WebAssembly.instantiateStreaming() - Compile and instantiate wasm from a streamed source
WebAssembly.validate() - Checks if wasm code is valid
Fetching wasm
We're fetching wasm from our server so let's use instantiate() and instantiateStreaming() to make a utility class for fetching and compiling our wasm.

// js/loader.js

class WasmLoader {
    constructor(){}

    async wasm(path){}

    async wasmFallback(path){}
}
Our wasm() method takes a path to the wasm file and will return the exported wasm functions. The wasmFallback() method is for browsers that don't support instantiateStreaming().

// js/loader.js

class WasmLoader {
    constructor(){}

    async wasm(path) {
        console.log(`fetching ${path}`);

        if (!WebAssembly.instantiateStreaming) {
            return this.wasmFallback(path);
        }

        const { instance } = await WebAssembly.instantiateStreaming(fetch(path));

        return instance?.exports;
    }

    async wasmFallback(path){}
}
wasmFallback() works the same as wasm() with the exeception that we need to create an intermediate array buffer before instantiating our module.

// js/loader.js

class WasmLoader {
    constructor(){}

    async wasm(path) {
        console.log(`fetching ${path}`);

        if (!WebAssembly.instantiateStreaming) {
            return this.wasmFallback(path);
        }

        const { instance } = await WebAssembly.instantiateStreaming(fetch(path));

        return instance?.exports;
    }

    async wasmFallback(path){
        console.log('using fallback');
        const response = await fetch(path);
        const bytes = await response?.arrayBuffer();
        const { instance } = await WebAssembly.instantiate(bytes);

        return instance?.exports;
    }
}
Creating a server
instantiateStreaming() requires the wasm being fetched to have an Content-Type: application/wasm response header. Fortunately, Express will automatically add this header when serving requests for wasm files.

Install Express

$ npm i express --save
Create a simple server

// server.js
const express = require('express');
const app = express();
// Serve static files from root (note: do not this in production code)
app.use(express.static('./'))

app.listen(3000, () => console.log('Server up on port 3000!'));
Add a run script to start the server

// package.json
"server": "node server.js"
Loading in the browser
Let's import our WasmLoader and use it to access our minusone() function.

<!-- index.html -->
<!DOCTYPE html>
<html>
<body>
  <div id="main"></div>
  <script src=/js/loader.js></script>
  <script>
      const WL = new WasmLoader();
      WL.wasm('/build/optimized.wasm')
        .then(instance => {
        const { minusOne } = instance;

        document.write(minusOne(44));
        });
  </script>
</body>
</html>
Navigate to localhost:3000 and you will see 43 on the page. Congratulations! We've written Web Assembly, loaded and compiled the module, and executed a wasm function 🎉. Now that we understand how to export and run wasm functions in JavaScript, let's learn how to import JS functions into Web Assembly.





















## 7.

+
+
+


## 8.

+
+
+


## 8.

+
+
+
