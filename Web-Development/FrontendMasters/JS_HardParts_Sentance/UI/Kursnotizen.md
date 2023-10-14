# The Hard Parts of UI Development / Will Sentance / Mitte Oktobter, 23`

[Course Slides](https://static.frontendmasters.com/assets/courses/2023-06-20-hard-parts-ui-dev/hard-parts-ui-dev-slides.pdf)
[Course Exercises](https://github.com/UIHP-Challenges/UIHP-Challenges-April23)

- [The Hard Parts of UI Development / Will Sentance / Mitte Oktobter, 23\`](#the-hard-parts-of-ui-development--will-sentance--mitte-oktobter-23)
  - [Takeaways](#takeaways)
  - [WebIDL](#webidl)
  - [WebCore](#webcore)
  - [Browser vs. Javascript Runtime](#browser-vs-javascript-runtime)
  - [DOM](#dom)
    - [Shadow DOM](#shadow-dom)
    - [Virtual DOM](#virtual-dom)

## Takeaways

[JS Fiddle](https://jsfiddle.net/)

- *DOM-Elemente* anwählen und verändern: Wenn man `let test = document.querySelector('div')` verwendet, erstellt man eine Variable, die auf ein *DOM-Element* verweist. `document` repräsentiert die Browser-Runtime-Darstellung der *HTML*-Seite, und `querySelector` ist eine Methode, die es ermöglicht, ein bestimmtes *HTML-Element* im *DOM* auszuwählen. Die Variable `test` ist ein *JavaScript-Objekt*, das auf das *DOM-Element* verweist und somit als eine Art Verbindung oder Zeiger auf dieses Element dient. Das *Javascript-Objekt* erhält Mehoden, um das *DOM-Element* in der Browser Runtime zu manipulieren, z.: stellt `textContent()`  den Textinhalt einer *DOM-Node* dar, den man auslesen udn ändern kann.

## WebIDL

[Standard](https://webidl.spec.whatwg.org/)
[Wiki](https://www.w3.org/wiki/Web_IDL)
[MDN](https://developer.mozilla.org/en-US/docs/Glossary/WebIDL)

Web IDL (Interface Definition Language) ist eine Beschreibungssprache, die in der Webentwicklung verwendet wird, um die Schnittstellen und Objekte von Web-APIs (Application Programming Interfaces) zu definieren und zu dokumentieren. Web IDL spielt eine wichtige Rolle bei der Definition von JavaScript-Objekten und -Schnittstellen, die von Webbrowsern und Webtechnologien implementiert werden, und ermöglicht so die Interaktion zwischen JavaScript und verschiedenen Web-APIs.

Hier sind einige Schlüsselkonzepte und Verwendungszwecke von Web IDL:

1. Schnittstellen und Objekte: Mit Web IDL können Entwickler Schnittstellen und Objekte definieren, die in JavaScript und anderen Programmiersprachen verwendet werden, um auf Web-APIs zuzugreifen. Diese Schnittstellen repräsentieren Funktionalität oder Daten in Webanwendungen. Beispielsweise könnte die Schnittstelle "Element" die Eigenschaften und Methoden eines HTML-Elements beschreiben.

2. Methoden und Eigenschaften: In Web IDL können Entwickler Methoden, Eigenschaften und Ereignisse für Schnittstellen und Objekte definieren. Diese beschreiben, welche Aktionen ausgeführt werden können, welche Werte gelesen oder gesetzt werden können und wie auf Ereignisse reagiert werden kann.

3. Typen und Argumente: Web IDL definiert auch Datentypen, die für die Parameter von Methoden und Eigenschaften verwendet werden. Dies hilft, die erwarteten Eingaben und Ausgaben zu dokumentieren und sicherzustellen, dass die richtigen Daten verwendet werden.

4. Konvertierung zwischen Programmiersprachen: Web IDL stellt sicher, dass Schnittstellen und Objekte in verschiedenen Programmiersprachen, einschließlich JavaScript, konsistent und interoperabel sind. Es beschreibt, wie Daten und Operationen zwischen den Sprachen konvertiert werden.

5. Dokumentation: Web IDL dient als Dokumentationsquelle für Entwickler, die auf Web-APIs zugreifen möchten. Es bietet eine klare und einheitliche Beschreibung der verfügbaren Schnittstellen und ihrer Verwendung.

Ein Beispiel für Web IDL könnte so aussehen:

```idl
interface Car {
  attribute DOMString make;
  attribute DOMString model;

  void start();
  void stop();
};
```

In diesem Beispiel wird die Schnittstelle "Car" mit Eigenschaften "make" und "model" sowie den Methoden "start" und "stop" definiert.

Web IDL ist von großer Bedeutung für die Webentwicklung, da es dazu beiträgt, Web-APIs zu standardisieren und die Interoperabilität zwischen verschiedenen Browsern und Plattformen sicherzustellen. Dies erleichtert die Entwicklung von Webanwendungen, die auf verschiedenen Geräten und Browsern reibungslos funktionieren.

## WebCore

[Dokumentation](https://webkit.org/blog/114/webcore-rendering-i-the-basics/)

WebCore ist ein Kernbestandteil der WebKit-Engine, die in verschiedenen Webbrowsern und Anwendungen für die Darstellung von Webinhalten verwendet wird. WebKit selbst ist ein Open-Source-Browser-Engine-Projekt, das von der WebKit-Community entwickelt wird. WebCore ist eine der Hauptkomponenten von WebKit und ist verantwortlich für die Interpretation und Darstellung von Webinhalten, einschließlich HTML, CSS und JavaScript.

Hier sind einige Schlüsselaspekte und Aufgaben, die WebCore übernimmt:

1. HTML- und CSS-Rendering: WebCore ist für das Rendern von HTML- und CSS-Inhalten verantwortlich. Es analysiert HTML-Dokumente und CSS-Stylesheets und generiert die Darstellung der Webseite, die im Browser angezeigt wird. Dies umfasst das Layout, die Formatierung und die Anzeige von Text, Bildern und anderen Elementen.

2. DOM-Manipulation: WebCore stellt eine Implementierung des Document Object Model (DOM) bereit, das es JavaScript ermöglicht, auf die Struktur und den Inhalt der Webseite zuzugreifen und sie zu manipulieren. Dies ist entscheidend für die Interaktivität von Webseiten.

3. JavaScript-Integration: WebCore bietet die Integration von JavaScript in den Browser. Es ermöglicht das Ausführen von JavaScript-Code, die Verarbeitung von Ereignissen und die Kommunikation zwischen JavaScript und dem DOM.

4. Rendering-Engines: WebCore verfügt über verschiedene Rendering-Engines, darunter eine Layout-Engine für das Positionieren und Zeichnen von HTML-Elementen, eine Text-Engine für das Darstellen von Text und eine Grafik-Engine für das Rendern von Bildern und Vektorgrafiken.

5. Sicherheit und Sandbox: WebCore implementiert Sicherheitsmechanismen, um schädlichen Code von der Ausführung in Webseiten zu hindern. Dies beinhaltet die Isolierung von JavaScript-Code und die Überprüfung von Cross-Origin-Anfragen.

6. Plattformunabhängigkeit: WebCore wurde entwickelt, um auf verschiedenen Plattformen und Betriebssystemen zu funktionieren. Es bietet eine abstrahierte Schnittstelle zur Kommunikation mit dem jeweiligen Betriebssystem und zur Handhabung von Ereignissen und Eingaben.

WebCore ist der Teil von WebKit, der die Darstellung von Webinhalten ermöglicht und für die Unterstützung von Webstandards verantwortlich ist. WebKit wird in vielen bekannten Webbrowsern und Anwendungen wie Safari, Google Chrome und vielen mobilen Browsern verwendet. Die Trennung von WebCore von anderen Teilen von WebKit ermöglicht es, WebKit auf verschiedene Plattformen zu portieren und für verschiedene Anwendungsanforderungen anzupassen.

## Browser vs. Javascript Runtime

[MDN Browser Runtime](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime)
[V8-Dokumentation](https://v8.dev/docs)

1. Browser: Der Browser ist die Anwendung, die Webseiten darstellt und mit Benutzern interagiert. In einem Browser wird der gesamte Prozess der Anforderung und Darstellung von Webinhalten verwaltet. Dazu gehören das Herunterladen von HTML, CSS und JavaScript, die Darstellung der Inhalte, die Verwaltung von Benutzerinteraktionen und die Bereitstellung einer grafischen Benutzeroberfläche. Der Browser stellt auch viele zusätzliche Funktionen zur Verfügung, wie die Darstellung von Grafiken, die Handhabung von Multimedia und die Sicherheit.

2. JavaScript-Runtime: Die JavaScript-Runtime ist die Umgebung, in der JavaScript-Code ausgeführt wird. Sie ist verantwortlich für das Analysieren und Ausführen von JavaScript-Code. Dies umfasst die Verarbeitung von Variablen, Funktionen, Ereignissen und die Interaktion mit dem DOM. Die JavaScript-Runtime bietet auch eine Schnittstelle zum Arbeiten mit dem Web-APIs und zur Kommunikation mit dem Browser. Die bekanntesten JavaScript-Runtimes sind die V8-Engine von Google (verwendet in Chrome) und die SpiderMonkey-Engine von Mozilla (verwendet in Firefox).

In einem typischen Browser-Umfeld arbeiten der Browser und die JavaScript-Runtime eng zusammen. Der Browser lädt HTML-, CSS- und JavaScript-Dateien herunter, stellt die Webseite dar und ermöglicht die Interaktion des Benutzers. Die JavaScript-Runtime ist für die Verarbeitung des JavaScript-Codes auf der Seite verantwortlich und ermöglicht die dynamische Aktualisierung und Interaktion der Webseite.

Die Trennung zwischen Browser und JavaScript-Runtime ermöglicht die Verwendung von JavaScript in verschiedenen Umgebungen, nicht nur in Browsern. Zum Beispiel wird JavaScript heute auch in Serverumgebungen (Node.js) und in mobilen App-Entwicklungsfreigaben eingesetzt. In diesen Fällen gibt es keine sichtbare Benutzeroberfläche, aber dennoch ist die JavaScript-Runtime weiterhin für die Ausführung von JavaScript-Code verantwortlich.

## DOM

[Intro to DOM (MDN)](https://www.netflix.com/browse))

DOM steht für "Document Object Model" und ist eine Programmierschnittstelle, die es ermöglicht, auf HTML- oder XML-Dokumente zuzugreifen und diese zu manipulieren. Das DOM stellt die Struktur des Dokuments als Baumstruktur dar, wobei jedes Element im Dokument durch ein Objekt im DOM repräsentiert wird.

1. Das DOM bietet eine Möglichkeit, auf die Elemente eines Dokuments zuzugreifen und sie zu verändern. Es ermöglicht die dynamische Aktualisierung und Manipulation von Webseiteninhalten. Mit dem DOM kann man:

2. Elemente auswählen: Man kann bestimmte Elemente im Dokument auswählen, indem man ihre Tags, IDs, Klassen oder andere Attribute verwendet. Zum Beispiel kann man document.getElementById('myElement') verwenden, um ein Element mit einer bestimmten ID auszuwählen.

3. Elemente verändern: Man kann den Inhalt, die Attribute und die Struktur von Elementen im Dokument ändern. Zum Beispiel kann man den Textinhalt eines Absatzes ändern oder ein neues Element in das Dokument einfügen.

4. Ereignisse behandeln: Das DOM ermöglicht das Hinzufügen von Ereignislistenern zu Elementen, um auf Benutzerinteraktionen wie Mausklicks oder Tastatureingaben zu reagieren.

5. Dynamische Aktualisierung: Das DOM kann verwendet werden, um Webseiten dynamisch zu aktualisieren, ohne die gesamte Seite neu zu laden. Dies ist besonders nützlich für Single-Page-Anwendungen (SPAs) und Webanwendungen.

Das DOM ist eine wichtige Grundlage für die Webentwicklung und ermöglicht die Erstellung interaktiver und dynamischer Webseiten. Es wird von Browsern zur Verfügung gestellt und ist in JavaScript weit verbreitet, um auf Webseiten zuzugreifen und diese zu verändern.

### Shadow DOM

[Using Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)

Das Shadow DOM (Shadow Document Object Model) ist ein wichtiger Bestandteil von Web-Technologien wie HTML, CSS und JavaScript, der zur Isolierung und zum Schutz von HTML und CSS verwendet wird. Es ermöglicht die Erstellung von Webkomponenten, die in sich geschlossene, wiederverwendbare und voneinander unabhängige Teile einer Webseite darstellen.

Hier sind die Schlüsselkonzepte und Merkmale des Shadow DOM:

1. Isolation: Mit dem Shadow DOM können Entwickler Webkomponenten erstellen, die einen eigenen abgeschlossenen DOM-Baum haben. Das bedeutet, dass die in einem Shadow DOM erstellten HTML- und CSS-Elemente von außen nicht beeinflusst werden können. Dies verhindert, dass CSS-Styles und JavaScript aus dem Hauptdokument (Light DOM) die Funktionsweise der Komponente stören.

2. Komponenten: Das Shadow DOM ermöglicht die Erstellung von wiederverwendbaren Webkomponenten. Diese Komponenten können benutzerdefinierte Elemente sein, die in HTML verwendet werden können, ähnlich wie eingebettete Standard-HTML-Tags. Webkomponenten können ihre eigene Funktionalität, ihr eigenes Styling und sogar ihre eigenen Ereignisse haben.

3. Encapsulation: Die in einem Shadow DOM erstellten CSS-Regeln sind auf den Bereich des Shadow DOM beschränkt. Dies verhindert CSS-Kollisionen und erlaubt es, Stile für eine Webkomponente unabhängig von der Umgebung festzulegen.

4. Vererbung und Kapselung: Das Shadow DOM ermöglicht eine Art Vererbung, bei der ein Shadow DOM in einem anderen eingebettet sein kann. Dabei wird die Kapselungseigenschaft aufrechterhalten. Dies ermöglicht die Erstellung komplexer, verschachtelter Webkomponenten.

5. Ereignisse: Ereignisse, die in einem Shadow DOM ausgelöst werden, können auf der Hauptseite abgefangen werden. Dies ermöglicht eine bidirektionale Kommunikation zwischen der Komponente und der Seite, auf der sie verwendet wird.

6. Shadow DOM API: Um mit dem Shadow DOM zu arbeiten, bietet die Browser-API Funktionen und Methoden, um auf die Schatten-DOM-Struktur zuzugreifen, Ereignisse zu behandeln und Komponenten dynamisch zu aktualisieren.

Das Shadow DOM ist besonders nützlich für die Entwicklung von komplexen, wiederverwendbaren Komponenten in modernen Webanwendungen. Es fördert die klare Trennung von Verantwortlichkeiten und verhindert, dass Styles und Logik zwischen verschiedenen Teilen einer Seite miteinander interferieren. Dies verbessert die Skalierbarkeit und Wartbarkeit von Webprojekten erheblich.

### Virtual DOM

[What is Virtual DOM](https://legacy.reactjs.org/docs/faq-internals.html)

Die "Virtual DOM" (virtuelles DOM) ist ein Konzept, das hauptsächlich mit React, einer JavaScript-Bibliothek für die Entwicklung von Benutzeroberflächen, verbunden ist. Die Idee hinter dem virtuellen DOM besteht darin, die Leistung und Effizienz bei der Aktualisierung von Benutzeroberflächen zu optimieren.

Hier ist eine grundlegende Erklärung des virtuellen DOM:

Realer DOM vs. Virtueller DOM:

1. Der "reale DOM" ist die tatsächliche Baumstruktur des Dokuments im Webbrowser. Jedes HTML-Element, jeder Knoten und jede Eigenschaft der Benutzeroberfläche sind im realen DOM repräsentiert.
Der "virtuelle DOM" ist eine abstrakte, leichtgewichtige Kopie des realen DOMs. Es ist eine Baumstruktur, die im Arbeitsspeicher existiert und von React verwaltet wird.
Arbeitsweise:

2. Wenn Änderungen in einer React-Anwendung auftreten (z. B. Benutzerinteraktionen oder Datenaktualisierungen), erstellt React zuerst eine neue Version des virtuellen DOMs, die die geänderten Elemente und Eigenschaften enthält.
Anschließend vergleicht React den neuen virtuellen DOM mit dem vorherigen virtuellen DOM (vor der Änderung), um festzustellen, welche Teile der Benutzeroberfläche aktualisiert werden müssen.
React bestimmt den minimalen Satz von Änderungen im realen DOM, um den neuen virtuellen DOM widerzuspiegeln, und aktualisiert nur diese Teile. Dieser Vorgang wird als "Reconciliation" bezeichnet.
Vorteile des virtuellen DOM:

3. Effizienz: Da der Vergleich im virtuellen DOM stattfindet, werden nicht notwendige Änderungen im realen DOM vermieden. Dadurch wird die Leistung verbessert, da die Aktualisierung des realen DOM ressourcenschonend ist.
Konsistenz: Der virtuelle DOM stellt sicher, dass die Benutzeroberfläche immer in einem konsistenten Zustand bleibt, und reduziert potenzielle Fehler und Synchronisationsprobleme.

4. Verwendung in React:
In React-Apps wird der virtuelle DOM automatisch von der React-Bibliothek verwaltet. Entwickler müssen sich normalerweise nicht direkt mit dem virtuellen DOM befassen, sondern können React-Komponenten erstellen und sich auf die Anwendungslogik konzentrieren.
React verwendet den virtuellen DOM, um Komponenten effizient zu aktualisieren und die Benutzeroberfläche reaktiv zu gestalten.

Der virtuelle DOM ist eine leistungsstarke Technik, die zur Optimierung der Aktualisierung von Benutzeroberflächen beiträgt und insbesondere in React und ähnlichen Bibliotheken weit verbreitet ist. Es ist eine wichtige Komponente für die Entwicklung schneller und reaktiver Webanwendunge

4