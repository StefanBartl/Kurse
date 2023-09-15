# wkd sicpjs notizen 

## Algemein

Über Elemente, die in jeder modernen Sprache vorkommen:

- Zahlen und arithmetische Operationen sind primitive Daten und Funkionen
- Durch die Verschachtelung von Kombinationen können Operationen kombiniert werden.
- Konstante Deklarationen, die Namen mit Werten verknüpfen, bieten eine begrenzte Möglichkeit der Abstraktion.

## Kapitel 1

### Ausdrücke

Ein Ausdruck (en.: expression) steht in Javascript in einer KLammer () und wird vom Interpreter stets ausgewertet. Hat man zwei Ausdrücke, werden diese gegeneinander ausgewertet.

Beispiele:
    (x+1)(5)
=   6
oder 
    (x => x+1)(2) == 3
= true
oder 
    (x => x+1)(2) == 6
= false

Wie hier sichtbar ist können auch lambda-Ausdrücke in Ausdrücken als Werte benutzt werden.

### Zusammengesetzte Funktionen

Eine Funktionsdeklaration ist eine hervorragend Möglichkeit zur Abstraktion, bei der man einer zusammengesetzten Funktion einen Namen gibt und sie dann als Einheit referenziert.
Dabei werden zwei verschiedene Operationen kombiniert: Dei Erstellung der Funktion sowie die Zuweisung zu einem Namen. Es ist sowohl möglich Funktionen ohne Namen zu erstellen als auch säter einen Namen zuzuweisen. Der Name einer Funktion ist ein Symbol, welches in der Programmumgebung (Environment) mit der Funktionsdefinition assoziiert wird. Die Parameter sind im Funktionskörper referenzierbare Namen für übergebene Argumente. Das Aufrufen einer Funktion wird Funktionsanwendung genannt.

### Lexical Scoping

Im Funktionskörper (eine Blockstruktur) gelten initiierte Variablen, auch übergebene Argumente, als deklariert und können daher auch in Kinds-Funktionen verwendet werden:

function sqrt(x) {
    function is_good_enough(guess) {
        return abs(square(guess) - x) < 0.001;
    }
    function improve(guess) {
        return average(guess, x / guess);
    }
    function sqrt_iter(guess) {
        return is_good_enough(guess)
            ? guess
            : sqrt_iter(improve(guess));
    }
    return sqrt_iter(1);
}

Der Wert des Arguments x gilt im gesamten Funktionskörper. Dies wird "lexical scoping" genannt.

### Iterative vs Rekursive Prozesse
S. 27 - 30

#### Rekursive Faktorialfunktion:

function factorial(n) {
    return n === 1
    ? 1
    : n * factorial(n - 1);
}

##### Linearer rekursiver Prozess im Interpreter:

factorial(6)
6 * factorial(5)
6 * (5 * factorial(4))
6 * (5 * (4 * factorial(3)))
6 * (5 * (4 * (3 * factorial(2))))
6 * (5 * (4 * (3 * (2 * factorial(1)))))
6 * (5 * (4 * (3 * (2 * 1))))
6 * (5 * (4 * (3 * 2)))
6 * (5 * (4 * 6))
6 * (5 * 24)
6 * 120
720

#### Iterative Faktorialfunktion(en):

function factorial(n) {
    return fact_iter(1, 1, n);
}

function fact_iter(product, counter, max_count) {
    return counter > max_count
    ? product
    : fact_iter(counter * product,
counter + 1,
max_count);
}

##### Linearer iterativer Prozess im Interpreter:

factorial(6)
fact_iter(1, 1, 6)
fact_iter(1, 2, 6)
fact_iter(2, 3, 6)
fact_iter(6, 4, 6)
fact_iter(24, 5, 6)
fact_iter(120, 6, 6)
fact_iter(720, 7, 6)
720

#### Erklärung

