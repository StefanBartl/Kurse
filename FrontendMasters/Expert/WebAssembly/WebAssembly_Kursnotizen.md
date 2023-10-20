# WebAssembly / Jem Young (Senior Dev, Netflix) / Anfang September

[Kurswebsite](https://young.github.io/intro-to-web-assembly/https://young.github.io/intro-to-web-assembly/)

## Content

- [WebAssembly / Jem Young (Senior Dev, Netflix) / Anfang September](#webassembly--jem-young-senior-dev-netflix--anfang-september)
  - [Content](#content)
  - [Takeaways](#takeaways)
  - [Contents](#contents)
  - [1. Hexadecimal](#1-hexadecimal)
    - [hexToDecimal()](#hextodecimal)
  - [3. toString() method](#3-tostring-method)
  - [4. What is WebAssembly](#4-what-is-webassembly)
  - [5. Modules](#5-modules)
  - [6. Stack and OP code](#6-stack-and-op-code)
  - [7. Assembly Script](#7-assembly-script)
  - [8. Writing AssemblyScript](#8-writing-assemblyscript)
  - [Loading AssemblyScript - NodeJS](#loading-assemblyscript---nodejs)
  - [Loading AssemblyScript - Browser](#loading-assemblyscript---browser)
  - [Imports](#imports)
  - [Defining imports](#defining-imports)
  - [AssemblyScript Loader](#assemblyscript-loader)
  - [Using the AssemblyScript loader](#using-the-assemblyscript-loader)
  - [Memory](#memory)
  - [JS vs Wasm](#js-vs-wasm)

## Takeaways

+ Under the hood, numbers in JavaScript are 64-bit floating points whereas in Web Assembly all memory pointers are 32-bits
+ Der `Number.MAX_SAFE_INTEGER` ist 2 * 53 - 1  und nicht 2 * 64  -1, da die Differenz Header-Daten und andere Informationen sind
+ Der erste Bit ist der "signing Bit": Ist er 0, ist die Zahl positiv, ist  er 1, ist die Zahl negativ
+ Alle OpCodeOperators pushen ihren Wert automatisch auf den Stack

## Contents

1. Hexadecimal
2. The underrated .toString() method
3. Memory
4. Numeric types
5. Web Assembly
6. What is Web Assembly?
7. Modules
8. Stack and OpCode
9. Writing Web Assembly
10. AssemblyScript
11. What is AssemblyScript
12. AssemblyScript Setup
13. Writing AssemblyScript
14. Loading AssemblyScript - NodeJS
15. Loading AssemblyScript - Browser
16. Imports
17. AssemblyScript Loader
18. Using the AssemblyScript loader
19. Memory
20. JS vs Wasm

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

+ Instruction stack

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

Setup
Make sure we’re on latest version of node

    ```
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
    ```

We're following the [Official AssemblyScript quick start guide](https://www.assemblyscript.org/getting-started.html)

working repo:
<https://github.com/young/intro-to-web-assembly/tree/main>

## 8. Writing AssemblyScript

Let's start off with our minusOne example.

    ```
    export function minusOne(n) {
      return n - 1;
    }
    ```

Converting this function to AssemblyScript is straightforward. We just need to add types for the function argument and return value. AssemblyScript automatically looks in the /assembly directory for files to compile.

    ```
    // /assembly/index.ts
    export function minusOne(n: i32): i32 {
      return n - 1;
    }
    ```

Let's convert our AssemblyScript to Web Assembly. The converted files are located in /build/.

    `npm run asbuild`

## Loading AssemblyScript - NodeJS

AssemblyScript automatically loads and imports your built wasm files into index.js.

    ```
    // index.js
    const fs = require("fs");
    const loader = require("@assemblyscript/loader");
    const imports = { /* imports go here */ };
    const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), imports);
    module.exports = wasmModule.exports;
    ```

To run our compiled module we require index.js and call our exported wasm function.

    ```
    $ node
    > const { minusOne } = require('./index.js');
    > minusOne(2);
    // 1
    ```

## Loading AssemblyScript - Browser

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

    ```
    // js/loader.js

    class WasmLoader {
        constructor(){}

        async wasm(path){}

        async wasmFallback(path){}
    }
    ```

Our wasm() method takes a path to the wasm file and will return the exported wasm functions. The wasmFallback() method is for browsers that don't support instantiateStreaming().

    ```
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
    ```

wasmFallback() works the same as wasm() with the exeception that we need to create an intermediate array buffer before instantiating our module.

    ```
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
    ```

+ Creating a server
instantiateStreaming() requires the wasm being fetched to have an Content-Type: application/wasm response header. Fortunately, Express will automatically add this header when serving requests for wasm files.

+ Install Express

  `$ npm i express --save`

Create a simple server

    ```
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
    ```

Navigate to localhost:3000 and you will see 43 on the page. Congratulations! We've written Web Assembly, loaded and compiled the module, and executed a wasm function 🎉. Now that we understand how to export and run wasm functions in JavaScript, let's learn how to import JS functions into Web Assembly.

## Imports

Just as we can export wasm functions, we can import JS functions into our code. One useful import is the abort() function which we call if we want terminate execution of wasm a function.

Call abort() if the function input is 44.

    ```
    // assembly/index.ts
    export function minusOne(n: i32): i32 {

      if (n == 44) {
        abort();
      }

      return n - 1;
    }
    ```

Compile our wasm

    `$ npm run asbuild`

Loading the browser we see an error: Imports argument must be present and must be an object

This is because abort() isn't currently defined in the context of our wasm yet. The import object is defined in the second argument of instantiateStreaming() and instantiate().

Create an import object with an abort() function.

    ```
    // js/loader.js
        constructor() {
          this._imports = {
                env: {
                    abort() {
                        throw new Error('Abort called from wasm file');
                    }
                }
            };
        }
    ```

Add the import object to both methods

    ```
    // js/loader.js
      async wasm(path, imports = this._imports) {
            console.log(`fetching ${path}`);

            if (!WebAssembly.instantiateStreaming) {
                return this.wasmFallback(path, imports);
            }

            const { instance } = await WebAssembly.instantiateStreaming(fetch(path), imports);

            return instance?.exports;
        }

        async wasmFallback(path, imports) {
            console.log('using fallback');
            const response = await fetch(path);
            const bytes = await response?.arrayBuffer();
            const { instance } = await WebAssembly.instantiate(bytes, imports);

            return instance?.exports;
        }
    ```

Loading the page now throws an exception. Remove the abort() call for now and rebuild the wasm code.

## Defining imports

AssemblyScript has several imports built into its loader (which we'll cover a bit later) so we didn't have to manually declare abort(). For other JavaScript functions imported into AssemblyScript we need to define them before they can be imported.

To define a custom import in AssemblyScript we declare it's function signature. Here we're defining a log function that will allow us to call console.log() from Web Assembly code.

    ```
    // assembly/index.ts
    declare function log(n: i32): void

    export function minusOne(n: i32): i32 {
      log(n);
      return n - 1;
    }
    ```

Add the function to the import object.

    ```
    // js/loader.js
        constructor() {
          this._imports = {
                env: {
                    abort() {
                        throw new Error('Abort called from wasm file');
                    }
                },
                index: {
                    log(n) {
                        console.log(n);
                    }
                }
            };
        }
    ```

## AssemblyScript Loader

Let's import the loader into the page:

    ```
    // index.html
    <script src="https://cdn.jsdelivr.net/npm/@assemblyscript/loader/umd/index.js"></script>
    In loader.js file, replace the WebAssembly method calls with loader.

    // js/loader.js
    class WasmLoader {
        constructor() {...}

        async wasm(path, imports = this._imports) {
            console.log(`fetching ${path}`);

            if (!loader.instantiateStreaming) {
                return this.wasmFallback(path, imports);
            }

            const { instance } = await loader.instantiateStreaming(fetch(path), imports);

            return instance?.exports;
        }

        async wasmFallback(path, imports) {
            console.log('using fallback');
            const response = await fetch(path);
            const bytes = await response?.arrayBuffer();
            const { instance } = await loader.instantiate(bytes, imports);

            return instance?.exports;
        }
    }
    ```

The AssemblyScript loader will require internal glue code to be sent with our wasm. Adding the --exportRuntime flag will compile our wasm with these helper functions.

    ```
    // package.json
    "asbuild:untouched": "asc assembly/index.ts --target debug --exportRuntime",
    "asbuild:optimized": "asc assembly/index.ts --target release --exportRuntime"
    ```

## Using the AssemblyScript loader

Using the loader to fetch and instantiate our wasm lets us access some useful utility functions but we need to update our WasmLoader class to export them.

    ```
    // js/loader.js
    // WasmLoader::wasm()
    const instance = await loader.instantiateStreaming(fetch(path), imports);
    return instance;
    // WasmLoader::wasmFallback()
    const instance = await loader.instantiate(bytes, imports);
    ```

The instance methods include our exported wasm functions along with AssemblyScript utilities. We're reading a string from memory so we're going to use __getString().

    ```
    // index.html
    const { fizzbuzz, __getString } = instance;
    const str = __getString(fizzbuzz(3));
    document.write(str);
    ```

BONUS
Let's check out the source code of __getString

    ```
    // Take a pointer as only argument
    function __getString(ptr) {
    // Return null if there's no pointer
    if (!ptr) return null;
    // Get reference to wasm memory
    const buffer = memory.buffer;
    // Load wasm memory buffer into a 32 bit unsigned integer array
    const id = new Uint32Array(buffer)
    // The memory location of the string is at pointer + the runtime header offset
    // The location is then zero fill right shifted
    [ptr + ID_OFFSET >>> 2];
    /** Reads a string from the module's memory by its pointer. */
    function __getString(ptr) {
      if (!ptr) return null;
      const buffer = memory.buffer;
      const id = new Uint32Array(buffer)[ptr + ID_OFFSET >>> 2];
      if (id !== STRING_ID) throw Error(`not a string: ${ptr}`);
      return getStringImpl(buffer, ptr);
    }
    ```

## Memory

Memory in Web Assembly is linear. The easiest way to visualize it is to think of a long unbroken chain of 0's and 1's. When we instantiate a wasm module, a fixed portion of memory is allocated to the process and all data passed between wasm and JavaScript takes place in this fixed portion of space. This contrasts with JavaScript memory which utilizes both a stack and heap.

A heap is dynamic, non-linear memory used by a program to arbitrarily read and store data.

+ ArrayBuffers

Naturally we need a way to read and write to this fixed memory space. Other languages have pointers, addresses to specifc locations in memory, whereas in JavaScript we have to use an ArrayBuffer object. An ArrayBuffer is an object that represents raw binary data. A SharedArrayBuffer is an ArrayBuffer that represents a fixed-length portion of memory that can be shared by multiple processes. WebAssembly.Memory is the name of the memory shared by JavaScript and WebAssembly that is used to pass data back and forth.

Because ArrayBuffer SharedArrayBuffer are merely representations of raw binary data, we need to use a TypedArray to properly coerce the raw data into something useable by our processes.

+ Memory and TypedArrays

Create an ArrayBuffer and allocate 1 page (64Kb) of memory

    `const memory = new WebAssembly.Memory({ initial: 1, shared: true });`

Create an array-like object where each index is a pointer to a 16-bit unsigned integer

    `const u16Array = new Uint16Array(memory.buffer);`

We can now directly write into memory and the number 42 will be accessible by both JavaScript and Web Assembly

    ```
    u16Array[0] = 42;
    Memory in AssemblyScript
    Working repo
    // assembly/index.ts
    // Grow memory by 2 pages (128Kb)
    memory.grow(2);
    // Save 21 at index 0
    store<u8>(0, 21);
    // Save 99 at index 1
    store<u8>(1, 99);

    export function readMemory(n: i32): i32 {
        return load<u8>(n);
    }
    ```

    ```
    // index.html
    const { readMemory, memory } = instance;

    const memoryArray = new Uint8Array(memory.buffer);
    // Read from memory at index 1
    // Returns 99
    document.write(memoryArray[1]);
    document.write('<br/>');
    // Write to memory at index 2
    memoryArray[2] = 42;
    // Returns 42
    document.write(readMemory(2));
    ```

## JS vs Wasm

Let's do simple experiment to see which is faster: JavaScript or Web Assembly?

prime function from this excellent logrocket post: <https://blog.logrocket.com/the-introductory-guide-to-assemblyscript/>

    ```
    export function isPrimeWasm(x: u32): bool {
      if (x < 2) {
          return false;
      }

      for (let i: u32 = 2; i < x; i++) {
          if (x % i === 0) {
              return false;
          }
      }

      return true;
    }
    ```

    ```
    <!DOCTYPE html>
    <html>
    <body>
      <input id="primeIn"/>
      <script src="https://cdn.jsdelivr.net/npm/@assemblyscript/loader/umd/index.js"></script>

      <script src=/js/loader.js></script>
      <script>
        const el = document.getElementById("primeIn");

        function isPrimeJS(x) {
              if (x < 2) {
                  return false;
              }

              for (let i = 2; i < x; i++) {
                  if (x % i === 0) {
                      return false;
                  }
              }
              return true;
          }

          const WL = new WasmLoader();
          WL.wasm('/build/optimized.wasm')
          .then(instance => {
            const { isPrimeWasm } = instance;
            el.addEventListener('keyup', () => {
              console.table(run(el.value))
            })
            function run(n) {
            const results = [];
              for (let i = 0; i < 1000; i++) {
              const timeStartWasm = performance.now();
              isPrimeWasm(n);
              const wasmTime = performance.now() - timeStartWasm;


              const timeStartJS = performance.now();
              isPrimeJS(n);
              const jsTime = performance.now() - timeStartJS;

              if (jsTime < wasmTime) {
                results.push('JavaScript');
              } else {
                results.push('WASM');
              }
            }

            return results.reduce((acc, item) => {
                if (item === 'JavaScript') {
                    acc['JavaScript']++
                }
                if (item === 'WASM') {
                    acc['WASM']++
                }
                return acc;
            }, {'JavaScript': 0, 'WASM': 0})

        }

          });
      </script>
    </body>
    </html>
    ```

So which is faster?
