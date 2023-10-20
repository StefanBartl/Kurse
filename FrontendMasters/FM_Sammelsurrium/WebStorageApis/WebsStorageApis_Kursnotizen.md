# Web Storage API's / Maximiliano Firtman (Selbständig) / Mitte August, 23`

[Kurswebsite](https://firtman.github.io/browser-storage/)

- [Web Storage API's / Maximiliano Firtman (Selbständig) / Mitte August, 23\`](#web-storage-apis--maximiliano-firtman-selbständig--mitte-august-23)
  - [Was können sie - Vorteile](#was-können-sie---vorteile)
  - [Wie funktioniert es - Top-Level](#wie-funktioniert-es---top-level)
  - [Origin](#origin)
  - [API's für Browser Storage](#apis-für-browser-storage)
    - [Cookies](#cookies)
    - [Web Storage](#web-storage)
      - [Session Storage](#session-storage)
      - [Local Storage](#local-storage)
    - [WebSQL](#websql)
    - [Application-Cache](#application-cache)
    - [IndexedDB](#indexeddb)
    - [File and Directories](#file-and-directories)
    - [Cache Storage](#cache-storage)
    - [File System Access](#file-system-access)

## Was können sie - Vorteile

+ Sollte der Server offline sein oder der User keine Verbindung haben, kann die App trotztdem noch Funktionalitäten bieten
+ Speichern von Daten, die vom User generiert werden und zu  einem späteren Zeitpunkt mit dem Server synchronisiert werden (Postings, Einträge, Bewegungsdaten, usw...)
+ App-Lifetime: Mann kann App-State speichern um den User eine nahtlose Erfahrung zu ermöglichen. Die Lebenszeit einer App auf mobilen Geräten ist oft kurz: User benutzt App, wechselt zu Videokamera und möchte ein paar Minuten später die App wieder benutzen. Es könnte sein, dass das Gerät die App einstweilen aus dem Memory geworfen hat und neu gestartet werden muss. Kann der State gespeichert werden, geht dies rasch, ansonsten muss der Server die Daten liefern, sofern er sie abegriffen hat,
+ Cache-Assets: Will man zb.: 1000 Bilder in die App laden, müsste man 1000 HTTP-Request machen. Besser w#re nur 1 Anfrage zu machen, eine ZIP-Datei zu laden und sie mit JS oder WebAssembly zu entpacken. Diese Daten kann man dann Client-seitig speichern, daamit man sie nicht mehr übertragen muss.
+ Authenifikations-Tokens: "Cookies are dead" - sind in verruf wegen Tracking und ihrer Komplexität. Tokens sind besser.

## Wie funktioniert es - Top-Level

+ Mit JS werden Daten auf Geräten von Nutzer lokal gespeichert und geholt
+ Der Browser ist für die Implementation und Sicherheitsdetails verantwortlich
+ Man sollte diese Daten so behandeln, als könnten sie jederzeit vom Gerät gelöscht werden
+ Die Daten bleiben zwischen Browser Sessions am Gerät gespeichert
+ Bei den meisten API's ost keine separate Berechtigung des Nutzers nötig
+ Die Daten werden nicht mit dem Server oder anderen Web-Apps geteilt (Cookies ausgenommen)

## Origin

Ist eine Internetdomain, zb.: [frontendmasters](frontendmasters.com), aber Protocol + Host + Port.
Vorsicht bei: 
+ www prefix
+ ***country TLD's*** wie ama.de vs. ama.com
+ ***subdomains*** wie ama.es vs ama.es.dev

## API's für Browser Storage

Empfohlen werden: IndexedDB, Cache Storage
Mit Einschrämkugen (siehe unten): File System Access, File and Directories, Web Storage (wenn geht vermeiden) 

### Cookies

Cookies haben kleine Speicherkapazität, sind ***String***-basiert und werden zum Server gesendet. Sie bieten daher eine schlechte Möglichkeit an, Daten zu speichern.

### Web Storage

Sind synchrone API's, gehen in den Thread und sind daher nicht optimal für die Nutzung. Sie veruchen möglicherweiße Performanceprobleme.
Speichern nur ***Strings**

#### Session Storage

#### Local Storage

### WebSQL

Ist de facto veraltet.

### Application-Cache
  
Ist de facto veraltet.

### IndexedDB

Ist eine ***no SQL-Datenbank***. Mittlerweile gibt es stabile, sichere Versionen die gut zu nutzen sind.

### File and Directories

Wird künftig veraltet sind. Ist Chromium only.

### Cache Storage

Speichert HTTP-Responses (gesamten Response).

### File System Access

Noch nicht vollständig kompatibel, nur Chromium basierte Browser. Firefox implemetiert bis dato nur ein Subset der API. Benötigt die Einwilligung des Nutzers. Speichert Dateien.


