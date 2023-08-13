# Allgemeine Notizen

## Javascript

+ LocalServer ist das emulieren einer Website, damit lokale Pfade für Ressourcen funktionieren (CORS)
+ Chrome Workspaces: index.html öffnen und dann Projektfolder reinziehen, dann kann man im Browser arbeiten und die Dateien lokal verändern
+ Javascript kann man über iframes ausführen

## Search Engine Optimation

+ Suchmaschinen ranken dich umso höher, wenn: Eine Website auf dich verlinkt, die viel Einfluss hat und selbst wenig verlinkt.
+ Facebook Open Graph Tags: Canonical url: <meta property="og:url" content="http://...." /> kann man eine html "id" festlegen, wenn sich die eigentliche ändert, findet man das Doikument trotzdem. og:type kann verschiedene Sachen zu FB-Card hinzufügen. og:title, og:description, og:image og:image/width or height image is cached for lifetime, wenn man etwas falscheingibt muss man die url ändern


## Job

requestAnimationFrame() ist ein globales window Objekt und wird jedesmal gecalled, wenn ein neuer Frame exekutiert wird. Damit lassen sich gschmeidige Animationen erstellen.

Davon mehr: Design Systeme, Web Accessability, Anwendung von API's (Vets-who-code api list), Cloud Computing und Serverless Technologie (serverless.css-tricks.com), Github Profil, Portfolio.

Anstellungskreis: Social Contents <-> Website <-> Phone-Calls
Mach etwas, zeige es, gehe in die Offensive.

## Professional

###  JS Hard Parts v2

#### Funktionen

+ ***Execution context***: Eine Funktion stellt in Javascript einen neuen Ausführungskontext (en.: execution context) dar, da ein neuer "Thread of Execution" und ein neuer lokaler Speicher zur Verfügung gestellt wird.
    + Die Funktionsdefinition und der Name wird im ***global()*** Ausführungkontext gespeichert: Label -> Funktionsname & value _> Funktionsdefinition.
    + Man spicht allgemein zb.: von einer Konstanten Variable / einem Array / usw... im globalen Ausführungskontext vs. im lokalen Ausführungskontext.
    + Loops haben keinen eigene Ausführungkontext, aber einen eigenen Namespace
+ ***return***: Mit return schickt JS den zurückgegebenen Wert vom für die Funktion lokalen Speicher an die Speicheradresse im Programmspeicher, an der die Variable engelegt ist, zu welcher der Funktionsaufruf evaluiert wird.
+ Im ***call stack*** representiert die Funktion ***global()*** den Ausführungskontext des JS Programms dar und ist immer 'ganz unten'.
+ ***Wichtige Ausführungselemente***: Um den Vorgang bei einem Funktionsaufruf abzubielden benötigt man 3 Elemente: Global Memory, Local Memory, Call Stack




## ThePrimeagen

### Algorhytmik

Zeitkomplexität lässt sich oft an den Loops erkennen.Allgemeine

Ein Arrray ist ein kontinuierlicher Speicherplatz zu dem referenziert werden kann. Ein 8 Bit Array hat ein Offset = 8
a + width of Datatype * offset ist für einen 8 Bit Array a + width of Datatype zb 1 für char * 8 

Konstante Zeit bedeutet eine gleichbleibende Dauer für die Aktion (wie lange sie auch dauern mag), nicht 1 Aktion.  

+ Big Omega Ω  ist der beste Fall 
+ Big Theta Θ ist der durchschnittliche Fall
+ Big O O ist der schlechteste Fall
... die eine Funktion für die Ausführung benötigt. O(n) bedeutet, mann muss zb.: den gesamten Array durchsuchen und bekommt dann false, also das gesuchte Element wurde nicht gefunden. 


## Näher anschauen

+ ArrayBuffer, const a = Uint8Aray() => a[2] = 45, über console ausgeben! usw..



