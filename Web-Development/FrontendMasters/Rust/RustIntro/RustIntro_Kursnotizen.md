 Introduction to Rust / Richard Feldman (NoRedInk) / Ende August, 23' 

[Kurse Repo](https://github.com/rtfeldman/rust-1.51-workshop)
[Kurse-Website](https://rtfeldman-rust-workshop.netlify.app/)

## Takeaways

+ *struct*, *tuple* und *array* sind in Rust aus Memory-Ebene genau das gleiche, es gibt nur verschiedene Regeln für ihre Benutzung.  Sie haben keinen Overhead-Kosten im Speicher.
    + Tuples und struct haben die selbe Funktion, structs kann man die Werte labeln


## Enums

Enums sind ein Datentyp, der verschiedene Werte hält -> 
```
enum Huhu {
    x,
    CustomStruct{red: u8, blue: i8},
    CostumStruct(u8);
}
let one: Huhu = Huhu::x;
let two: Huhu = Huhu::CustomStruct{ red: 100, blue: 30 };
let three: Huhu = Huhu::CustomTuple{ 100 };
```
'two' und 'three' sind gleich, es ist Geschmackssache ob man das mit einem 'struct' oder mit 'tuple' macht.

## Pattern Matching

```
let amsth = match one {
    Huhu::x => {
        println!('irgendwas');
    }
    Huhu::CustomStruct{red, blue} => {
        println!("{}{}", red, blue);
    }
    _ => {
        println!('anderes');
    }
}
```
Bei 'match' müssen alle Varianten bearbeitet werden. Hier haben wir CustomTuple ausgelassen, aber mit _ abgefangen.
+ `_` ist ein sg. 'catch all pattern' und  bedeutet in Rust -> ich matche alles


## Error

+ 'use after move'-Error lässt sich in 9 von 10 Fällen mit .clone() beheben, was jedoch Performancekosten hat


