# The Hard Parts of Functional JavaScript / Will Sentance / Mitte Oktober, 23`

[Course Slides](https://static.frontendmasters.com/resources/2019-07-31-hard-parts-functional-js/functional-programming.pdf)
[Course Exercises](http://csbin.io/functional)

## **Takeaways**

## reduce()

`Array.prototype.reduce()` ist eine leistungsstarke Funktion in JavaScript, die es ermöglicht, alle Elemente eines Arrays in einen einzelnen Wert zu aggregieren. Sie nimmt eine Funktion und einen optionalen Anfangswert (Akkumulator) als Parameter und gibt das Endergebnis zurück.

Die Funktion, die an `reduce()` übergeben wird, hat vier Parameter:

1. **accumulator (Akkumulator)**: Der Akkumulator speichert das Zwischenergebnis. Es wird bei jedem Schleifendurchlauf aktualisiert und am Ende als Endergebnis zurückgegeben.

2. **currentValue (Aktueller Wert)**: Der aktuelle Wert ist das Element des Arrays, das derzeit in der Schleife verarbeitet wird.

3. **currentIndex (Aktueller Index)**: Der Index des aktuellen Elements im Array.

4. **array (Das Array selbst)**: Das ursprüngliche Array, auf dem die `reduce()`-Funktion aufgerufen wird.

Die grundlegende Syntax für die Verwendung von `reduce()` ist:

```javascript
array.reduce(function(accumulator, currentValue, currentIndex, array) {
  // Logik zur Aggregation der Werte im Akkumulator
}, initialValue);
```

### `reduce()` Anwendungsbeispiele

#### **1. Produkt aller Elemente in einem Array**

```javascript
const numbers = [2, 3, 4, 5];
const product = numbers.reduce((acc, curr) => acc * curr, 1);
console.log(product); // Ausgabe: 120
```

#### **2. Konvertiere ein Array von Wörtern zu einem Satz**

```javascript
const words = ['Ich', 'liebe', 'JavaScript!'];
const sentence = words.reduce((acc, curr) => acc + ' ' + curr);
console.log(sentence); // Ausgabe: "Ich liebe JavaScript!"
```

#### **3. Gruppiere Elemente in einem Objekt nach ihrer Länge**

```javascript
const words = ['Apfel', 'Banane', 'Erdbeere', 'Kiwi'];
const grouped = words.reduce((acc, curr) => {
  const len = curr.length;
  if (!acc[len]) {
    acc[len] = [];
  }
  acc[len].push(curr);
  return acc;
}, {});
console.log(grouped);
// Ausgabe: { '5': [ 'Apfel', 'Kiwi' ], '6': [ 'Banane' ], '8': [ 'Erdbeere' ] }
```

#### **4. Zähle das Vorkommen von Buchstaben in einem Satz**

```javascript
const sentence = 'JavaScript ist fantastisch!';
const charCount = sentence.split('').reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});
console.log(charCount);
// Ausgabe: { J: 1, a: 3, v: 1, ... }
```

#### **5. Filtere ein Array nach einem Kriterium**

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.reduce((acc, curr) => {
  if (curr % 2 === 0) {
    acc.push(curr);
  }
  return acc;
}, []);
console.log(evens); // Ausgabe: [2, 4, 6, 8, 10]
```

#### **6. Finde den Durchschnitt einer Liste von Punkten**

```javascript
const scores = [85, 92, 78, 90, 88];
const average = scores.reduce((acc, curr) => acc + curr, 0) / scores.length;
console.log(average); // Ausgabe: 86.6
```

#### **7. Verschmelze mehrere Arrays in ein einziges Array**

```javascript
const arrays = [[1, 2], [3, 4], [5, 6]];
const merged = arrays.reduce((acc, curr) => acc.concat(curr), []);
console.log(merged); // Ausgabe: [1, 2, 3, 4, 5, 6]
```

#### **8. Finde das längste Wort in einem Satz**

```javascript
const sentence = 'JavaScript ist eine großartige Programmiersprache.';
const longestWord = sentence.split(' ').reduce((acc, curr) => {
  if (curr.length > acc.length) {
    return curr;
  }
  return acc;
}, '');
console.log(longestWord); // Ausgabe: "Programmiersprache."
```

#### **9. Ermittle, ob alle Elemente in einem Array eine bestimmte Bedingung erfüllen**

```javascript
const numbers = [10, 20, 30, 40, 50];
const allGreaterThan5 = numbers.reduce((acc, curr) => acc && curr > 5, true);
console.log(allGreaterThan5); // Ausgabe: true
```

#### **10. Finde das häufigste Element in einem Array**

```javascript
const elements = ['A', 'B', 'A', 'C', 'B', 'B', 'D'];
const mostFrequent = elements.reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});
const maxFrequency = Math.max(...Object.values(mostFrequent));
const mostFrequentElement = Object.keys(mostFrequent).find((key) => mostFrequent[key] === maxFrequency);
console.log(mostFrequentElement); // Ausgabe: "B"
```

#### **11. Summieren**

```javascript
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);