Der rekursive Prozess wächst und schrumpft, es bildet sich eine Kette von Unterprozessen die abgearbeitet werdne müssen. Der iterative Prozess hingegen wächst oder schrumpft nicht, stoppt man diesen Prozess an einer Stelle kann man den aktuellen Wert auslesen. Generell gilt bei iterativen auch, Prozessen, dass man den Zustand (state) der Variablen aktuell hält, damit man diese dann zum Weiterlaufen dem Interpreter übergeben kann. Dies geht im rekursiven Prozess beides nicht, es ist sozusagen eine "verteckte Information" im Interpreter (und nicht im Zustand der Variablen), zu der wir keinen Zugang haben. Dies bedeutet auch: Umso länger die Kette, umso größer die Informationsmenge, die der Interpreter zu 'pflegen' hat.  
Die Anzahl der auszuführenden Operationen steigen proportional zu n, deswegen können beide Funktionen "linear" genannt werden.


### Funktionen

S.54.: In Javascript gibt es unterschiede in der Behandlung des Interpreter bezüglich Funktionen: Eine Funktionsdeklaration ( zb.: function Adding(){} ) wird automatisch an den
Beginn des ihr umgebenden Blocks oder an den Beginn des Programms (wenn in keinem Block eingebettet) verschoben (hoisting). 
Eine Konstanten-Deklaration ( zb.: const Adding = () => {} ) nicht. Weiters können Namen, die bei benannten Funktionsdeklarationen vergeben wurden neu vergeben werden,
bei Namen die bei einer Konstanten-Deklaration vergeben wurden nicht.

#### Lambda-Ausdrücke, Lambda-Funktionen und Arrow-Funktionen

Generell werden lambda-Ausdrücke verwendet um Funktionen auf die gleiche Weiße wie Funktionsdeklarationen zu erstellen, nur mit den Unterschieden, dass kein Name spezifiziert wird
und das return Schlüsselwort sowie die geschwungenen Klammern weggelassen werden können.
Die resultierende Funktion ist genau so eine Funktion als hätte man eine Funktionsdeklaration vorgenommen, sie ist nur nicht mit einem Namen in der Programmumgebung assoziert.
Beispiel:
    function plus4(x){
        return x + 4;
    }
ist dasselbe wie
    const plus4 = x => x + 4;

Man liest:
                 x                      =>                         x              +     4;
Die Funktion des Arguments x    welches resultiert aus    den Werten aus x      plus    4
.
    ((x, y, z) => x + y + square(z))(1, 2, 3);
= 12

Der "arrow" => hat eine niedrigere Priorität als die Funktionsanwendung und daher sind die Klammern rund um den Lambda-Ausdruck hier notwendig.

#### Arrow-Funktionausdrücke [^arr] ###

+ Arrow-Funktionen haben keine eigene Bindungen (bindings) zu ***this***[^arr_01]
, ***arguments***[^arr_02]
oder ***super***[^arr_03]

+ Sie sollten nicht als Methoden verwendet werden.

+ Sie können nicht als ***constructor*** verwendet werden (Aufruf mit ***new*** wirft einen ***TypeError*** und haben daher auch keinen Zugang zum ***new.target*** Schlüsselwort).

+ Arrow-Funktionen können ***yield*** nicht im Funktionskörper verwenden und können nicht als Generator-Funktionen erstellt werden.

[^arr]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[^arr_01]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
[^arr_02]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
[^arr_03]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super

### Verwendung von ***const*** zur Erstellung lokaler Namen (in Arrow-Funktionen)
S.55

function f(x, y) {
    function f_helper(a, b) {
        return x * square(a) + y * b + a * b;
    }
    return f_helper(1 + x * y, 1 - y);
}

kann in einem Lambda-Ausdruck mit Arrow-Funktion geschrieben werden um die lokalen Namen zu binden und einen einzigen Funktionsinternen Aufruf im Körper zu bekommen:

function f_2(x, y) {
    return ( (a, b) => x * square(a) + y * b + a * b)(1 + x * y, 1 - y);
}
Die Variablen in der Arrow-Funktion werden durch die Werte (teils der Parameter) im rechten Ausdruck ersetzt. 
Gewöhnlicherweiße benutzt man Konstanten-Deklaration um denselben Effekt zu erreichen:

function f_3(x, y) {
    const a = 1 + x * y;
    const b = 1 - y;
    return x * square(a) + y * b + a * b;
}

***const*** Variablen haben den umgebenden Block als Geltungsbereich, sind also nicht global.

