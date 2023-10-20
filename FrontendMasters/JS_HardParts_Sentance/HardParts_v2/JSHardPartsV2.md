## JS Hard Parts v2 / Will Sentance ( Codesmith CEO ) / Mitte August, 23


## Content

- [JS Hard Parts v2 / Will Sentance ( Codesmith CEO ) / Mitte August, 23](#js-hard-parts-v2--will-sentance--codesmith-ceo---mitte-august-23)
- [Content](#content)
- [Funktionen](#funktionen)
- [Callback-Queue vs, Microtask-Queue](#callback-queue-vs-microtask-queue)
  - [Promise Microtask Queue (auch bekannt als Microtask Queue)](#promise-microtask-queue-auch-bekannt-als-microtask-queue)
  - [Callback Queue](#callback-queue)
  - [Node.js Speziafall](#nodejs-speziafall)
- [Protoype Chain](#protoype-chain)
  - [Prototypen Link](#prototypen-link)
  - [__proto__ als Link auf Object.prototype (deprecated)](#proto-als-link-auf-objectprototype-deprecated)
  - [`this` als implizieter Parameter](#this-als-implizieter-parameter)
    - [that = this (deprecated)](#that--this-deprecated)
- [Protoype vs Class](#protoype-vs-class)
- [Wichtiges](#wichtiges)

## Funktionen

+ ***Execution context***: Eine Funktion stellt in Javascript einen neuen Ausführungskontext (en.: execution context) dar, da ein neuer "Thread of Execution" und ein neuer lokaler Speicher zur Verfügung gestellt wird. Dies wird über ***scope*** und ***cllosure*** realisiert.
    + Die Funktionsdefinition und der Name wird im ***global()*** Ausführungkontext gespeichert: Label -> Funktionsname & value _> Funktionsdefinition.
    + Man spicht allgemein zb.: von einer Konstanten Variable / einem Array / usw... im globalen Ausführungskontext vs. im lokalen Ausführungskontext.
    + Loops haben keinen eigene Ausführungkontext, aber einen eigenen Namespace
+ ***return***: Mit return schickt JS den zurückgegebenen Wert vom für die Funktion lokalen Speicher an die Speicheradresse im Programmspeicher, an der die Variable engelegt ist, zu welcher der Funktionsaufruf evaluiert wird.
+ Im ***call stack*** representiert die Funktion ***global()*** den Ausführungskontext des JS Programms dar und ist immer 'ganz unten'.
+ ***Wichtige Ausführungselemente***: Um den Vorgang bei einem Funktionsaufruf abzubielden benötigt man 3 Elemente: Global Memory, Local Memory, Call Stack
+ ***Function Memory:*** Gibt man eine Funktion aus einer Funktion zurück, nimmt diese Referenzen auf die Daten des lokalen Speichers mit:
```
function outer(){
    let counter = 0;
    function incrementCounter(){ counter++; }
    return incrementCounter; 
}
const myNewFunction = outer();
myNewFunction()
```
Da ***myNewFunction()*** aus der Funktion ***outer()*** zurückgegeben wurde hat sie Zugriff auf die Variable ***counter***, auch dann wenn der Ausführungskontext von ***outer()*** nach der Zuweisung zu ***myNewFunction*** schon geschlossen ist. Dieses Verhalten wird auch ***Funktionsgedächtnis*** (en.: Function Memory) bzw. Zugriff auf "Live Data" genannt.
***myNewFunction()*** bekommt effektiv im globalen Ausführungskontext die Funktionsdefinition von ***incrementCounter()*** zugewiesen und an diese ist die Variable counter (data) angehängt.

Die funktioniert über eine ***'hidden property'***, also eine ***'versteckte Eigenschaft'***, die in diesem Beispiel von ***myNewFunction()*** gecallt wir, da sie ja die Funktionsdefinition von ***incrementCounter*** übernommen hat, ***counter***, aber nicht in ihre lokalen Speciher ihres Auführungskontextes zu finden ist, also call sie [[scope]] bevor sie in global() nachsieht.

Daten, die nicht durch die zurückgegebene Funktion referenziert werden, sind nicht mehr abrufbar. In diesem Beispiel wird über ***incrementCounter()*** zwar ***myNewFunction()*** der Link zum gesamten lokalen Speicher von ***outer()*** mitgegeben, da ***incrementCounter()*** jedoch nichts anderes als counter referenziert, würden andere Daten in diesem lokalen Speicher nicht mehr erreichbar sein und damit ein 'Memory leak' darstellen. 
+ ***'hidden properties'*** werden in der Javascript Dokumentation immer mit zwei eckigen Klammern [[hidden propertie]] ausgewiesen
+ Javscript ist eine ***lexical scoped language***, was im Bezug auf Funktionen bedeutet, dass die Funktion auf jene Daten Zugriff hat, die bei ihrem ersten Aufruf im Ausführungskontext initialisiert waren. Diese Daten werden wie folgt beschrieben: ***'persistent, lexical, static scoped reference data'***.
+ ***Multiple Instanzen***: Jede Funktion hat ihren eigenen Ausführungskontext und daher auch eigene Instanzen der Daten der 'Mutterfunktion'. Würde man im obigen Beispiel neben ***myNewFunction()*** eine weiter Funktion instanzieren, würde diese eine eigene  ***counter*** Variable in ihren Ausführungskontext bekommen.
+ ***closure***:
In JavaScript bezieht sich der Begriff "Closure" auf ein Programmierkonzept, bei dem eine Funktion auch nach Beendigung ihrer umgebenden (umschließenden) Scope weiterhin Zugriff auf Variablen aus diesem Scope hat. Mit anderen Worten ermöglicht eine Closure einer Funktion, Variablen und den Zustand ihres umgebenden Scopes "einzufangen" und verfügbar zu machen, auch wenn der Scope technisch gesehen bereits beendet wurde.
Closures sind eine leistungsstarke Funktion in JavaScript und haben mehrere wichtige Anwendungsfälle:
Datenkapselung: Closures können verwendet werden, um private Variablen zu erstellen und Daten innerhalb einer Funktion zu kapseln. Dies hilft dabei, unbeabsichtigten externen Zugriff und die Modifikation von Variablen zu verhindern.
Rückruffunktionen (Callback-Funktionen): Closures werden häufig in asynchroner Programmierung verwendet, beispielsweise bei der Verwendung von Rückrufsfunktionen oder Promises. Eine Closure kann Variablen einfangen, die für die Ausführung des Rückrufs erforderlich sind, auch wenn diese Variablen bis zur Ausführung des Rückrufs außerhalb des Scopes gewesen wären.
Funktionale Programmierung: Closures ermöglichen funktionale Programmierungstechniken wie Currying, bei denen eine Funktion eine andere Funktion zurückgibt, die sich an die Argumente des ursprünglichen Funktionsaufrufs erinnert.
Beispiel (ähnlich wie oben):
```
function aeussereFunktion() {
  let aeussereVariable = 'Ich komme von der äußeren Funktion';
  
  function innereFunktion() {
    console.log(aeussereVariable); // Die innere Funktion hat immer noch Zugriff auf aeussereVariable
  }
  
  return innereFunktion;
}

const closuresBeispiel = aeussereFunktion(); // innereFunktion wird zurückgegeben, aber aeussereVariable sollte den Scope verlassen haben

closuresBeispiel(); // D
```
In diesem Beispiel bildet die innereFunktion eine Closure über die aeussereVariable, wodurch sie Zugriff auf aeussereVariable hat, obwohl aeussereFunktion bereits beendet ist.


## Callback-Queue vs, Microtask-Queue

### Promise Microtask Queue (auch bekannt als Microtask Queue)

Die Microtask Queue ist eine Warteschlange für Aufgaben, die auf Mikroaufgaben basieren, wie sie durch Promises und der Funktion queueMicrotask erstellt werden. Diese Mikroaufgaben haben eine höhere Priorität als die Aufgaben in der Callback Queue und werden vor diesen ausgeführt. Dies bedeutet, dass sie den Call Stack abarbeiten, bevor die Callback Queue bearbeitet wird.

```
console.log("Start");

Promise.resolve().then(() => {
  console.log("Microtask 1");
});

Promise.resolve().then(() => {
  console.log("Microtask 2");
});

console.log("End");
```

In diesem Beispiel werden "Start", "End" und dann "Microtask 1" und "Microtask 2" in dieser Reihenfolge protokolliert.

### Callback Queue

Die Callback Queue ist eine Warteschlange für asynchrone Aufgaben, die nicht auf Promises basieren. Sie enthält z.B. Aufgaben von setTimeout, AJAX-Anfragen oder Event-Listenern. Diese Aufgaben haben eine geringere Priorität als Mikroaufgaben und werden nach diesen abgearbeitet.

```
console.log("Start");

setTimeout(() => {
  console.log("Callback 1");
}, 0);

setTimeout(() => {
  console.log("Callback 2");
}, 0);

console.log("End");
```
In diesem Beispiel werden "Start", "End", "Callback 1" und "Callback 2" in dieser Reihenfolge protokolliert.

### Node.js Speziafall

In Node.js kann man die Ausführung von Callbacks in der Callback Queue beeinflussen, indem man die Funktionen process.nextTick oder setImmediate verwendet. Diese ermöglicht es, Callbacks mit unterschiedlicher Priorität in den nächsten Durchlauf der Ereignisschleife zu verschieben. 
Die Funktion `process.nextTick` hat eine höhere Priorität als `setImmediate`. Callbacks, die mit `process.nextTick` hinzugefügt werden, werden vor Callbacks in der setImmediate Queue ausgeführt. Dadurch kannst du praktisch Mikroaufgaben hinzufügen, die vor anderen Aufgaben in der Ereignisschleife ausgeführt werden sollen.

```
console.log("Start");

process.nextTick(() => {
  console.log("Next Tick 1");
});

setImmediate(() => {
  console.log("Set Immediate 1");
});

console.log("End");
```

In diesem Beispiel wird die Reihenfolge des Loggens wie folgt sein:

```
"Start"
"End"
"Next Tick 1"
"Set Immediate 1"
```

## Protoype Chain

### Prototypen Link 

Der Vorteil der Prototype-Chain ist, dass Code nur 1x gespeichert werden muss und danach wieder verwendet werden kann:

```
function userCreator (name, score) {
    const newUser = Object.create(userFunctionStore); // userFunctionStore wird als Prototyp für neue User gesetzt
    newUser.name = name;
    newUser.score = score;
    return newUser;
};

const userFunctionStore = { // Da als Protoytp gesetzt hat userFunctionStore Zugriff auf die lokalen Variabeln
    increment: function(){this.score++;},
    login: function(){console.log("Logged in");}
};

const user1 = userCreator("Will", 3);
const user2 = userCreator("Tim", 5);
user1.increment();
```

### __proto__ als Link auf Object.prototype (deprecated)

+ `__proto__`: Dies ist eine interne Eigenschaft in JavaScript-Objekten, die auf das Prototypobjekt des betreffenden Objekts zeigt. Sie kann verwendet werden, um auf das Prototypobjekt zuzugreifen und die Verkettung von Prototypen in der Vererbungshierarchie zu verfolgen.

+ `Object.prototype`: Dies ist das Prototypobjekt, von dem alle JavaScript-Objekte standardmäßig erben. Es enthält die grundlegenden Methoden und Eigenschaften, die auf jedem JavaScript-Objekt verfügbar sind.

```
const obj = {};
console.log(obj.__proto__ === Object.prototype); // true

// Allgemeine, empfohlene  Methode, um auf das Prototypobjekt zuzugreifen
const proto = Object.getPrototypeOf(obj);
console.log(proto === Object.prototype); // true
```

### `this` als implizieter Parameter

Das genaue Verhalten von "this" hängt davon ab, wie die Funktion aufgerufen wird. Hier sind einige häufige Szenarien:

+ Funktionsaufruf 

Wenn man eine Funktion ohne eine explizite Objektreferenz aufruft, wird "this" standardmäßig auf das globale Objekt (normalerweise das Fensterobjekt im Browser oder "global" in Node.js) gesetzt.

+ Methodenaufruf 

Wenn man eine Funktion als Methode eines Objekts aufruft, wird "this" auf das betreffende Objekt gesetzt. Zum Beispiel:
```
const obj = {
  prop: 'Hello',
  showProp: function() {
    console.log(this.prop);
  }
};

obj.showProp(); // Hier wird "this" auf "obj" gesetzt
```

+ Konstruktorfunktionen 

Beim Erstellen von Objekten mithilfe von Konstruktorfunktionen wird "this" auf das neu erstellte Objekt gesetzt. 
```
function Person(name) {
  this.name = name;
}

const person1 = new Person('Alice'); // "this" verweist auf das Objekt "person1"
```

+ Funktionsbindung 

Man kann die Bindung von "this" mithilfe von Methoden wie bind, call und apply ändern. Diese ermöglichen es, eine bestimmte Objektreferenz für "this" festzulegen.
```
function greet() {
  console.log(`Hello, ${this.name}`);
}

const person = { name: 'Bob' };

const greetPerson = greet.bind(person);
greetPerson(); // "this" wird auf das "person"-Objekt gesetzt
```

+ Arrow-Funktionen 

Bei Arrow-Funktionen wird "this" basierend auf dem umgebenden Kontext erfasst. Es zeigt auf das "this" der umgebenden Funktion oder des globalen Objekts, je nachdem, wo die Arrow-Funktion definiert ist.
```
const obj = {
  name: 'Carol',
  greet: () => {
    console.log(`Hello, ${this.name}`); // Hier zeigt "this" auf das globale Objekt
  }
};

obj.greet();
```

#### that = this (deprecated)

In JavaScript gab es eine Zeit, in der das Muster that = this verwendet wurde, um das Problem des geänderten Wertes von this in verschachtelten Funktionen zu umgehen. Dieses Muster wurde oft in Situationen verwendet, in denen der Kontext von this in einer inneren Funktion nicht mehr dem gewünschten Objekt entsprach.

Hier ist ein Beispiel, wie das Muster that = this verwendet wurde:
```
function Counter() {
  var that = this;
  that.count = 0;

  setInterval(function() {
    // Hier verweist "this" nicht mehr auf "Counter", sondern auf "window" (im Browser)
    that.count++;
    console.log(that.count);
  }, 1000);
}

var counter = new Counter();
```

Das Muster `that = this` wurde verwendet, um den Wert von this in der äußeren Funktion (hier: Counter) zu erfassen und in der inneren Funktion zu verwenden. Dies geschah, weil in JavaScript die Funktionsaufrufkontexte dazu führen können, dass this auf unterschiedliche Werte verweist, abhängig davon, wie die Funktion aufgerufen wird.

Allerdings hat sich das Verhalten von ***this*** in JavaScript über die Jahre entwickelt, und mit der Einführung von Arrow-Funktionen wurde das Muster `that = this` oft überflüssig. Arrow-Funktionen erben das this des umgebenden Kontexts, was das Problem der Kontextänderung in vielen Fällen löst:

```
function Counter() {
  this.count = 0;

  setInterval(() => {
    // Hier verweist "this" auf "Counter"
    this.count++;
    console.log(this.count);
  }, 1000);
}

var counter = new Counter();
```

## Protoype vs Class

Folgende Codes führen zum gleichen Ergebnis:

Prototypenkette:

```
function userCreator(name, score){
    this.name = name;
    this.score = score;
}

userCreator.prototype.increment = function(){ this.score++; };
userCreator.prototype.login = function(){ console.log("login"); };

const user1 = new userCreator(“Eva”, 9)

user1.increment()
```

Klassensytax:

```
class UserCreator {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }

  increment() {
    this.score++;
  }

  login() {
    console.log("login");
  }
}

const user1 = new UserCreator("Eva", 9);
user1.increment();
```

Beide Codes sind identisch, tatsächlich wird die Klassensyntax von JS exakt gleich behandelt und intern so abgespeichert, als hätte man die Prototype-Variante geschrieben. `class` ist in JS "syntactic sugar". Sie existiert nur für die Programmierer, nicht für den Browser.


## Wichtiges

+ Ausführungskontext (en.: execution context) 
    + Globaler Speicher (en.: global memory) und Lokaler Speicher (en.: local memory)
    + Call-Stack
        + Event-Queue
            + Microtask-Queue
            + Callback-Queue
+ Objekte
    + Funktionen sind in JS Funktionen und Objekte gleichzeitig, je nachdem wie man sie behandelt
        + `()` löst einen Funktionsaufruf aus: `fname()` -> Funktion wir nach Funktionsdefinition ausgeführt
        + `.` ermöglicht auf die Funktion wie auf ein Objekt zuzugreifen: `fname.store = 9` -> Speicher das Label `store` mit dem Wert `9` in die Funktion
    + Prototype-Chain
        + Prototypobjekt
        + Prototypen-Pointer
    + this
        + Eine Funktion die keinem Objekt zugewiesen wurde hat `this = global`



