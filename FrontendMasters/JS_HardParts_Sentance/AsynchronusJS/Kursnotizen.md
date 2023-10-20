
# The Hard Parts of Asynchronus Javascript / Will Sentance / Anfang Oktober 23`

[Course Slides](https://static.frontendmasters.com/resources/2018-05-23-javascript-new-hard-parts/new-hard-parts-slides.pdf)


## Content

- [The Hard Parts of Asynchronus Javascript / Will Sentance / Anfang Oktober 23\`](#the-hard-parts-of-asynchronus-javascript--will-sentance--anfang-oktober-23)
  - [Content](#content)
  - [Takeaways](#takeaways)
  - [Takeaways](#takeaways-1)
  - [Verwendung von Promises in JavaScript](#verwendung-von-promises-in-javascript)
    - [Promises \& Microtask-Queue](#promises--microtask-queue)
    - [.then(onFulFillment)](#thenonfulfillment)
  - [fetch](#fetch)
    - [Ablauf von `fetch()` und `xhrhttprequest`](#ablauf-von-fetch-und-xhrhttprequest)
    - [Häufig verwendete Optionen für `fetch` und `xhr`](#häufig-verwendete-optionen-für-fetch-und-xhr)
  - [closures](#closures)
  - [Queues und Event Loop in JavaScript](#queues-und-event-loop-in-javascript)
    - [Queues:](#queues)
    - [Event Loop:](#event-loop)
  - [Generatoren](#generatoren)
  - [Asynchrones Javascript](#asynchrones-javascript)
    - [Asynchrone Generatoren](#asynchrone-generatoren)
    - [async / await](#async--await)

## Takeaways

+ Promises

+ `fetch` & `xhr-(httprequest)` 

+ Queues + Event Loop

+ Generatoren

+ Asynchrones Javascript

## Takeaways

+ `yield` ist ähnlich wie `return`, hält/pausiert aber den *Execution Context* an anstatt die Funktion zu beenden. Alles was rechts von yield stehtm wird evaluiert, also auch `let num = yield 5 + 5` evaluiert zu 10 - yield gibt 10 zurück - und num nimmt den Wert von einem theoretischen `.next(x)` call auf --> `num == x`, weil `num != 10` ! 

+ `fetch` gibt einerseits ein *Promise-Objekt* zurück und stoßt anderereits das Browser-Feature *xhrhttprequest* an. Es ist eine sogenannte 'Facade-Function' 

## Verwendung von Promises in JavaScript

Ein Promise-Objekt in JavaScript kann verschiedene Zustände haben:

1. `pending`: Dies ist der anfängliche Zustand des Promises, wenn die Verarbeitung noch nicht abgeschlossen ist.

2. `resolved`: Dieser Zustand tritt auf, wenn die Verarbeitung erfolgreich abgeschlossen wurde. Das Promise hält nun das Response-Objekt oder den Wert, auf den es erfüllt wurde.

3. `rejected`: Dieser Zustand tritt auf, wenn während der Verarbeitung ein Fehler auftritt. Das Promise ist abgelehnt worden, und das Promise-Objekt enthält keine Daten. In diesem Fall sollte der Fehler behandelt werden.

Um auf die Daten zuzugreifen, die in einem Promise `resolved` wurden, kann man die Methode `.then()` verwenden, um eine Funktion auszuführen, sobald das Promise erfüllt ist. Wenn ein Fehler auftritt, kann die Methode `.catch()` verwendet werden, um den Fehler zu behandeln.

Beispiel:

```javascript
const data = fetch("http://www.example.com/datafile");

data
  .then((response) => {
    // Zugriff auf die erhaltene Antwort, wenn das Promise resolved ist
    console.log(response.status);
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    // Behandlung von Fehlern, wenn das Promise rejected ist
    console.error('Fehler:', error);
  });
```
### Promises & Microtask-Queue

Ein interessantes Detail: Bei einem `resolved`-Promise werden alle Funktionen aus dem Unfulfilled-Callbacks-Array des Promise-Objekts in die Mikrotask-Queue gelegt. Der Event-Loop der Laufzeitumgebung (Browser, Node) priorisiert die Abarbeitung der Mikrotasks vor anderen Aufgaben in der Task-Queue. Dadurch werden die in `.then()` übergebenen Funktionen schnell ausgeführt, sobald das Promise `resolved` wird. Dies ermöglicht es, auf die erhaltene Antwort unmittelbar nach Abschluss des Downloads zuzugreifen.

### .then(onFulFillment)

`promise.then(onFulfillment);`

+ `promise`: Das Promise-Objekt, auf das .then() angewendet wird.
+ `onFulfillment`: Eine Funktion, die ausgeführt wird, wenn das Promise erfolgreich erfüllt wurde. Diese Funktion erhält normalerweise das Ergebnis der erfolgreichen Operation als Argument.
```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Erfolgreich erfüllt!");
  }, 1000);
});