### Bedingte Anweisungen (en.: conditional statements)

Die generelle Form von bedingten Anweisungen lautet:
if (Prädikat) { Konsequenz(-Ausdruck) } else { Alternativ-Ausdruck }
Der Interpreter wertet das Prädikat aus. Bei ***true*** wird der Konsequenz-Ausdruck sequentiell ausgewerter, ansonsten das Alternativ-Ausdruck. Die Auswertung eines ***return***-Ausdrücke springt aus der umgebenden Funktion heraus und ignoriert nachfolgende bedingte Ausdrücke. Konstanten-Deklarationen (Namen) innerhalb eines Ausdrucks besitzen jeweils einen lokalen Geltungsbereich, da sie von einer geschwungenen Klammer umgeben sind.

### Funktionen als zurückgegebene Werte (en.: returned values)

Im Allgemeinen unterliegen Programmiersprachen Einschränkungen hinsichtlich der Art und Weise, wie sie ausgeführt werden. Elemente können manipuliert werden und jene  mit den geringsten Einschränkungen
besitzen First-Class-Status. Einige der „Rechte und Privilegien“ von First-Class-Elementen:

+ Sie können mit einem Namen referenziert werden
+ Sie können als Argumente an Funktionen übergeben werden
+ Sie können als Ergebnisse von Funktionen zurückgegeben werden
+ Sie können in Datenstrukturen inkludiert werden

JavaScript gewährt, wie andere höhere Programmiersprachen, zunächst die Funktionen  vollständigen First-Class-Status. Dies stellt eine effiziente Umsetzung vor Herausforderungen, der Gewinn an Ausdruckskraft ist jedich enorm.


## Kapitel 2

### Datenabstraktion
S.72

Zusammengesetzte Daten und Datenabstraktion sind Analogien. Datenabstraktion ist eine Methode, die eine Isolierung von der Anwendung von zusammengesetzten Datenobjekten und ihrer Konstruktion durch primitive Datenobjekte ermöglicht.

Programme sollte Daten so verwenden, dass keine Annahmen über die Daten getroffen werden, die nicht für die Ausführung der jeweiligen Aufgabe unbedingt erforderlich sind. Gleichzeitig wird eine „konkrete“ Datendarstellung unabhängig von den Programmen definiert, die die Daten verwenden. Die Schnittstelle zwischen dieser beiden Teile sind eine Reihe von Funktionen, die durch Selektoren und Konstruktoren implementiert sind.

### Currying
S.90

Eine Higher-Order- Funktion muss nicht unbedingt mehrere Parameter besitzen, man kann Parameter Stück für Stück übergeben - dies nennt man 'currying'. Nehmen wir als Beispiel die simple Funktion ***function plus(x, y){ return x + y; }***
Wir könnten sie auch curryin'n:

function plus_curried(x){
    return y => x + y;
}

Ruft man diese auf:

plus_curried(5);
Interpreter: return y => x + y;

bekommt man vom Interpreter bloß die Arrow-Funktion ***y => x + y;*** ausgegeben. Der zurückgegebenen Arrow-Funktion fehlt das Argument ***y***, um die gedachte Operation auszuführen. Möchten wir zum Argument ***x*** mit dem Wert ***5*** einen Wert hinzuzählen - also das Argument ***y*** der Arrow-Funktion übergeben, ist dies wie folgt zu tun:

plus_curried(5)(7);
Interpreter: 12

Obwohl das etwas konterintuitiv ist, lässt es sich leicht erklären: Man könnte denken, man führt zwei Funktionsaufrufe aus, dies ist aber nicht der Fall. ***plus_curried()*** wird mit dem Argument ***x = 5*** aufgerufen und und der Wert ***5*** wird in die den Funcktionskörper der Arrow-Funktion an Stelle der Variable ***x*** eingesetzt. Die Arrow-Funktion wird nun mit

y => 5 + y;

returned wobei ***y der Wert ist, der durch 5 + y zusammengesetzt ist*** . Nun wird als ***y*** das Argument aus dem zweiten Klammernpaar ersetzt und die Addition ist vollständig.
Dieses ***currying***  kann man beliebig oft machen:

