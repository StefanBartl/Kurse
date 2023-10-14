# WKD Browser Engineering

- [WKD Browser Engineering](#wkd-browser-engineering)
  - [Takeaways](#takeaways)
  - [Event Loop](#event-loop)

## Takeaways

-

## Event Loop

1. **Ausführung des Skripts:** Der Event-Loop beginnt, indem er das Ausgangsskript ausführt. Dies kann der Hauptcode Ihrer Webseite oder eine externe JavaScript-Datei sein.

2. **Parsing und DOM-Aufbau:** Während des Parsens des Skripts wird der DOM aufgebaut, der die hierarchische Struktur der Webseite darstellt.

3. **Layout- und Paint-Engine:** Sobald der DOM aufgebaut ist, berechnet die Layout-Engine die Positionen und Größen der DOM-Elemente, und die Paint-Engine zeichnet die Webseite basierend auf diesen Informationen.

4. **Ausführung von JavaScript:** Wenn JavaScript im Skript aufgerufen wird, wird es in den Call Stack gelegt und ausgeführt. Dies beinhaltet Funktionen, Ereignis-Handler und andere Codeabschnitte.

5. **Microtasks:** Nachdem der Call Stack geleert ist, werden Microtasks verarbeitet. Dies umfasst Promises und Mutation Observer-Ereignisse, die eine höhere Priorität haben.

6. **Warteschlangen (Queues):** Verschiedene Arten von Aufgaben werden in die Warteschlangen eingereiht, z. B. Ereignisse (z.B. Mausklicks, Tastatureingaben), Timer (z.B. `setTimeout`), AJAX-Anfragen und Animation Frames. Diese Aufgaben warten auf die Ausführung.

7. **Timer-Verwaltung:** Der Event-Loop überwacht Timer und wartet auf das Ablaufdatum. Wenn ein Timer abläuft, wird die zugehörige Aufgabe in den Call Stack verschoben.

8. **Ereignisverarbeitung:** Ereignisse werden aus den Ereignisschleifen (Event Queues) entnommen und in den Call Stack verschoben, um verarbeitet zu werden. Dies ermöglicht die Reaktion auf Benutzerinteraktionen und andere Ereignisse.

9. **Animation Frames:** Falls erforderlich, versucht der Browser, Animation Frames zu zeichnen, um flüssige Animationen zu ermöglichen. Dies erfolgt oft mit `requestAnimationFrame`.

10. **Browser API's wue zb.: Web Worker-Kommunikation:** Wenn Web Workers im Einsatz sind, kann der Haupt-Thread Nachrichten an und von Web Workern senden und empfangen.

11. **Wiederholung:** Nach Abschluss aller Aufgaben kehrt der Event-Loop zum Anfang zurück und beginnt erneut, um auf neue Ereignisse und Aufgaben zu warten. Dieser Prozess wiederholt sich kontinuierlich, um die Webseite reaktionsfähig zu halten.
