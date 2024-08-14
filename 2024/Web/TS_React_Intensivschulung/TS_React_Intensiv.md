# 

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

wenn error nicht gectcthed wird, wir dann das porgramm abgebrohen
