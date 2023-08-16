# The Good Parts of Javascript and the Web / Douglas Crockford (Paypal)


## Objekte

+ `Objekt.create(null)` erbt nicht von `Object.prototype` (es erbt von nichts). Dies kann man nutzen, um wie in einem Hashtable Key=value zu Paare zu speichern

+ Ein Nachteil von Klassen-Orientierten Systemen ist, dass man zu Beginn eines Projektes die Klassen taxonomieren muss, also festlegen wie sie aussehen und was wovon erbt. und das zu einen Zeitpunkt, zu Beginn, bei dem man noch am allerwenigsten darüber weiß wie die Klassen zum Schluss aussehen werden.

## Numbers

+ In JS gibt es keine Integer, nur 64-Bit floating Number (Double)

## Booleans and Strings

+ Strings sind einer oder eine Sequenz von 16-Bit Unicode Characters
+ Präfix konvertiert einen String in eine Nummer: +str
+ Strings sind 16-Bit Characters

## Arrays

+ Arrays erben von Object.
+ Objekt-Indexe werden in einen String geparst.

# Dates, RegEx, & Types

+ Regulex ist ein Toll in welches man Regex eingeben kann und man gezeigt bekommt, was dieses Regex macht: [regulex](https://www.jex.im/regulex)

## Statements
+ break, for in, switch, throw, try/catch
+ Statements können Labels haben 

`break` statements können zu Lables referenzieren: 
```
LABEL for (let i =......) {
            ....
            if (...){
                break LABEL;
            }
}
```
## Functions

Funktionen erben von `Function.prototype`, sind JS-Objekte und Werte (em.: values), die in Variablen gespeichert werden können. In JavaScript, es gibt zwei Hauptweisen, wie Funktionen erstellt werden können: Function Statements und Function Expressions. Diese beiden Ansätze haben Unterschiede in der Art und Weise, wie sie erstellt und gehandhabt werden.

### Function Statement

Ein Function Statement ist die klassische Art und Weise, eine Funktion in JavaScript zu erstellen. Hier wird die Funktion mit dem Schlüsselwort "function" erstellt, gefolgt von einem zwingend erforderlichen Namen und den Parameterklammern:

```
function add(a, b) {
  return a + b;
}
```

In einem Function Statement ist der Funktionsname obligatorisch und die Funktion ist bereits vor der Ausführung des umgebenden Codeblocks verfügbar. Dies wird als "Named Function Hoisting" bezeichnet, weil die Funktion im Voraus deklariert wird, bevor der eigentliche Code ausgeführt wird. Der JS-Interpreter wandelt ein function statment intern wie folgt um:

```
function add(){...}
```
...wird zu...
```
var add = function add(){...}
```

### Function Expression

Eine Function Expression erstellt eine Funktion und weist sie einer Variable zu. Dies wird oft verwendet, um anonyme Funktionen zu erstellen oder um Funktionen als Werte in Variablen, Objekten oder Arrays zu speichern:

```
const subtract = function(a, b) {
  return a - b;
};
```
### Paramter

+ Extra Argumente werden ignoriert, fehlen Argumente sind sie undefined.
+ 2 Pseudo-Paramter:
    + `arguments` ist ein Array-ähnliches JS-Objekt, dass alle Argumente sammmelt, selbst wenn keine Parameter definiert wurden. Mit `arguments.length` bekommt man die Anzahl der Argumente (zb.: zum iterieren).
    + `this` hält eine Referenz zum aufgerufenen Objekt.

## Closure und IIFE

```
var digit_name = function(n) {
    var names = ['eins', 'zwei', 'drei',....];

    return names[n];
}
alert(digit_name(3));   // 'three/
```
Das Problem an diesem Beispiel ist, jedes Mal wenn `digit_name()` gecallt wird, muss ein neuer Array `names` erstellt werden. Dies kann man verhindern:

```
var digit_name = (function() {
    var names = ['eins', 'zwei', 'drei',....];

    return function(n){
        return names[n];
    };
}();
alert(digit_name(3));   // 'three/
```

Hier wird in `digit_name` nicht die äußere Funktion, sonder die zurückgegebene innere gespeichert und diese hat Zugriff auf den lokalen Speicher des Ausführungskontexts der äußeren Funktion, welche nur einmal, bei der Funktionszuweisung, gecallt wird.


## Näher anschauen:

+ Referent erklärt, dass eine Variable die man nicht initialisiert von JS automatisch mit undefined initialisiert wird.
+ `.forEach()` kann for Loops sehr oft ersetzen. 

