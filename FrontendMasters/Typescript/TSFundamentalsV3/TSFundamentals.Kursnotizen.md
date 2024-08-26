# TypeScript Fundamentals, v3 / Mike North, Stripe / Ende August 23'

[Kurswebsite](https://www.typescript-training.com/course/fundamentals-v3/)
[Kurs Repo](https://github.com/mike-north/ts-fundamentals-v3)

- [TypeScript Fundamentals, v3 / Mike North, Stripe / Ende August 23'](#typescript-fundamentals-v3--mike-north-stripe--ende-august-23)
  - [Index Signaturen ✓](#index-signaturen-)
  - [exit](#exit)

## Index Signaturen ✓

In TypeScript ermöglichen Index-Signaturen die Definition von Objektstrukturen, bei denen die Eigenschaftsnamen nicht im Voraus bekannt sind. Mit Index-Signaturen können Sie angeben, welche Arten von Schlüsseln (Eigenschaftsnamen) und welche Datentypen für die dazugehörigen Werte erlaubt sind.

```
interface Dictionary {
  [key: string]: number;
}

const ages: Dictionary = {
  "Alice": 28,
  "Bob": 32,
  "Eve": 21
};

const aliceAge: number = ages["Alice"]; // Hier wird der Wert 28 zurückgegeben
```
```
interface StringDictionary {
  [key: number]: string;
}

const fruits: StringDictionary = {
  1: "Apple",
  2: "Banana",
  3: "Orange"
};

const fruitName: string = fruits[2]; // Hier wird der Wert "Banana" zurückgegeben
```
```
interface ObjectDictionary {
  [key: object]: string;
}

const objectMap: ObjectDictionary = {
  { id: 1 }: "Object 1",
  { id: 2 }: "Object 2",
  { id: 3 }: "Object 3"
};

const objectName: string = objectMap[{ id: 2 }]; // Hier wird der Wert "Object 2" zurückgegeben
```
Es ist nicht möglich gleichzeitig eine Index-Signatur und explizite Eigenschaften in derselben Schnittstelle zu haben:
```
// Fehler: Unzulässig, da es bereits eine explizite Eigenschaft "length" gibt
interface InvalidExample {
  [key: string]: any;
  length: number;
}
```

## exit
