
# The Hard Parts of Node.js & Servers / Will Sentance / Mitte September, 23`

[Course SLides](https://static.frontendmasters.com/resources/2019-04-24-servers-node-js/Hard-Parts-Servers-Node.pdf)
[Course Code](https://static.frontendmasters.com/resources/2019-04-24-servers-node-js/node-hard-parts.zip)
[HTTP Standard](https://datatracker.ietf.org/doc/html/rfc9114)
[NodeEvents](https://nodejs.org/api/events.html)
[NodeHTTPServer](https://nodejs.org/api/http.html#class-httpserver)

## Conten

- [The Hard Parts of Node.js \& Servers / Will Sentance / Mitte September, 23\`](#the-hard-parts-of-nodejs--servers--will-sentance--mitte-september-23)
  - [Conten](#conten)
  - [Takeaways](#takeaways)
  - [createServer](#createserver)
  - [File System](#file-system)
    - [fs.readFile() und fs.createReadStream()](#fsreadfile-und-fscreatereadstream)
    - [Stream](#stream)
  - [libuv](#libuv)
  - [Zusammenfassung der Ereignisse, die stattfinden, wenn man in Node.js ein HTTP-Objekt erstellt und mit einem Client kommuniziert](#zusammenfassung-der-ereignisse-die-stattfinden-wenn-man-in-nodejs-ein-http-objekt-erstellt-und-mit-einem-client-kommuniziert)
  - [Error First Pattern](#error-first-pattern)

## Takeaways

+ `requests` in Node sind immer in HTTP
+ Incoming Messages kommen stehen in Node im [Buffer](https://nodejs.org/api/buffer.html#buffer_buffer) Format bereit.
+  [libuv] ist jene C++ Library, die Node auf allen Betriebssystemen implementiert. Sie ist zuständig für den Event-Loop, Event Handling, Cross-Plattform-Abstraktion, Asynchron I/O, Threading, Timer/Timing, usw... [libuv-Repo](https://github.com/libuv/libuv) 
+ Node besitzt einen eigenen *Execution Context*. In diesem werden die Node-Funktionen ausgeführt.
+ Node gibt Node-C++-Features vor (zb.: File System oder Input Message) die auf Features des Computers zugreifen und diese im Hintergrund aufrufen. Diese Features kommunizieren dann mit Node, und Node dann per Auto-Functions mit dem Javascript Programm (Server) um dort auf die Daten zugreifen zu können, sie zu verarbeiten und eventuell an den Client (möglicherweiße manipuliert) zurück zu geben.  
+ Wenn man weiß, welche Auto-Function (Event) von Node getriggered wird wenn ein spezifischer Hintergundprozess des Computers ausgelöst wurde, kann man in der [Node Dokumentation](https://nodejs.org/de/docs) nachsehen, welche Parameter diese Event-Funktion benötigt und wie diese srukturiert sein müssen, um die Daten des Hintergrundprozesses verwenden zu können.
+ [Threads](https://en.wikipedia.org/wiki/Thread_\(computing\)):
	+ Node ist zuständig für Threads beim File System/Storage
	+ Nicht Node, sondern das OS ist zuständig für Threads beim Socket öffnen (Inbound Messages) 

## createServer 

`createServer()` triggert Node mithilfe des http Moduls einen Socket auf der Netzwerkkrte zu öffnen und gibt ein Objekt mit einigen Funktionen zurück, die es erlauben den Server/WebSocket zu verändern (wie zb.: `server.listen(80)`)

## File System

### fs.readFile() und fs.createReadStream()



**`fs.readFile()`** und **`fs.createReadStream()`** sind beide Methoden in Node.js, die dazu verwendet werden können, Dateien zu lesen, aber sie haben unterschiedliche Verwendungszwecke und sind für verschiedene Szenarien geeignet. Hier ist, wann man sie typischerweise verwenden kann:

1. **`fs.readFile()`**:
   - Mit **`fs.readFile()`** kann man eine Datei synchron in den Speicher laden und deren Inhalt als Ganzes verarbeiten.
   - Diese Methode ist blockierend, dh sie wird warten, bis die gesamte Datei gelesen wurde, bevor sie die Kontrolle an das Programm zurückgibt.
   - Man kann **`fs.readFile()`** gut für kleinere Dateien verwenden oder wenn man den gesamten Dateiinhalt in den Speicher laden und damit arbeiten muss.

   Beispiel:
   ```javascript
   const fs = require('fs');

   fs.readFile('datei.txt', 'utf8', (err, data) => {
     if (err) {
       console.error('Fehler beim Lesen der Datei:', err);
       return;
     }
     console.log('Dateiinhalt:', data);
   });
   ```

2. **`fs.createReadStream()`**:
   - Mit **`fs.createReadStream()`** kann man große Dateien oder Dateien mit unbekannter Größe lesen, ohne den gesamten Inhalt in den Speicher zu laden.
   - Diese Methode erstellt einen Stream, der die Datei in kleine Chunks (Teile) liest und diese Chunks asynchron an das Programm liefert, während die Datei gelesen wird.
   - Man kann **`fs.createReadStream()`** gut für das Streamen großer Dateien, das Verarbeiten von Dateien zeilenweise oder das Verarbeiten von Dateien im Stapelverarbeitungsmodus verwenden, ohne viel Speicher zu verbrauchen.

   Beispiel:
   ```javascript
   const fs = require('fs');

   const stream = fs.createReadStream('grosseDatei.txt', 'utf8');

   stream.on('data', (chunk) => {
     // Man kann den Daten-Chunk verarbeiten
     console.log('Gelesener Chunk:', chunk);
   });

   stream.on('end', () => {
     console.log('Datei wurde vollständig gelesen.');
   });
   ```

  Im Wesentlichen hängt die Wahl zwischen **`fs.readFile()`** und **`fs.createReadStream()`** von den Anforderungen und der Größe der zu lesenden Datei ab. Wenn man eine kleine Datei synchron lesen muss, ist **`fs.readFile()`** einfach und praktisch. Für größere Dateien oder Streaming-Anforderungen ist **`fs.createReadStream()`** besser geeignet.

### Stream

  Mit **`fs.createReadStream()`** wird die Datei in *Chunks* aufgeteilt die default 64KB groß sind. Wenn ein *Chunk* über den *Socket* mithilfe der *libuv* Bibliothek **Node** übergeben wird, wird von *Node* das *'data'* Event ausgelöst. Die 'data'-EventHandler-Callback-Funktion wird danach für jeden *Chunk* neu aufgerufen.  

  ```javascript
  let cleanedTweets = "";
  
  function cleanTweets (tweetsToClean){
    // algorithm to remove bad tweets from `tweetsToClean`
  }
  
  function doOnNewBatch(data){
      cleanedTweets += cleanTweets(data);
  }
  
  const accessTweetsArchive = fs.createReadStream('./tweetsArchive.json')
  
  accessTweetsArchive.on('data', doOnNewBatch); // Hier wird das 'data' Event behandelt
  ```

## [libuv](libuv)

Die libuv-Bibliothek ist eine wichtige Komponente von Node.js, die für das Event-Handling, die asynchrone Ein-/Ausgabe (I/O), die Netzwerkkommunikation und die Cross-Plattform-Abstraktion von Betriebssystemfunktionen verantwortlich ist. Sie bildet das Fundament, auf dem Node.js basiert, und ermöglicht Node.js, nicht blockierende und effiziente Anwendungen zu entwickeln, die gleichzeitig auf verschiedene Betriebssysteme abzielen.

Hier sind einige der Hauptfunktionen und Verantwortlichkeiten der libuv-Bibliothek:

1. **Event-Loop**: Die libuv-Bibliothek implementiert den Event-Loop von Node.js. Der Event-Loop ist das zentrale Konzept, das es Node.js ermöglicht, asynchrone Operationen effizient zu verarbeiten. Er überwacht Aufgaben und wartet auf Ereignisse wie I/O-Abschlüsse, Timings und Benutzeraktionen.

2. **Cross-Plattform-Abstraktion**: libuv stellt eine Abstraktionsschicht über den nativen Betriebssystem-APIs bereit. Dies ermöglicht Node.js, auf verschiedenen Betriebssystemen zu laufen, ohne dass der Kerncode geändert werden muss. Dies ist besonders wichtig für die plattformübergreifende Kompatibilität von Node.js-Anwendungen.

3. **Asynchrone I/O**: Die Bibliothek bietet Schnittstellen für asynchrone Ein-/Ausgabeoperationen, die es ermöglichen, Dateien zu lesen/schreiben, Netzwerkverbindungen zu verwalten und andere I/O-Aufgaben auszuführen, ohne den Haupt-Event-Loop zu blockieren. Dies ist entscheidend, um die Skalierbarkeit von Node.js-Anwendungen sicherzustellen.

4. **Threading-Unterstützung**: libuv verwaltet Hintergrundthreads für bestimmte Operationen, die nicht im Haupt-Event-Loop ausgeführt werden können, wie z.B. DNS-Auflösungen. Dies ermöglicht die effiziente parallele Verarbeitung von Aufgaben, ohne die Single-Threaded-Natur von Node.js zu beeinträchtigen.

5. **Timer und Timings**: libuv bietet Funktionen zur Verwaltung von Timern und Zeitabläufen, die in Node.js-Anwendungen verwendet werden können. Dies umfasst das Planen von Aufgaben zu bestimmten Zeiten oder nach einer bestimmten Verzögerung.

6. **Event-Handling**: libuv unterstützt das Registrieren von Callback-Funktionen für verschiedene Arten von Ereignissen, einschließlich I/O-Ereignissen, Timern und Signalen. Dies ermöglicht es Entwicklern, auf diese Ereignisse zu reagieren und asynchrone Logik zu implementieren.

Insgesamt spielt libuv eine entscheidende Rolle in der Architektur von Node.js, indem sie die Grundlage für nicht blockierende, asynchrone und effiziente I/O und Event-Verarbeitung bildet. Sie sorgt dafür, dass Node.js-Anwendungen auf verschiedene Betriebssysteme portiert werden können und gleichzeitig eine hohe Leistung und Skalierbarkeit bieten.


## Zusammenfassung der Ereignisse, die stattfinden, wenn man in Node.js ein HTTP-Objekt erstellt und mit einem Client kommuniziert

1. **Erstellung des HTTP-Objekts**:
   - Sie erstellen ein HTTP-Objekt, indem Sie `const http = require('http')` verwenden. Dieses Objekt ist Teil des integrierten HTTP-Moduls von Node.js.

2. **Erstellen des HTTP-Servers**:
   - Mit `http.createServer()` erstellen Sie einen HTTP-Server. Dieser Server kann auf bestimmten Ports lauschen und auf Anfragen von Clients warten.

3. **Kommunikation mit libuv**:
   - Intern verwendet Node.js das libuv-Modul, um eine Verbindung zum Betriebssystem herzustellen und Socket-Verbindungen zu verwalten. Libuv ist verantwortlich für die Handhabung von Ein-/Ausgabeoperationen und asynchronen Vorgängen.

4. **Binden des Servers an einen Port**:
   - Sie können den Server mit `server.listen(port)` an einen bestimmten Port binden. Der Server beginnt nun, auf diesem Port auf eingehende Verbindungen zu lauschen.

5. **Erkennen von Anfragen**:
   - Wenn eine Netzwerkanfrage von einem Client an den Server gesendet wird, wird diese Anfrage über die libuv-Schnittstelle empfangen und an das HTTP-Modul von Node.js weitergeleitet.

6. **HTTP-Anfragen verarbeiten**:
   - Das HTTP-Modul analysiert die empfangene Anfrage, insbesondere die HTTP-Header, um sicherzustellen, dass sie gültig sind. Es extrahiert Informationen wie die HTTP-Methode, den Pfad und Headerinformationen.

7. **Auslösen des 'request'-Ereignisses**:
   - Nach erfolgreicher Analyse der Anfrage wird das 'request'-Ereignis auf dem HTTP-Server ausgelöst. Dies geschieht automatisch und gibt Ihrem Code die Möglichkeit, auf die HTTP-Anfrage zu reagieren.

8. **Registrieren von Event-Handlern**:
   - Sie registrieren Event-Handler für das 'request'-Ereignis und andere Ereignisse wie 'clientError'. Diese Event-Handler definieren, wie Ihr Server auf bestimmte Ereignisse reagieren soll.

9. **Verarbeitung der Anfrage**:
   - Innerhalb des 'request'-Event-Handlers können Sie die Anfrage analysieren und entsprechende Antworten senden oder serverseitige Logik ausführen.

10. **Fehlererkennung**:
    - Während des Prozesses können Fehler auftreten, z.B. wenn HTTP-Header fehlerhaft sind. Node.js erkennt diese Fehler und löst entsprechende Fehlerereignisse wie 'clientError' aus, auf die Sie reagieren können.

11. **Rückgabe des HTTP-Servers**:
    - Der HTTP-Server, den Sie zuvor erstellt haben, ist ein Objekt, das Ereignisse wie 'request' und 'clientError' auslöst. Sie können dieses Serverobjekt verwenden, um Ihren HTTP-Server zu konfigurieren und auf Ereignisse zu reagieren.

Insgesamt handelt es sich um einen Ablauf, bei dem Node.js die Verwaltung von Netzwerkverbindungen, das Parsen von HTTP-Anfragen und die Auslösung von Ereignissen für Ihren Server übernimmt. Ihr JavaScript-Code ist dafür verantwortlich, Event-Handler zu registrieren und die gewünschte Logik für die Verarbeitung von Anfragen und Fehlern bereitzustellen.


## Error First Pattern

Das Error-First-Pattern ist ein Konventionsmuster in Node.js, bei dem Fehler als erstes Argument an Callback-Funktionen übergeben werden. Es ist eine gängige Praxis in der Node.js-Programmierung, bei der Callback-Funktionen verwendet werden, um asynchrone Operationen abzuschließen. In diesem Muster wird der Fehler (falls vorhanden) als erstes Argument an die Callback-Funktion übergeben, gefolgt von den Ergebnissen der Operation. Dies ermöglicht es, auf Fehler effizient zu reagieren und sie in einer klaren und einheitlichen Weise zu behandeln.

+ Beispiel 1: Lesen einer Datei mit dem Error-First-Pattern.

	```javascript
	const fs = require('fs');

	fs.readFile('datei.txt', 'utf8', (err, data) => {
	  if (err) {
	    console.error('Fehler beim Lesen der Datei:', err);
	    return;
	  }
	  console.log('Dateiinhalt:', data);
	});
	```

In diesem Beispiel wird die readFile-Funktion verwendet, um eine Datei zu lesen. Wenn ein Fehler auftritt, wird er an die Callback-Funktion übergeben, und wir können ihn behandeln. Andernfalls erhalten wir die Dateidaten.

+ Beispiel 2: Ausführen einer Datenbankabfrage mit dem Error-First-Pattern.

	```javascript
	const database = require('meine-datenbank');

	database.query('SELECT * FROM nutzer', (err, results) => {
	  if (err) {
	    console.error('Datenbankfehler:', err);
	    return;
	  }
	  console.log('Abfrageergebnisse:', results);
	});
	```

Hier verwenden wir das Error-First-Pattern, um eine Datenbankabfrage durchzuführen. Wenn ein Fehler in der Datenbankabfrage auftritt, wird er in err übergeben, andernfalls erhalten wir die Abfrageergebnisse in results.

+ Nicht-Beispiel: Das Error-First-Pattern wird normalerweise nicht verwendet, wenn Sie moderne JavaScript-Features wie Promises oder Async/A+ wait verwenden, da diese eine andere Methode zur Fehlerbehandlung bieten. Das Muster ist eher für ältere Node.js-Anwendungen relevant, die noch auf Callbacks angewiesen sind.

