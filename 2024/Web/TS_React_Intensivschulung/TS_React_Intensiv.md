# Typescript & React Intensivsschulung 14.08.-21.08.24 via Zoom

Trainer: Alexander Zeiss

[Classroom; Access-Token: bIGeyh8](https://workshops.de/classroom/4310852928/dashboard)
[Workshop Github](https://github.com/derzeiss/workshopsde-2408)

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


##

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

##

##

##