function plus_2_curried(x){
    return y => z =>  x + y + z;
}
plus_2_curried(5)(7)(3)


## Kapitel 3: Modularität, Objekte & Zustand (en.: state)
S.190

Ein Objekt hat in der Welt des Programmierens ***'state'***, also einen 'Zustand', wenn sein Verhalten von seiner Geschichte/Vergangenheit beeinflusst wird. Wir können Aussagen über den Zustand eines Objektes treffen, wenn eine oder mehrere ***state variables*** genug Information über dessen Vergangenheit halten. In Systemen mit vielen Objekten beeinflussen diese sich gegenseitig durch Interaktionen. Es ist zu empfehlen, dass die ***state variables*** eines Systems nah zueinander gruppiert werden, während diese wiederum so locker wie möglich zu anderen Sub-Systemen gehalten werden.

Variablendeklarationen mit ***let*** sind im Gegensatz zu selbigen mit ***const*** veränderbar (en.: mutable) und können so fü ***state-Variablen*** eingesetzt werden. Als einfaches Beispiel könnte man hier eine Funktion ***withdraw()*** nennen, der man einen Zahlenwert übergibt. Die Funktion würde diesen Wert von einem Kontostand ***balance*** abziehen. Dazu muss ***balance*** veränderbar sein. 
In diesem Beispiel wäre jedenfalls wichtig, dass ***balance*** eine ***local state variable*** ist, also innerhalb der Funktion withdraw() deklariert ist, denn ansonsten könnte von überall aus dem Programm auf ***balance*** zugegriffen und diese manipuliert werden. Man sagt auch die Variable wird ***gekapselt (en.: encapsulated)*** Ein Funktionsbeipiel findet man auf S.193.







### Variablendeklarationen (en.: variable declarationa) vs. Zuweisungsausrücke (en.: Assignment expressions) vs. Ausdrücke (en.: expressions)

Variablendeklarationen:
const name = value; ***oder*** let name = value;

Zuweisungausdruck:
name = 'Tom'; ***oder*** age = 33;

Ausdrücke:
expression_1 === expression_2

Während bei Variablendeklarationen und Zuweisungausdrücken der Wert der Zuweisung zugewießen wird (value -> name ***oder*** 33 -> age), werden Ausdrücke der obigen Form zu ****true*** oder ***false*** evaluiert, je nachdem ob die linke und rechte Seite sich gleichen.



## Bada-Peng-Bada-Ping-Bada-Boom

### In Javascript sind Funktionen sind Objekte

function konto(kontostand){let konto = kontostand; return abbuchung => konto - abbuchung}
undefined
const konto1 = konto(100)
undefined
const konto2 = konto(200)
undefined
konto1(50)
50
konto2(50)
150

Hier wird gezeigt, dass jede Funktion ein eigenes Objekt ist und eigene Instanzen erzeugen kann (hier, da sie zu Variablen zugewiesen wurde). Die Variable ***konto*** ist eine ***local state Variable*** und hängt initial vom Argument ***kontostand*** ab. ***abbuchung*** in der zurückgegebenen Arrow-Funktion ist der Parameter für die Berechnungen in den Aufrufen konto1() und konto2().




## Exercises

### Kapitel 1

Antwort 1.5: Der Interpreter mit der "applicative-order evaluation" würde alle Funktionen nach dem Funktionsaufruf zuerst so auswerten, dass Werte zur weiteren Evaluation bereitstehen. In diesem Fall ist die function p() {return p();} aber eine Endloschleife und der Interpreter müsste daher ein Fehlverhalten zeigen. Der zweite Interpreter mit der "normal-order evaluation" würde 0 zurückgeben, da beim Aufruf das Argument x mit dem Wert 0 übergeben wurde.

S.58: Antwort zu 1.43: Die Funktionsanwendung f(f) würde dazu führen, dass (2)(2) zurückgebeben werden müsste. Dies ist aber nicht möglich, da eine Evaluation nicht möglich ist und zu einen Interpreter-Error führt. (zusammengefasst "Der Aufruf auf diesen Nummer ist nicht möglich / This call to type number is not possible).   

### Kapitel 2
