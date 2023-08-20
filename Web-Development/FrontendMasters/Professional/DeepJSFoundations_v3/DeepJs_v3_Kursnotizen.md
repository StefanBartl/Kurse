# Deep Javascript Foundations v3 / Kyle Simpson, Teacher &  Autor "You dont know JS", getify / Mitte August, 23'

+ Object.is(item1, item2); // Gibt == zurück: Unterschied zu === ist, dass es -0 und +0 als gleich und NaN zu NaN als ungleich zurück gibt.
+ Bei Verwendung von `new` vor String(), Number() oder Boolean() wandelt man einen primitiven Datentyp in ein Objekt um, was zu unnötigen Overhead führt.
+ Mit `Object.prototype.toString = "Was ich will"` kann man den 'String Tag' von Objekten überschreiben, welcher normalerweiße [object Object] ist. Geht mit alle Typen.



## ToPrimitive

ToPrimitive() ist eine Methode in JavaScript, die aufgerufen wird, wenn ein Objekt in einen primitiven Wert (z. B. eine Zahl, eine Zeichenkette oder einen booleschen Wert) umgewandelt werden muss. Dieser Vorgang wird auch als "Typumwandlung" oder "Type Coercion" bezeichnet. Die ToPrimitive()-Methode wird verwendet, wenn ein Operator oder eine Funktion erwartet, dass ein Objekt als primitiver Wert verwendet wird.

Die ToPrimitive()-Methode kann auf drei verschiedene Arten aufgerufen werden:

+ ToPrimitive(hint): Hierbei wird die Methode mit einem Hinweis (hint) aufgerufen, welcher angibt, in welchen primitiven Typ das Objekt umgewandelt werden soll (z. B. "number", "string" oder "default"). Je nach Hinweis wird das Objekt entsprechend umgewandelt.

+ ToPrimitive(hintNumber): Dies ist eine spezielle Form des Aufrufs, bei dem das Objekt explizit in einen primitiven Wert vom Typ "Number" umgewandelt werden soll.

+ ToPrimitive(hintString): Ebenso ist dies eine spezielle Form, bei der das Objekt explizit in einen primitiven Wert vom Typ "String" umgewandelt werden soll.

Das Verhalten der ToPrimitive()-Methode variiert je nachdem, um welche Art von Objekt es sich handelt:

Bei benutzerdefinierten Objekten kann das Verhalten durch die Implementierung von Methoden wie valueOf() und toString() gesteuert werden. Diese Methoden werden aufgerufen, um den primitiven Wert basierend auf dem angegebenen Hinweis zu generieren.

Bei den meisten eingebauten JavaScript-Objekten gibt es bereits Standardverhalten für ToPrimitive(). Zum Beispiel ruft Number(obj) die valueOf()- und toString()-Methoden in einer bestimmten Reihenfolge auf, um einen primitiven Wert zu erhalten.

```
let obj = {
  valueOf: function() {
    return 42;
  },
  toString: function() {
    return "Hello";
  },
  [Symbol.toPrimitive]: function(hint) {
    if (hint === "number") {
      return 123;
    }
    if (hint === "string") {
      return "Custom String";
    }
    if (hint === "boolean") {
      return true;
    }
    return "Default Value";
  }
};

console.log(obj + 10); // Hier wird valueOf mit "hint: number" aufgerufen
console.log(obj + " World"); // Hier wird toString mit "hint: string" aufgerufen
console.log(String(obj)); // Hier wird Symbol.toPrimitive mit "hint: string" aufgerufen
console.log(Number(obj)); // Hier wird Symbol.toPrimitive mit "hint: number" aufgerufen
console.log(Boolean(obj)); // Hier wird Symbol.toPrimitive mit "hint: boolean" aufgerufen
console.log(obj ? "Truthy" : "Falsy"); // Hier wird Symbol.toPrimitive mit "hint: boolean" aufgerufen
```

In diesem Beispiel ist eine Methode mit dem Symbol Symbol.toPrimitive hinzugefügt. Diese Methode wird aufgerufen, wenn eine Umwandlung in einen primitiven Wert eines beliebigen Typs erforderlich ist. Je nach Hinweis (hint) wird die Methode entsprechend implementiert, um verschiedene primitiven Werte zurückzugeben.

In den console.log()-Anweisungen werden verschiedene Arten von Typumwandlungen demonstriert, einschließlich Zahlenumwandlung, Zeichenkettenumwandlung und boolesche Umwandlung. Je nach Verwendungszweck wird die entsprechende Methode aufgerufen, um den geeigneten primitiven Wert zu liefern.

### Symbol

In JavaScript ist Symbol ein spezieller primitiver Datentyp, der mit ECMAScript 6 (ES6) eingeführt wurde. Ein Symbol ist ein eindeutiger und unveränderlicher Wert, der oft zur Erstellung nicht-aufzählbarer Eigenschaften in Objekten verwendet wird. Im Wesentlichen handelt es sich um eine Art Schlüssel, der eindeutig ist und dazu verwendet werden kann, auf Eigenschaften in Objekten zuzugreifen.


+ Eindeutigkeit: Jedes erstellte Symbol ist eindeutig. Das bedeutet, dass zwei Symbol-Werte niemals gleich sind, auch wenn sie denselben Namen haben.

+ Nicht-aufzählbare Eigenschaften: Symbol-Eigenschaften sind standardmäßig nicht aufzählbar, was bedeutet, dass sie in for...in-Schleifen oder bei der Verwendung von Object.keys() nicht auftauchen. Dies macht sie geeignet für spezielle Eigenschaften, die im Hintergrund verwendet werden sollen.

+ Globale Symbol-Registry: Um die Eindeutigkeit von Symbol-Werten sicherzustellen, gibt es eine globale Symbol-Registry, in der Symbole erstellt und wiederverwendet werden können.

+ Symbol-Eigenschaften: Sie können Symbol-Werte als Schlüssel für Eigenschaften in Objekten verwenden. Dies ist nützlich, um private Eigenschaften oder spezielle Verhaltensweisen zu implementieren.

```
// Eindeutige Symbole erstellen
const symbol1 = Symbol("description");
const symbol2 = Symbol("description");

console.log(symbol1 === symbol2); // false

// Ein Objekt mit einer Symbol-Eigenschaft
const myObject = {
  [symbol1]: "This is a symbol property"
};

console.log(myObject[symbol1]); // Zugriff auf die Symbol-Eigenschaft
```

In diesem Beispiel werden zwei eindeutige Symbole symbol1 und symbol2 erstellt. Obwohl beide Symbole denselben Beschreibungstext haben, sind sie nicht gleich. Dann wird ein Objekt myObject erstellt, das eine Eigenschaft mit dem Symbol symbol1 verwendet. Der Zugriff auf diese Eigenschaft erfolgt durch Verwendung des Symbols als Schlüssel. Da Symbol-Eigenschaften standardmäßig nicht aufzählbar sind, werden sie nicht in for...in-Schleifen angezeigt.






