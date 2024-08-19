# Typescript & React Intensivsschulung 14.08.-21.08.24 via Zoom

Trainer: Alexander Zeiss

[Classroom; Access-Token: bIGeyh8](https://workshops.de/classroom/4310852928/dashboard)
[Workshop Github](https://github.com/derzeiss/workshopsde-2408)


## Use

 - Reference Types: `string[]`, `Array<string>`, `ReadonlyArray<string>`
 - `unknown` erfordert entweder Type assertion `zb.: as  ` oder Laufzeitprüfung:
   `if (typeof SomeObj === 'string') { /* Hier hat SomeObj den Typ String anstatt unknown */ }` 



- gerendert, Dependency tree

## Feedback

wäte gu checkpoints fü den code z uaben, bei dne man sich reseten kann

1. Bei Fragen dlänger zum antworten zeit lassen
2. Classroom usw erklären
3. Aufgabenbeschreibung zu schnell, auch wenn sich keiner meldet soll man warten und doppelt angeben (zb.: erste React app)
   1. Die Beispiele langsamer erklären & durchgehen
   2. Zeit für Beispiele
4. Gruppenaustausch?
5. Nachschlagwerke, Docs, Infomaterial anbieten mit dem auch noch nach der Schulung gearbeitet werden kann
6. Deutsche Materialien
7. Wenn du verweist auf die folien "da stand das drinnen" - ch kann als tn nicht dir folgen, die sdlides offen habenm, notizen machen, usw...
8. keine Zeit für notizen
9. Folien mit Grafiken teilweise nur 3 sekunden dann weiter
10. In den Folien hin und her springen ist schwierig

## Offene Fragen

1. **Was passiert, wenn man einen Error wirft, aber kein `catch()` implementiert?**
   Der Error wird dazu führen, dass das Programm abgebrochen wird.
2. Extends & Intersection Type: `type Magazine = Book & {  coverUrl: string; }`
3. 

## Schnell-Tipps

1. Interfaces dürfen nur einmal im Projekt vorkommen, ansonsten werden sie gemerged. Daher vl Interfaces eine eigene datei
2. Funktionstypen for unions of type literals und primitive typen usw.. mit Type Aliases annstatt mit Interfaces
3. 

## Objects: Computed Property Names - Namen von Objekteigenschaften dynamisch zur Laufzeit zu bestimmen

"Computed Property Names" sind ein Feature in JavaScript (und somit auch in TypeScript), das es ermöglicht, die Namen von Objekteigenschaften dynamisch zur Laufzeit zu bestimmen. Dies ist besonders nützlich, wenn man den Namen einer Eigenschaft basierend auf einer Variable oder einem Ausdruck generieren möchte.

### Grundlagen

Normalerweise definiert man eine Eigenschaft eines Objekts so:

```typescript
const obj = {
  key: 'value'
};
```

Hier ist `key` der statische Name der Eigenschaft.

Mit "Computed Property Names" kann man den Namen einer Eigenschaft jedoch dynamisch festlegen, indem man den Namen der Eigenschaft in eckige Klammern `[]` setzt und darin einen Ausdruck oder eine Variable angibt. Der Ausdruck wird ausgewertet, und das Ergebnis wird als Name der Eigenschaft verwendet.

### Beispiel

Angenommen, man hat eine Variable, deren Wert als Name einer Eigenschaft verwendet werden soll:

```typescript
const propName = 'name';

const obj = {
  [propName]: 'John Doe'
};

console.log(obj.name); // Ausgabe: John Doe
```

In diesem Beispiel wird die Variable `propName` in den eckigen Klammern verwendet. Da `propName` den Wert `'name'` enthält, wird das Objekt `obj` eine Eigenschaft mit dem Namen `name` haben.

### Komplexere Beispiele

Man kann auch komplexere Ausdrücke verwenden, um Eigenschaftsnamen zu berechnen:

```typescript
const prefix = 'user';
const id = 42;

const user = {
  [`${prefix}_${id}`]: 'Jane Doe'
};

console.log(user['user_42']); // Ausgabe: Jane Doe
```

Hier wird der Ausdruck `` `${prefix}_${id}` `` verwendet, um den Eigenschaftsnamen `user_42` dynamisch zu erstellen.

### Verwendung in TypeScript

TypeScript unterstützt "Computed Property Names" genauso wie JavaScript, allerdings bietet TypeScript zusätzlich Typensicherheit. Wenn man "Computed Property Names" in TypeScript verwendet, sollte man sicherstellen, dass die resultierenden Eigenschaftsnamen im Typ des Objekts vorgesehen sind, um Typfehler zu vermeiden.

```typescript
type User = {
  [key: string]: string;
};

const dynamicKey = 'email';

const user: User = {
  [dynamicKey]: 'jane.doe@example.com'
};
```

Hier wird der Typ `User` so definiert, dass er eine beliebige Anzahl von string-Eigenschaften haben kann. Der Schlüssel `dynamicKey` wird dann verwendet, um die Eigenschaft `email` dynamisch hinzuzufügen.

### Fazit

"Computed Property Names" sind ein mächtiges Werkzeug, um dynamisch und flexibel mit Objekten in JavaScript und TypeScript zu arbeiten. Sie ermöglichen es, Eigenschaftsnamen zur Laufzeit zu berechnen, was besonders nützlich ist, wenn man mit dynamischen Datenstrukturen arbeitet oder wenn man Eigenschaftsnamen basierend auf Variablen oder Ausdrücken generieren muss.

## Variables: let, const, var

![Variablen](Quellen/Variables.png)

## Shallow Copy

Ja, genau das ist der Kern einer **shallow copy** (flachen Kopie).

### Was ist eine Shallow Copy?

Eine shallow copy eines Objekts kopiert nur die oberste Ebene des Objekts, d. h., die Eigenschaften auf der ersten Ebene des Objekts werden direkt kopiert. Wenn eine dieser Eigenschaften jedoch selbst ein Objekt (oder ein Array) ist, wird **nicht** das gesamte Unterobjekt kopiert, sondern nur die **Referenz** auf dieses Unterobjekt. Dadurch zeigt die Kopie auf dieselben Unterobjekte wie das Original.

### Beispiel mit einem tief verschachtelten Objekt:

Nehmen wir an, du hast folgendes Objekt:

```javascript
let original = {
  level1: {
    level2: {
      value: 42
    }
  }
};
```

Wenn du eine shallow copy dieses Objekts erstellst:

```javascript
let shallowCopy = { ...original };
```

Was passiert hier?

1. **Erste Ebene**: Das Objekt `shallowCopy` hat eine eigene Kopie der Eigenschaften auf der obersten Ebene des Objekts `original`. In diesem Fall wird die Eigenschaft `level1` kopiert.

2. **Zweite und dritte Ebene**: Da `level1` ein Objekt ist, wird **nur die Referenz** auf das Objekt `level1` kopiert. Das bedeutet, dass sowohl `original.level1` als auch `shallowCopy.level1` auf dasselbe Objekt im Speicher zeigen. Daher zeigt `shallowCopy.level1.level2` auch auf dasselbe Objekt wie `original.level1.level2`.

### Auswirkungen

Wenn du also eine Änderung am Objekt auf einer tieferen Ebene vornimmst, wirkt sich dies sowohl auf das Originalobjekt als auch auf die flache Kopie aus, da beide auf dasselbe tieferliegende Objekt verweisen.

Beispiel:

```javascript
shallowCopy.level1.level2.value = 100;

console.log(original.level1.level2.value); // Ausgabe: 100
```

Die Änderung am `value` in der flachen Kopie hat das Originalobjekt beeinflusst, da beide auf dasselbe `level2`-Objekt verweisen.

### Shallow Copy Zusammengefasst:

- **Kopiert nur die oberste Ebene** eines Objekts.
- **Referenzen** auf verschachtelte Objekte oder Arrays werden kopiert, nicht die tatsächlichen Werte.
- Änderungen an verschachtelten Objekten beeinflussen sowohl das Originalobjekt als auch die flache Kopie.

Falls du eine **deep copy** (tiefe Kopie) erstellen möchtest, bei der alle Ebenen des Objekts rekursiv kopiert werden, musst du eine spezielle Technik verwenden, z. B. durch Rekursion oder den Einsatz von Bibliotheken wie `lodash` (mit `_.cloneDeep()`).

### Fazit

Ja, bei einer shallow copy werden nur die Referenzen auf die Objekte der ersten Ebene kopiert, nicht die tieferliegenden Objekte selbst. Das bedeutet, dass die Kopie und das Originalobjekt weiterhin auf dieselben tieferliegenden Objekte verweisen, was bei Änderungen an diesen tieferliegenden Objekten zu unerwartetem Verhalten führen kann, wenn man nicht vorsichtig ist.

## Arrow Function

### Objekt zurückgeben

Verwende runde und geschweifte Klammern, wenn ein Objekt zurückgegeben werden soll:

```javascript
const person = () => ({
 firstName: 'John',
 lastName: 'Doe',
});
```


## Compiler flag: strict

![strict rules](Quellen/strict.png)

### 1. `strictNullChecks`

- **Bedeutung:** Diese Regel bewirkt, dass `null` und `undefined` **nicht** automatisch als gültige Werte für alle Typen akzeptiert werden. In anderen Worten, `null` und `undefined` sind nur gültig, wenn sie explizit im Typ enthalten sind.
- **Beispiel:**
  ```typescript
  let str: string = "hello";
  str = null; // Fehler, wenn `strictNullChecks` aktiviert ist.
  
  let strOrNull: string | null = "hello";
  strOrNull = null; // Korrekt, da der Typ `string | null` zulässt.
  ```

### 2. `strictPropertyInitialization`

- **Bedeutung:** Diese Regel stellt sicher, dass alle Eigenschaften einer Klasse ordnungsgemäß initialisiert werden, bevor sie verwendet werden. Das bedeutet, dass jede nicht-`undefined`-Eigenschaft im Konstruktor initialisiert oder mit einem Standardwert versehen werden muss, es sei denn, die Eigenschaft wird als optional (`?`) markiert.
- **Beispiel:**
  ```typescript
  class Person {
      name: string;
      age: number; // Fehler: `age` wird nicht im Konstruktor initialisiert.

      constructor(name: string) {
          this.name = name;
      }
  }
  
  class PersonCorrect {
      name: string;
      age: number;

      constructor(name: string, age: number) {
          this.name = name;
          this.age = age; // Korrekt, `age` wird initialisiert.
      }
  }
  ```

### 3. `strictFunctionTypes`

- **Bedeutung:** Diese Regel verschärft die Überprüfung der Kompatibilität von Funktionssignaturen. Konkret bedeutet dies, dass TypeScript sicherstellt, dass Funktionen, die als Typen verwendet werden, kompatibel sind, indem es die Parameter- und Rückgabewerte strikter überprüft.
- **Beispiel:**
  ```typescript
  type Func = (a: number) => void;
  let func1: Func = (a: number) => {}; // Korrekt.
  let func2: Func = (a: string) => {}; // Fehler, da `a` ein `number` sein sollte.
  ```

### 4. `strictBindCallApply`

- **Bedeutung:** Diese Regel stellt sicher, dass die Methoden `bind`, `call` und `apply` korrekt verwendet werden. Wenn man `bind`, `call` oder `apply` auf eine Funktion anwendet, stellt TypeScript sicher, dass die übergebenen Argumente den Typen der ursprünglichen Funktionssignatur entsprechen.
- **Beispiel:**
  ```typescript
  function add(a: number, b: number): number {
      return a + b;
  }

  let addBound = add.bind(null, 10);
  addBound("20"); // Fehler: `20` ist kein `number`.
  
  addBound(20); // Korrekt.
  ```

## Nullish Coalescing Operator (`??`)

Der **Nullish Coalescing Operator (`??`)** ist ein spezieller Operator in JavaScript, der in der Version ECMAScript 2020 (ES11) eingeführt wurde. Dieser Operator wird verwendet, um einen Ausdruck auf `null` oder `undefined` zu prüfen und einen Fallback-Wert zurückzugeben, wenn der Ausdruck `null` oder `undefined` ist.

### Syntax und Funktionsweise

```javascript
let result = expression1 ?? expression2;
```

- **`expression1`**: Der erste Ausdruck, der ausgewertet wird.
- **`expression2`**: Der zweite Ausdruck, der zurückgegeben wird, wenn `expression1` `null` oder `undefined` ist.

Der Operator `??` funktioniert so, dass er `expression1` zurückgibt, wenn dieser Wert weder `null` noch `undefined` ist. Ist `expression1` jedoch `null` oder `undefined`, wird `expression2` zurückgegeben.

### Beispiel:

```javascript
let name = null;
let defaultName = "John Doe";

let displayName = name ?? defaultName;
console.log(displayName); // Ausgabe: "John Doe"
```

In diesem Beispiel ist `name` auf `null` gesetzt. Der Nullish Coalescing Operator prüft, ob `name` `null` oder `undefined` ist. Da `name` `null` ist, wird `defaultName` als Fallback-Wert verwendet, und "John Doe" wird in `displayName` gespeichert.

### Unterschiede zu anderen Operatoren

Der Nullish Coalescing Operator ähnelt dem **logischen OR-Operator (`||`)**, aber es gibt wichtige Unterschiede:

- **`||`-Operator:**
  Der logische OR-Operator gibt den ersten "truthy" Wert zurück. Das bedeutet, dass er auch bei Werten wie `0`, `false`, `NaN`, `''` (leere Zeichenfolge) den zweiten Ausdruck zurückgibt, da diese als "falsy" gelten.

- **`??`-Operator:**
  Der Nullish Coalescing Operator gibt den ersten Wert zurück, es sei denn, er ist `null` oder `undefined`. Er ignoriert andere "falsy" Werte wie `0`, `false`, `NaN`, `''`.

### Vergleich von `??` und `||`

**Beispiel mit `||`:**

```javascript
let count = 0;
let defaultCount = 5;

let finalCount = count || defaultCount;
console.log(finalCount); // Ausgabe: 5
```

In diesem Fall gibt der `||`-Operator `defaultCount` zurück, weil `0` als "falsy" betrachtet wird, obwohl `count` nicht `null` oder `undefined` ist.

**Beispiel mit `??`:**

```javascript
let count = 0;
let defaultCount = 5;

let finalCount = count ?? defaultCount;
console.log(finalCount); // Ausgabe: 0
```

Hier gibt der Nullish Coalescing Operator `count` zurück, weil `0` zwar "falsy", aber nicht `null` oder `undefined` ist.

### Anwendung

Der Nullish Coalescing Operator ist besonders nützlich, wenn Sie nur `null` oder `undefined` abfangen möchten, aber `0`, `false`, oder leere Zeichenfolgen als gültige Werte beibehalten möchten.

### Beispielanwendung:

```javascript
function getUserName(user) {
    return user.name ?? "Anonymous";
}

let user1 = { name: "Alice" };
let user2 = { name: "" };
let user3 = { name: null };

console.log(getUserName(user1)); // Ausgabe: "Alice"
console.log(getUserName(user2)); // Ausgabe: "" (leere Zeichenfolge bleibt bestehen)
console.log(getUserName(user3)); // Ausgabe: "Anonymous"
```

In diesem Beispiel wird `user.name` verwendet, wenn es nicht `null` oder `undefined` ist. Falls `user.name` jedoch `null` oder `undefined` ist, wird "Anonymous" zurückgegeben.

### Fazit

Der Nullish Coalescing Operator `??` ist ein nützliches Werkzeug, um auf `null` und `undefined` zu prüfen und standardmäßige Fallback-Werte anzugeben, ohne andere "falsy" Werte wie `0` oder `false` zu beeinflussen. Dies macht ihn zu einem wertvollen Operator in Situationen, in denen solche Unterscheidungen wichtig sind.

## `.bind`

In TypeScript (und JavaScript) ist die Methode `bind` dazu da, eine Funktion an einen bestimmten Kontext (`this`) zu binden und eventuell auch einige der Parameter vorab festzulegen. Hier ist eine Erklärung, wie das mit `null` funktioniert:

### Erklärung des Codes

```typescript
function add(a: number, b: number): number {
    return a + b;
}

let addBound = add.bind(null, 10);
addBound(20); // Funktioniert korrekt
```

#### Was passiert hier?

1. **`bind` und `this`-Kontext**: 
   - Die erste Argumente von `bind` legt den Wert von `this` für die gebundene Funktion fest. Wenn `null` als erster Parameter übergeben wird, bedeutet das, dass kein spezieller `this`-Kontext festgelegt wird. Der `this`-Kontext wird in diesem Fall als `null` behandelt, was in den meisten Fällen bedeutet, dass `this` entweder auf den globalen Kontext (z.B. `window` in einem Browser) oder `undefined` gesetzt wird, wenn `strict mode` aktiv ist.

2. **`bind` und feste Parameter**: 
   - Die nachfolgenden Argumente (`10` in diesem Fall) werden als feste Argumente für die gebundene Funktion festgelegt. In diesem Beispiel wird `a` auf `10` gesetzt.
   - Die gebundene Funktion (`addBound`) erwartet daher nur noch den zweiten Parameter (`b`), da `a` bereits auf `10` festgelegt wurde.

### Wird `null` ersetzt?

- **`this`-Kontext:** In diesem Beispiel spielt der `this`-Kontext keine Rolle, weil die `add`-Funktion den `this`-Kontext nicht verwendet. Daher wird das `null`, das an `bind` übergeben wird, nicht in der Funktion selbst verwendet oder ersetzt.
  
- **Gebundene Parameter:** Wenn man die gebundene Funktion `addBound` aufruft, gibt man nur die verbleibenden Argumente an. Im Beispiel `addBound(20);` wird `20` als das zweite Argument (`b`) verwendet, da das erste Argument (`a`) bereits auf `10` festgelegt ist.

```typescript
// Der ursprüngliche Aufruf von `add`
add(10, 20); // ergibt 30

// Der Aufruf von `addBound` nach dem Binden
addBound(20); // ergibt ebenfalls 30
```

### Was passiert bei `addBound("20")`?

In Ihrem Beispiel:

```typescript
addBound("20"); // Fehler in TypeScript
```

- **TypeScript**: Da `addBound` erwartet, dass der Parameter `b` eine Zahl (`number`) ist, führt die Übergabe einer Zeichenkette (`"20"`) zu einem Typfehler in TypeScript. Dies ist ein Feature von TypeScript, das Typensicherheit bietet.
  
- **JavaScript**: In reinem JavaScript würde `"20"` in eine Zahl konvertiert, und die Funktion würde trotzdem funktionieren und `30` zurückgeben, weil JavaScript die Typen automatisch konvertiert.

### Zusammenfassung

Das `null`, das bei `bind` übergeben wird, bezieht sich auf den `this`-Kontext und wird nicht durch einen Wert ersetzt. Die gebundenen Parameter (z.B. `10`) bleiben fest, und alle weiteren Argumente, die beim Aufruf der gebundenen Funktion übergeben werden, vervollständigen die Argumentliste. In TypeScript muss man darauf achten, dass die Typen der übergebenen Argumente den erwarteten Typen entsprechen, sonst gibt es einen Fehler.

## Non-Null Assertion Operator

A new ! post-fix expression operator may be used to assert that its operand is non-null and non-undefined in contexts where the type checker is unable to conclude that fact. For example:

```typescript
// Compiled with --strictNullChecks
function validateEntity(e?: Entity) {
    // Throw exception if e is null or invalid entity
}

function processEntity(e?: Entity) {
    validateEntity(e);
    let a = e.name;  // TS ERROR: e may be null.
    let b = e!.name;  // OKAY. We are asserting that e is non-null.
}
```

Note that it is just an assertion, and just like type assertions you are responsible for making sure the value is not null. A non-null assertion is essentially you telling the compiler "I know it's not null so let me use it as though it's not null".

##