myPromise.then((result) => {
  console.log(result); // Wird nach erfolgreicher Erfüllung ausgeführt
});
```
In diesem Beispiel wird myPromise nach einer Verzögerung von 1 Sekunde erfolgreich erfüllt, und die Funktion, die an .then() übergeben wird, wird mit dem Ergebnis "Erfolgreich erfüllt!" aufgerufen.

Die .then()-Methode ist eine wichtige Funktion in der Arbeit mit Promises, um auf erfolgreiche Erfüllung zu reagieren.

## fetch

### Ablauf von `fetch()` und `xhrhttprequest`

1. **JavaScript-Code**:
   Man kann in JavaScript `fetch()` aufrufen, um eine HTTP-Anfrage an eine externe Ressource zu senden. Zum Beispiel:
    ```javascript
    const data = fetch("http://www.example.com/datafile");
    ```
    Dieser Aufruf erstellt eine Variable `data` im globalen Speicher.

2. **Globales Speicher-Label**:
   Ein globales Speicher-Label (`data`) wird erstellt und auf ein Promise-Objekt verweist. Dieses Promise hat anfangs den Wert `undefined` und eine leere Warteschlange von Unfulfilled-Callbacks.
    ```javascript
    globaler Speicher:
    data: Promise {[[PromiseState]]: "pending", [[PromiseResult]]: undefined, unfulfillment: []}
    ```
3. **Browser API "fetch"**:
   Das `fetch()`-Objekt löst die Browser-API "fetch" aus. Diese API nimmt die angegebene URL (`http://www.example.com/datafile`) und andere Konfigurationsoptionen wie `method`, `headers`, und `body` entgegen.
    ```
    Browser-API "fetch":
    - URL: http://www.example.com/datafile
    - Method: GET
    - Headers: Standard-HTTP-Header
    - Body: Kein Body (bei GET-Anfragen)
    ```
4. **xhrhttprequest erstellen und konfigurieren**:
   Hinter den Kulissen wird ein XMLHttpRequest-Objekt (`xhrhttprequest`) erzeugt und konfiguriert, um die HTTP-Anfrage auszuführen. Dieses Objekt enthält die Informationen aus `fetch()`, einschließlich der URL, Methode und anderer Konfigurationsoptionen.
    ```
    Browser-API "fetch":
    - URL: http://www.example.com/datafile
    - Method: GET
    - Headers: Standard-HTTP-Header
    - Body: Kein Body (bei GET-Anfragen)

    XMLHttpRequest-Objekt (xhrhttprequest):
    - URL: http://www.example.com/datafile
    - Methode: GET
    - Header: Standard-HTTP-Header
    - Body: Kein Body (bei GET-Anfragen)
    ```

5. **Asynchrone Ausführung**:
   Während die HTTP-Anfrage asynchron im Hintergrund ausgeführt wird, setzt das JavaScript-Programm seine Ausführung fort. Die Ausführung des Codes erfolgt asynchron, es sei denn, Sie verwenden `await`, um auf das Ergebnis zu warten.

6. **Abschluss der Anfrage**:
   Sobald die HTTP-Anfrage abgeschlossen ist, wird das Promise-Objekt mit dem resultierenden Response-Objekt erfüllt. Der Wert des Promises wird auf das Response-Objekt gesetzt, und die Warteschlange von Unfulfilled-Callbacks wird abgearbeitet.

    ```javascript
    globaler Speicher (nach Erfüllung des Promises):
    data: Response { ... }  // Response-Objekt mit den Daten der Antwort
    ```