console.log(sum); // Ausgabe: 15
```

#### **12. Maximum finden**

```javascript
const numbers = [5, 8, 2, 1, 9, 4];

const max = numbers.reduce(function(accumulator, currentValue) {
  return Math.max(accumulator, currentValue);
}, -Infinity);

console.log(max); // Ausgabe: 9
```

#### **13. Konkatenieren von Strings**

```javascript
const words = ['Hello', ' ', 'World', '!'];

const concatenated = words.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, '');

console.log(concatenated); // Ausgabe: "Hello World!"
```

## Function Decoration

Funktionsdekoration (Function Decoration) ist eine leistungsstarke Technik, um bestehende Funktionen zu erweitern oder anzupassen. Hier sind fünf weitere Beispiele für Funktionen, die dekoriert werden:

### 1. **Memoization (Caching)**: Eine Funktion kann mit Memoization dekoriert werden, um die Ergebnisse für bereits berechnete Eingabewerte zu speichern und bei erneuter Verwendung direkt zurückzugeben, anstatt die Berechnung erneut durchzuführen

```javascript
const memoize = (fn) => {
  const cache = new Map();
  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
};
```

### 2. **Logging**: Eine Funktion kann mit Logging dekoriert werden, um Informationen über die Ausführung zu protokollieren, z. B. Eingabewerte und Ausgabewerte

```javascript
const logExecution = (fn) => {
  return (...args) => {
    console.log(`Executing function with arguments: ${args}`);
    const result = fn(...args);
    console.log(`Function returned: ${result}`);
    return result;
  };
};
```

### 3. **Validierung**: Eine Funktion kann mit Validierung dekoriert werden, um sicherzustellen, dass die Eingabewerte gültig sind, bevor die eigentliche Funktion ausgeführt wird

```javascript
const validateArgs = (fn, validator) => {
  return (...args) => {
    if (validator(...args)) {
      return fn(...args);
    } else {
      throw new Error('Invalid arguments');
    }
  };
};
```

### 4. **Timing**: Eine Funktion kann mit Timing dekoriert werden, um die Ausführungszeit zu messen

```javascript
const measureTime = (fn) => {
  return (...args) => {
    const startTime = performance.now();
    const result = fn(...args);
    const endTime = performance.now();
    console.log(`Function executed in ${endTime - startTime} ms`);
    return result;
  };
};
```

### 5. **Throttling/Debouncing**: Eine Funktion kann mit Throttling oder Debouncing dekoriert werden, um die Häufigkeit von Funktionsaufrufen zu steuern

```javascript
const throttle = (fn, delay) => {
  let lastExecution = 0;
  return (...args) => {
    const now = performance.now();
    if (now - lastExecution >= delay) {
      lastExecution = now;
      return fn(...args);
    }
  };
};
```

## Function Decoration & Partial Apllication

Partial Application (Teilweise Anwendung) ist ein Konzept in der Funktionenprogrammierung, das verwendet wird, um eine Funktion schrittweise mit Argumenten zu versorgen. Dies ermöglicht die Erstellung von spezialisierten Funktionen, die auf eine bestimmte Teilmenge der Argumente abzielen, ohne die ursprüngliche Funktion zu ändern.

### Beispiel Mulitplikation

Angenommen, wir haben eine Funktion `multiply`, die zwei Argumente erwartet:

```javascript
const multiply = (a, b) => a * b;
```

Wenn wir die Partial Application anwenden möchten, um eine neue Funktion zu erstellen, die immer mit einem bestimmten Wert multipliziert, können wir die `prefillFunction` verwenden:

```javascript
function prefillFunction(fn, prefilledValue) {
  const inner = (liveInput) => {
    const output = fn(liveInput, prefilledValue);
    return output;
  };
  return inner;
}
```

In diesem Fall erstellen wir eine Funktion `prefillFunction`, die eine Funktion `fn` und ein `prefilledValue` als Argumente akzeptiert. Die innere Funktion `inner` nimmt dann ein "liveInput" entgegen und verwendet `fn`, um es mit dem vorher festgelegten Wert `prefilledValue` zu kombinieren.

Jetzt können wir Partial Application verwenden, um eine spezialisierte Multiplikationsfunktion zu erstellen:

```javascript
const multiplyBy2 = prefillFunction(multiply, 2);
```

Die `multiplyBy2`-Funktion ist jetzt spezialisiert, um immer mit dem Wert 2 zu multiplizieren:

```javascript
const result = multiplyBy2(5); // Das ergibt 10 (5 * 2)
```

Partial Application ermöglicht es uns, eine Funktion schrittweise mit Argumenten zu versorgen und spezialisierte Funktionen für verschiedene Verwendungszwecke zu erstellen, ohne die ursprüngliche Funktion zu ändern. Das ist besonders nützlich in der funktionalen Programmierung, um flexible und wiederverwendbare Funktionen zu erstellen.

### Weitere Anwendungsbeispiele

**1. Währungsumrechner:**

Angenommen, Sie haben eine Funktion, die Beträge von einer Währung in eine andere umrechnet. Mit Partial Application können Sie spezielle Funktionen erstellen, die auf eine bestimmte Währung abzielen, während der Umrechnungskurs als festes Argument festgelegt ist.

   ```javascript
   const convertCurrency = (rate, amount) => rate * amount;
   const convertToUSD = prefillFunction(convertCurrency, 1.2); // Umrechnung in US-Dollar
   const convertToEUR = prefillFunction(convertCurrency, 0.9); // Umrechnung in Euro
   ```

**2.Benutzerdefinierte Sortierfunktionen:**

Wenn Sie eine allgemeine Sortierfunktion haben, können Sie Partial Application verwenden, um spezielle Sortierfunktionen für verschiedene Datenstrukturen oder Sortierkriterien zu erstellen.

   ```javascript
   const genericSort = (arr, compareFn) => arr.slice().sort(compareFn);
   const sortByAscending = prefillFunction(genericSort, (a, b) => a - b);
   const sortByDescending = prefillFunction(genericSort, (a, b) => b - a);
   ```

Selbstverständlich, hier sind drei weitere Anwendungen für Partial Application mit einer spezifischen Logik:

**3. Benutzerberechtigungen:**

Wenn Sie eine Berechtigungsprüfungsfunktion haben, die überprüft, ob ein Benutzer Zugriff auf bestimmte Ressourcen hat, können Sie Partial Application verwenden, um spezialisierte Berechtigungsprüfungen für verschiedene Ressourcen zu erstellen.

   ```javascript
   const checkPermission = (user, resource, action) => {
     // Berechtigungsprüfungslogik hier
   };
   const checkUserReadPermission = prefillFunction(checkPermission, 'read'); // Prüfung auf Leseberechtigung
   const checkUserWritePermission = prefillFunction(checkPermission, 'write'); // Prüfung auf Schreibberechtigung
   ```

  ```javascript
  const grantAccess = (resource, user) => {
  // Logik zur Überprüfung von Berechtigungen
  };
  const grantAccessToFiles = prefillFunction(grantAccess, 'files');
  const grantAccessToAdminPanel = prefillFunction(grantAccess, 'adminPanel');
  ```

**4. Benutzerdefinierte Logger:**  

Wenn Sie einen Logger haben, der Nachrichten ausgibt, können Sie Partial Application verwenden, um spezielle Logger für verschiedene Log-Level zu erstellen.

   ```javascript
   const logMessage = (level, message) => {
     // Logging-Logik hier
   };
   const logInfo = prefillFunction(logMessage, 'info'); // Loggen von Informationsnachrichten
   const logError = prefillFunction(logMessage, 'error'); // Loggen von Fehlermeldungen
   ```

**5. Bildbearbeitung:**

Wenn Sie eine Bildbearbeitungsfunktion haben, können Sie Partial Application verwenden, um spezielle Funktionen zum Zuschneiden, Skalieren oder Filtern von Bildern mit festgelegten Parametern zu erstellen.

   ```javascript
   const processImage = (image, options) => {
     // Bildbearbeitungslogik hier
   };
   const cropImage = prefillFunction(processImage, { operation: 'crop', width: 300, height: 200 });
   const applyFilter = prefillFunction(processImage, { operation: 'filter', filterType: 'sepia' });
   ```
