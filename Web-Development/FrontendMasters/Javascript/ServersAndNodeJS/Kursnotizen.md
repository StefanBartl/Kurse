# The Hard Parts of Node.js & Servers / Will Sentance / Mitte September, 23`

[Course SLides](https://static.frontendmasters.com/resources/2019-04-24-servers-node-js/Hard-Parts-Servers-Node.pdf)
[Course Code](https://static.frontendmasters.com/resources/2019-04-24-servers-node-js/node-hard-parts.zip)

## Takeaways

+ [libuv](https://github.com/libuv/libuv) ist jene C++ Library die Node auf allen Betriebssystemen implemntiert
+ Node besitzt einen eigenen *Execution Context*. In diesem werden die Node-Funktionen ausgeführt.
+ Node gibt Node-C++-Features vor (zb.: File System oder Input Message) die auf Features des Computers zugreifen und diese im Hintergrund aufrufen. Diese Features kommunizieren dann mit Node, und Node dann per Auto-Functions mit dem Javascript Programm (Server) um dort auf die Daten zugreifen zu können, sie zu verarbeiten und eventuell an den Client (möglicherweiße manipuliert) zurück zu geben.  
+ Wenn man weiß, welche Auto-Function von Node getriggered wird wenn ein spezifischer Hintergundprozess des Computers ausgelöst wurde, kann man in der [Node Dokumentation](https://nodejs.org/de/docs) nachsehen, welche Parameter diese Auto-Funktion benötigt und wie diese srukturiert sein müssen, um die Daten des Hintergrundprozesses verwenden zu können.

## createServer 

`createServer()` triggert Node einen Socket zu öffnen und gibt ein Objekt mit einigen Funktionen zurück, die es erlauben den Server/WebSocket zu verändern (wie zb.: `server.listen(80)`)

`createServer()` nimmt eine Funktionen als Parameter die in den Ausführungskontext von Node gespeichert wird. In dieser befindet sich auch die Standard-Anrwort auf Anfragen an den Server:

	```
	function doOnRequest(request, response){
	  // Send back a message saying "Welcome to Twitter"
	  // code here...
	}

	const server = http.createServer(doOnRequest)
	// Antwort bei Anfrage: "Welcome to twitter"
	```