7. **Globales Speicher-Label (nach Erfüllung)**:
   Nachdem das Promise erfüllt wurde, hält das `data`-Label die Ressourcen des Response-Objekts bereit, und man kann auf den Payload oder andere Informationen aus der Antwort zugreifen.
    ```javascript
    globaler Speicher (nach Erfüllung des Promises):
    data: Response { ... }  // Response-Objekt mit den Daten der Antwort
    ```
### Häufig verwendete Optionen für `fetch` und `xhr`

Einige häufig verwendete Optionen für `fetch` und `xhr`:

- `method`: Die HTTP-Methode, z.B., "GET", "POST", "PUT".
- `headers`: Die HTTP-Header für die Anfrage, z.B., zur Angabe des Inhaltsformats.
- `body`: Der Anfragekörper, z.B., für das Senden von Daten an den Server.
- `mode`: Der Modus der Anfrage, z.B., "cors" für Cross-Origin-Anfragen.
- `credentials`: Die Anmeldeinformationen für die Anfrage, z.B., "include" für Cookies.
- `cache`: Die Cache-Steuerung, z.B., "no-cache" für keine Zwischenspeicherung.
- `redirect`: Das Verhalten bei Weiterleitungen, z.B., "follow" für das Folgen von Weiterleitungen.
- `timeout`: Die maximale Zeit, die auf die Antwort gewartet wird, bevor ein Timeout ausgelöst wird.

## closures

Funktionen, die aus anderen Funktionen  zurückgegeben werden, nehmen die Daten aus deren lokalen Speicher mit. Diese werden in der Funktionsdefinition der zurückgegeben Funktion als "Rucksack" mitgegeben und können referenziert werden.

Sie erfassen dabei die Umgebung, in der sie erstellt wurden. Diese Umgebung, einschließlich aller lokalen Variablen und Parameter der äußeren Funktion, wird als "Closure" (zu Deutsch: Abschluss) bezeichnet. Das Closure ist eine Art Rucksack, der die Daten aus der äußeren Funktion mit sich trägt.

Hier ist ein Beispiel, um dies zu verdeutlichen:

    ´´´javascript
    function createMultiplier(factor) {
      // Die äußere Funktion gibt eine innere Funktion zurück
      return function (number) {
	// Die innere Funktion verwendet 'factor' aus dem Closure
	return number * factor;
      };
    }

    // createMultiplier erstellt eine Funktion, die das Closure beinhaltet
    const double = createMultiplier(2);

    // Die zurückgegebene Funktion referenziert 'factor' aus dem Closure
    console.log(double(5)); // Gibt 10 aus, da 'factor' 2 ist
    ´´´

In diesem Beispiel wird die äußere Funktion createMultiplier aufgerufen, um eine innere Funktion zu erstellen. Die innere Funktion erfasst das factor-Argument aus dem Closure der äußeren Funktion und verwendet es, um eine Multiplikation durchzuführen. Das factor bleibt im Closure erhalten, auch wenn die äußere Funktion bereits abgeschlossen ist.



## Queues und Event Loop in JavaScript

In JavaScript gibt es verschiedene Queues und den Event Loop, die eine wichtige Rolle in der asynchronen Ausführung von Code spielen. Diese Queues und der Event Loop sind entscheidend, um Aufgaben zu planen und zu priorisieren.

### Queues:

1. **Call Stack**:
   Der Call Stack enthält Funktionen, die derzeit ausgeführt werden. Dies ist der Hauptausführungspfad des Programms.

   Beispiel:
   ```javascript
   function foo() {
     console.log("Foo wird ausgeführt");
   }
   
   foo();  // Foo wird auf den Call Stack gelegt
   ```

   Nicht-Beispiel:
   ```javascript
   function bar() {
     foo();  // Dies führt zu Rekursion und Stack Overflow
   }
   
   bar();
   ```

2. **Microtask Queue**:
   Die Microtask Queue ist die Warteschlange, in der Mikroaufgaben aus Promises und anderen asynchronen APIs verarbeitet werden. Sie hat Vorrang vor der Task Queue.

   Beispiel:
   ```javascript
   Promise.resolve().then(() => {
     console.log("Mikroaufgabe wird ausgeführt");
   });
   ```

   Nicht-Beispiel:
   ```javascript
   setTimeout(() => {
     console.log("Dies landet in der Task Queue");
   }, 0);
   ```

