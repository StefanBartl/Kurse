
# The Hard Parts of OOP / Will Sentance / Mitte Oktober, 23`

## Content

- [The Hard Parts of OOP / Will Sentance / Mitte Oktober, 23\`](#the-hard-parts-of-oop--will-sentance--mitte-oktober-23)
  - [Content](#content)
  - [Takeaways\]](#takeaways)
  - [`new`-Keyword](#new-keyword)
    - [Unterschied `new` vs. kein `new`](#unterschied-new-vs-kein-new)
  - [class](#class)

## Takeaways]

+ *Object.create():*
```javascript
    userFunctions = {
	sayName: function(){
	    console.log("I'm " + this.name);
	    };
    };

    function userCreator(name, score){
	const newUser = Object.create(userFunctions);
    };
```
Durch `newUser = Object.create(userFunctions)` ist `newUser.__proto__` das *Prototypen-Objekt* der Funktion `userFunctions` mit der zugehörigen `sayName`-Funktion

+ `.call()` und `apply()` führen beide die Funktion, auf die sie angewendet werden, aus, aber mit dem Unterschied, dass Argumente, die ihnen übergeben werden, bei `call(arg1, arg2, ..)` so weitergegebn werden wie sie aufgenommen hat und `apply(arg1, arg2, ...)` bündelt die Argumente in einen Array und übergibt sie dann an die Funktion.
Beide überschreiben ggf. `this.`-Werte!

+

## `new`-Keyword

```javascript
 function userCreator (name, score){
    this.name = name;
    this.score = score;
 };

 userCreator.prototype.sayName = function(){
    console.log("I'm " + this.name);
 };
 
 userCreator.prototype.increment = function(){
    this.score++;
 }

const user1 = new userCreator("Phil", 5);
```
1. Im globalen Speicher wird ein Label `userCreator` angelegt indem dessen Funktionsdeklaration gespeichert wird.
2. Dem Prototypen-Funktionsobjekt von `userCreator` werden die Labels `sayName` und `inrement` mit deren Funktionsdeklarationen als *properties* hinzugefügt.
3. Im globalen Speicher wird ein nicht initilaisiertes (`undefined`) Label `user1` hinzugefügt.
4. Die Funktion `userCreator` wird mit den Argumenten `Phil` und `5` in einem neuen Ausführungskontext (NEC) aufgerufen.
5. Im NEC wird das lokale Label `name` mit dem Wert `Phil` sowie das Lokale Label `score` mit dem Wert `5` im lokalen Speicher gespeichert.
6. Dadurch, dass `userCreator` mit dem `new`-Keyword aufgerufen wird, wird folgendes automatisch vn Javascriipt ausgeführt:
    6.1.Im lokalen Speicher wird ein neues Label `this` gespeichert.
    6.2. Dem `this`-Objekt werden die Lables `name` und `score` mit ihren Werten hinzugefügt.
    6.3. Die `__proto__`-Property des `this`-Objekts wird auf den Prototypen von `userCreator` gerichtet
    6.4. Das `this`-Objekt wird zurückgegeben und dem im globalen Soeicher bisher nicht initialisierten Objekt `user` zugewiesen
*ChatGPT:*
1. Im globalen Speicher wird ein Label userCreator angelegt, das auf die Funktionsdeklaration von userCreator zeigt.
2. Dem Prototyp-Objekt von userCreator werden die Labels sayName und increment hinzugefügt, die auf die entsprechenden Funktionen zeigen.
3. Im globalen Speicher wird eine Variable user1 deklariert, aber sie erhält zu diesem Zeitpunkt den Wert undefined, da sie noch nicht initialisiert ist.
4. Wenn die Funktion userCreator mit new aufgerufen wird, wird ein neuer Ausführungskontext erstellt.
5. Im neuen Ausführungskontext (NEC) werden die Argumente name und score mit den Werten "Phil" und 5 im lokalen Speicher gespeichert.
6. Da userCreator mit new aufgerufen wird, wird ein neues Objekt erstellt, und die this-Referenz wird auf dieses Objekt gesetzt. Die Labels name und score werden diesem Objekt hinzugefügt.
7. Das __proto__-Attribut des erstellten Objekts wird auf den Prototypen von userCreator gerichtet, sodass es auf die Methoden sayName und increment zugreifen kann.
8. Das erstellte Objekt wird als Rückgabewert der userCreator-Funktion zurückgegeben und wird in user1 gespeichert.

### Unterschied `new` vs. kein `new`

Der Unterschied zwischen der Verwendung und dem Weglassen des new-Keywords bei der Verwendung der Funktion userCreator ist entscheidend und beeinflusst das Verhalten der Funktion erheblich.

Verwendung des new-Keywords:

`const user1 = new userCreator("Phil", 5);`
Wenn du die Funktion userCreator mit new aufrufst, wird ein neues Objekt erstellt, und this in der Funktion bezieht sich auf dieses neue Objekt. Die return-Anweisung in der Funktion gibt implizit dieses neue Objekt zurück. Das erstellte Objekt hat Zugriff auf die Methoden und Eigenschaften, die dem Prototypen von userCreator hinzugefügt wurden.

Weglassen des new-Keywords:

`const user2 = userCreator("Alice", 8);`
Wenn du die Funktion userCreator ohne new aufrufst, wird die Funktion normalerweise im aktuellen Kontext ausgeführt. Dies bedeutet, dass this in der Funktion auf das globale Objekt (normalerweise window im Browser oder global in Node.js) verweist. Die return-Anweisung gibt in diesem Fall nichts zurück, oder sie gibt undefined zurück. Das erstellte Objekt hat keinen Zugriff auf die Methoden und Eigenschaften des Prototyps von userCreator, da es nicht über die Verknüpfung mit dem Prototyp verfügt.

Zusammengefasst: Die Verwendung des new-Keywords ist wichtig, um eine Funktion als Konstruktor für die Erstellung von Objekten zu kennzeichnen. Wenn du new verwendest, erstellt die Funktion ein neues Objekt und gibt es zurück. Wenn du es weglässt, kann das Verhalten unerwartet sein, da die Funktion im aktuellen Kontext ausgeführt wird und keine neuen Objekte erstellt werden.

## class

+ Ruft man eine Klasse auf wird die `constructor()` Funktion gecallt und die Argumente in das `this`-Objekt geshrieben

Wenn du eine JavaScript-Klasse erstellst und eine Instanz dieser Klasse erstellst, wird die constructor()-Funktion aufgerufen.

Alle Argumente, die du der Klasse beim Erstellen einer Instanz übergibst, werden in das this-Objekt geschrieben. Das this-Objekt bezieht sich auf die gerade erstellte Instanz der Klasse.

Hier ist ein einfaches Beispiel:

```javascript
Copy code
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const person1 = new Person("Alice", 30);
console.log(person1.name); // "Alice"
console.log(person1.age);  // 30
```
In diesem Beispiel wird die constructor()-Funktion der Person-Klasse aufgerufen, und die übergebenen Argumente ("Alice" und 30) werden in das this-Objekt geschrieben. Dadurch werden die Eigenschaften name und age in der Instanz person1 erstellt.





