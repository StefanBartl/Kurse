# The Hard Parts of Node.js & Servers / Will Sentance / Mitte September, 23`

[Course SLides](https://static.frontendmasters.com/resources/2019-04-24-servers-node-js/Hard-Parts-Servers-Node.pdf)
[Course Code](https://static.frontendmasters.com/resources/2019-04-24-servers-node-js/node-hard-parts.zip)
[HTTP Standard](https://datatracker.ietf.org/doc/html/rfc9114)
[NodeEvents](https://nodejs.org/api/events.html)
[NodeHTTPServer](https://nodejs.org/api/http.html#class-httpserver)

## Takeaways

+ `requests` in Node sind immer in HTTP
+ [libuv](https://github.com/libuv/libuv) ist jene C++ Library die Node auf allen Betriebssystemen implemntiert
+ Node besitzt einen eigenen *Execution Context*. In diesem werden die Node-Funktionen ausgeführt.
+ Node gibt Node-C++-Features vor (zb.: File System oder Input Message) die auf Features des Computers zugreifen und diese im Hintergrund aufrufen. Diese Features kommunizieren dann mit Node, und Node dann per Auto-Functions mit dem Javascript Programm (Server) um dort auf die Daten zugreifen zu können, sie zu verarbeiten und eventuell an den Client (möglicherweiße manipuliert) zurück zu geben.  
+ Wenn man weiß, welche Auto-Function (Event) von Node getriggered wird wenn ein spezifischer Hintergundprozess des Computers ausgelöst wurde, kann man in der [Node Dokumentation](https://nodejs.org/de/docs) nachsehen, welche Parameter diese Event-Funktion benötigt und wie diese srukturiert sein müssen, um die Daten des Hintergrundprozesses verwenden zu können.

## createServer 

`createServer()` triggert Node mithilfe des http Moduls einen Socket auf der Netzwerkkrte zu öffnen und gibt ein Objekt mit einigen Funktionen zurück, die es erlauben den Server/WebSocket zu verändern (wie zb.: `server.listen(80)`)

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