3. **Task Queue (auch als Callback Queue bekannt)**:
   Die Task Queue enthält Callback-Funktionen von Timer-Funktionen (z. B. `setTimeout`), Ereignis-Callbacks (z. B. Klick-Ereignisse) und AJAX-Anfragen.

   Beispiel:
   ```javascript
   setTimeout(() => {
     console.log("Timer-Funktion wird ausgeführt");
   }, 1000);
   ```

   Nicht-Beispiel:
   ```javascript
   document.addEventListener("click", () => {
     console.log("Dies landet in der Event Queue");
   });
   ```

4. **I/O Queue (E/A-Warteschlange)**:
   Die I/O Queue enthält E/A-bezogene Operationen wie das Lesen von Dateien oder das Durchführen von Netzwerkanfragen. Diese Operationen werden vom zugrunde liegenden System verarbeitet.

   Beispiel:
   ```javascript
   const fs = require("fs");
   fs.readFile("datei.txt", "utf8", (err, data) => {
     if (err) throw err;
     console.log("Datei-Lesevorgang wird ausgeführt");
   });
   ```

   Nicht-Beispiel:
   ```javascript
   console.log("Dies ist keine E/A-Operation");
   ```

5. **Check Queue (auch als Next Tick Queue bekannt)**:
   Die Check Queue enthält Operationen, die mit der Funktion `setImmediate` geplant wurden. Diese Operationen werden sofort nach der aktuellen Event-Loop-Phase ausgeführt.

   Beispiel:
   ```javascript
   setImmediate(() => {
     console.log("Check-Queue-Operation wird ausgeführt");
   });
   ```

   Nicht-Beispiel:
   ```javascript
   setTimeout(() => {
     console.log("Dies wird nicht in der Check Queue sein");
   }, 0);
   ```

### Event Loop:

Der Event Loop ist verantwortlich für die Koordination der Ausführung von Aufgaben aus den verschiedenen Queues. Hier ist eine vereinfachte Darstellung des Event Loops:

1. Der Event Loop beginnt mit dem Call Stack und prüft, ob es dort Aufgaben gibt, die ausgeführt werden müssen.

2. Wenn der Call Stack leer ist, überprüft der Event Loop die Microtask Queue und führt alle darin befindlichen Mikroaufgaben aus.

3. Danach überprüft der Event Loop die Task Queue und führt die Aufgaben in der Reihenfolge ihrer Priorität aus.

4. Dieser Prozess wiederholt sich, bis alle Queues leer sind.

   Beispiel:
   ```javascript
   console.log("Start");
   
   setTimeout(() => {
     console.log("Timer-Funktion wird ausgeführt");
   }, 1000);
   
   Promise.resolve().then(() => {
     console.log("Mikroaufgabe wird ausgeführt");
   });
   
   console.log("Ende");
   ```

   Ausgabe:
   ```
   Start
   Ende
   Mikroaufgabe wird ausgeführt
   Timer-Funktion wird ausgeführt
   ```

Dies ist eine vereinfachte Darstellung des Event Loops und der Queues in JavaScript. Es ist wichtig zu verstehen, wie sie funktionieren, um asynchronen Code effektiv zu schreiben.

In den folgenden Teilen dieser Markdown-Datei werde ich weitere Queues und den Event Loop ausführlich behandeln und Beispiele für deren Verwendung geben.

## Generatoren

JS Generatoren sind im Grunde ein Objekt, indem eine Eigenschaft zurückgegeben werden kann, welche die Funktion .next als Wert besitzt. Im lokalen Speicher des Elements ist ein Index gespeichert, der bei jedem Aufruf von .next inkrementiert wird. Damit kann ein Objekt/Kollektion so durchlaufen werden, dass immer das nächste Element zurückgegeben wird.

