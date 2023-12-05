# Rock-Paper-Scissors

# Game-Guide
A web app version of the popular classic.
The game begins by clicking on the start button. Choose either rock, scissors or paper and click on the corresponding symbol.
Rock beats scissors, scissors cut paper and paper wraps rock!
After your selection, the computer decides about its selection via a random number generator.
The game is played in 5 won rounds - whoever wins 5 rounds first is the winner!

You can switch the language between English / Germin via click on "en/de" on the bottom-center.

This is an educational project to learn and apply basic HTML, CSS3 & Javascript workflows and algorithms.

# Developer-Guide
The game is entirely in English/German. The translation is initiated by querying the browser language set via the navigator.language method (and saved in localStorage) and then the corresponding language libraries are loaded.

The game screen elements are initially hidden and the start screen elements are displayed. With a click on the start screen this is reversed. If you click on a game symbol, the corresponding string, "stone" is saved in an HTML and saved and displayed as "You have chosen:" "stone". With the click, the simple random number generator Math.random is triggered, which returns a number between 0 and 1. If the number is below 0.34, the CPU also chooses rock, between 0.34 and 0.67 chooses scissors, and above 0.67 paper. The CPU selection is then compared against the player selection using a simple if-else loop and the winner is determined, the winner gets the score increased by 1.
After each round, an evaluation is made as to whether someone has won 5 rounds, if not, a new round is initiated by the player clicking on a game symbol and the whole thing starts all over again.
If someone has won 5 rounds, the window.confirm method is triggered and the winner is informed.

Clicking on OK resets the game to 0, clicking on Cancel takes you back to the start screen.

The animations are implemented exclusively via CSS3 Transition & Animations. External libraries were not used.

# === Special credits to ===

The Odin Project - the place where i used to learn Web Development: 

https://www.theodinproject.com/
If you want to learn web development, especially on your own, I can't recommend a better website. Self-discipline and motivation required!

Stackoverflow and the great Developers there which help me a lot:
https://www.stackoverflow.com/

Representative for all the great Youtube-Channels about Web-Development Kevin Powell, for his super useful
Channel about  CSS:
https://www.youtube.com/kepowob

Iconmonstr & Simpleicon for the free SVG & PNG-Icons:
https://www.iconmonstr.com/    https://www.simpleicon.org/

Freesound, Open Gam Art &  Inkompetech for the free Audio-Files:
https://www.freesound.com, https://www.opengameart.org, https://www.inkompetech.com

This project is made with Visual Studio Code, Chrome/Firefox, Git and GitHub on a Linux Ubuntu OS.
Thanks to all of the people which made that or working there.

# === Thanks to all of you guys ===
Without the professional work of those mentioned here, but also all the others in the open source community
it would not be possible or extremely difficult for people like me to achieve my dreams. Please keep your spirit and your mindset: A big thank you to everyone who feels addressed now!

A few words to the readers of the Javascript / CSS Files: 
The code is - as you can see - sufficiently commented and structured. For some programmers this might seem strange, but for me and my way of coding it is extremely helpful. I like to use whitespace for formatting, i also describe the individual processes with comments in as much detail as it is useful for me so that I can get back to work reliably and quickly after a while. his makes working on projects for me a lot easier.

If you have any comments, suggestions for improvement or criticism of the project, please contact me! 

You find my actual contact here: https://stefanbartl.github.io/Portfolio/

I am very excited about it!

# = HTML, CSS & Javascript - what wonderful, tricky languages. =

Also a big and heartfelt thank you to all my friends and family for the support you always give me. 

=== Feel embraced! ===

​		

​			  Stefan Bartl

​		(WKDSteve or WKDMinerva)

​			Vienna | Austria

​			 April, 2022

     Loving Science, Tech & Peace !

============================================================================================================================

#  #README.md/Deutsch

=============================================

# Spielanleitung
Eine Wep-App Version des beliebten Klassikers.
Mit klick auf den Start Button beginnt das Spiel. Such dir entweder Stein, Schere oder Papier aus und klicke auf das entsprechende Symbol. 
Stein schlägt Schere, Schere schneidet Papier und Papier umhüllt Stein!
Nach deiner Auswahl entscheidet der Computer über einen zufallsgenerator über seine Auswahl.
Gespielt wird auf 5 gewonne Runden - wer zuerst 5 Runden für sich entscheidet, ist der Sieger!

Die Sprache lässt sich mit einen Klick auf "en/de" am unteren mittigen Bildschirmrand wechseln. 

Dies ist ein Projekt zu Lernzwecken um Basisabläufe und Algorhytmen von HTML, CSS3 & Javascript zu erlernen und anzuwenden.

# Developer-Guide
Das Spiel ist komplett in Englisch/Deutsch. Die Übersetzung wird über eine Abfrage der eingestellten Browsersprache via der navigator.language Methode initiert (und im localStorage gespeichert) und danach die entsprechend angelegeten Sprachbibliotheken geladen. 