```javascript
function* iter(arg) {
  let start = arg + 10;
  yield start;
  start++;
  let mid = yield 1 + start;
  start++;
  mid++;
  yield start + mid;
}

let gen = iter(1);
let val_1 = gen.next(); // 11 (Generator Objekte mit value & done properties)
let val_2 = gen.next(); // 13
let val_3 = gen.next(6); // 20
let val_4 = gen.next(); // undefined

console.table([val_1, val_2, val_3, val_4]);
```

## Asynchrones Javascript

### Asynchrone Generatoren

```javascript
function doWhenDataReceived(value) {
  returnNextElement.next(value);
}

function* createFlow() {
  const data = yield fetch('http://twitter.com/will/tweets/1');
  console.log(data);
}

const returnNextElement = createFlow();
const futureData = returnNextElement.next();
futureData.value.then(doWhenDataReceived);
```

Das `data`-Objekt, das durch `returnNextElement.next()` zurückgegeben wird, sieht so aus: `{ value: undefined, status: 'pending', unfulfilled: [] }`. `value` ist anfangs `undefined`, da die asynchrone Operation (der *fetch*-Aufruf) noch nicht abgeschlossen ist.

Der status ist '*pending*', da die asynchrone Operation noch aussteht.Das *unfulfilled*-Array ist anfangs leer (`[]`). Es enthält Funktionen, die ausgeführt werden sollen, wenn `value` aktualisiert wird.

Nachdem die asynchrone Operation (der *fetch*-Aufruf) abgeschlossen ist und Daten zurückgibt, wird `value` auf die erhaltenen Daten aktualisiert. Wenn die Daten zurückkommen, wird die `doWhenDataReceived`-Funktion mit diesen Daten aufgerufen, da sie in `.then(doWhenDataReceived)` übergeben wurde.

Das `data`-Objekt wird aktualisiert, nachdem die Daten vom *fetch*-Aufruf zurückkommen, und die `console.log(data)`-Zeile wird die empfangenen Daten ausgeben.

### async / await

```javascript
async function createFlow(){
 console.log("Me first")
 const data = await fetch('https://twitter.com/will/tweets/1')
 console.log(data)
}
createFlow()
console.log("Me second")
```

1. Auslösen der asynchronen Funktion: Wenn eine Funktion mit dem async-Schlüsselwort deklariert wird, wird sie automatisch asynchron. Wenn die Funktion aufgerufen wird, wird sie in der Event Loop gestartet.

1. Ausführung der synchronen Teile: Zuerst führt die Funktion alle synchronen Teile des Codes aus. In deinem Beispiel wäre dies console.log("Me first"). Diese Ausgaben erscheinen sofort in der Konsole.

3. await-Ausdruck: Wenn ein await-Ausdruck erreicht wird (in deinem Fall await fetch('https://twitter.com/will/tweets/1')), wird die Ausführung der Funktion an dieser Stelle pausiert, und die Kontrolle wird an den Browser übergeben, um die asynchrone Operation (den fetch-Aufruf) zu verarbeiten.

4. Aufruf des asynchronen Dienstes: Der fetch-Aufruf wird an den Browser übergeben, um Daten von https://twitter.com/will/tweets/1 abzurufen. Der Browser kümmert sich um die Netzwerkanfrage.

5. Rückkehr zur Event Loop: Während der Browser auf die Antwort wartet, kehrt die Event Loop zur asynchronen Funktion zurück. In dieser Zeit wird der Rest der Funktion, nach dem await, nicht ausgeführt.

6. Fortsetzung nach der Antwort: Sobald die Antwort vom Server zurückkommt, wird die Event Loop benachrichtigt, und die Funktion wird an der Stelle fortgesetzt, an der sie pausiert wurde.

7. Verarbeitung der Antwort: In deinem Fall wird die Antwort in der Variable data gespeichert, und dann wird console.log(data) ausgeführt, um die Daten in der Konsole anzuzeigen.

8. Der Schlüssel hierbei ist, dass async/await es ermöglicht, asynchrone Operationen in einem synchronen Stil zu schreiben, was den Code lesbarer macht. Während die asynchrone Operation im Hintergrund ausgeführt wird, wird die Event Loop nicht blockiert, und andere Aufgaben können weiterhin bearbeitet werden. Dies ist besonders nützlich in Webanwendungen, um ein reaktives Benutzererlebnis zu gewährleisten.