Die Elemente des Spieldbildschirmes werden zu Beginn ausgeblendet und die Elemente des Startbildschirms eingeblendet. Mit einen Klick auf den Startbildschirm wird dies umgekehrt. Klickt man ein Spielsymbol, wird der enstprechende String, "Stein" in ein HTML gespeichert und als "Du hast gewählt:" "Stein" gespeichert und angezeigt. Mit dem Klick wird der einfache Zufallsgenerator Math.random ausgelöst, der eine Zahl zwishen 0 und 1 zurückgibt. Ist die Zahl unter 0,34, wählt der CPU auch Stein, ist sie zwischen 0,34 und 0,67 wählt der Schere und über 0,67 Papier. Die CPU Auswahl wird dann mit einer simpülen if-else Schleife gegen die Spieler Auswahl verglichen und der Sieger ermittelt, der Gewinner bekommt den Score um 1 angehoben. 
Nach jeder Runde Runde wird evaluiert ob jemand 5 Runden gwonnen hat, wenn nicht wird eine neue Runde wiederum per Spieler-Klick auf ein Spielsymbol eingeleitet und das ganze geht von vorne los.
Hat jemand 5 Runden gewonnen, wird die window.confirm Methode ausgelöst und der Gewinner informiert. 

Mit einem Klick auf OK wird das Spiel wieder auf 0 gesetz, mit KLick auf Cancel gehört man zum Startbildschirm zurück.

Die Animationen sind ausschließlich via CSS3 Transition & Animationen umgesetzt. Auf externe Bibliotheken wurde verzichtet.   

# === Besondere Anerkennung geht an ===

Das Odin-Projekt - der Ort, an dem ich Webentwicklung "von der Picke auf" gelernt habe:

https://www.theodinproject.com/

Wenn du Webentwicklung lernen möchtest, insbesondere auf eigene Faust, kann ich keine bessere Website empfehlen. Selbstdisziplin und Motivation ist jedoch erforderlich!

Stackoverflow und die großartigen Entwickler-Community dort:
https://www.stackoverflow.com/

Stellvertretend für all die tollen Youtube-Kanäle zum Thema Web-Entwicklung Kevin Powell, für seinen herrvoragendenden
Kanal über CSS:
https://www.youtube.com/kepowob

Iconmonstr & Simpleicon für die kostenlosen SVG & PNG-Icons die ich gerne verwende:
https://www.iconmonstr.com/ https://www.simpleicon.org/

Freesound, Open Gam Art & Inkompetech für die kostenlosen Audio-Files:
https://www.freesound.com, https://www.opengameart.org, https://www.inkompetech.com

Dieses Projekt wurde mit Visual Studio Code, Chrome/Firefox, Git und GitHub auf einem Linux-Ubuntu-Betriebssystem erstellt.
Danke an alle Leute, die diese Applikationen am Leben halten oder dort arbeiten.

# === Danke an euch alle ===

Ohne die professionelle Arbeit der hier genannten, aber auch aller anderen in der Open-Source-Community
wäre es für Menschen wie mich nicht möglich oder zumindest extrem schwierig, meine Träume zu verwirklichen. Bitte bewahrt euren  Spirit und euer Mindset: Ein großes Dankeschön an alle, die sich jetzt angesprochen fühlen!

Ein paar Worte an die Leser der Javascript/CSS-Dateien:
Der Code ist - wie man sieht - häufig kommentiert und strukturiert. Für manche Programmierer mag das seltsam erscheinen, aber für mich und meine Art zu codieren ist es extrem hilfreich. Zur Formatierung verwende ich gerne Leerzeichen, auch beschreibe ich die einzelnen Vorgänge mit Kommentaren so ausführlich wie es für mich sinnvoll erscheint, damit ich mich nach einiger Zeit zuverlässig und schnell wieder an die Arbeit machen kann. Das erleichtert mir die Arbeit an Projekten erheblich.

Wenn du Anmerkungen, Verbesserungsvorschläge oder Kritik zum Projekt hast, kontaktiere mich bitte!

Meinen aktuellen Kontakt findest du hier: https://stefanbartl.github.io/Portfolio/

Ich freue mich sehr darauf!

# = HTML, CSS & Javascript - was für wunderbare, knifflige Sprachen. =

Auch ein großes und herzliches Dankeschön an alle meine Freunde und Familie für die Unterstützung, die sie mir stets bei allem geben. Ohne euch wäre NICHTS möglich!

=== Fühlt euch umarmt! ===



​		 Stefan Bartl

 (WKDSteve oder WKDMinerva)

 	 Wien | Österreich

​		April 2022

Liebe, Wissenschaft, Technik & Frieden!