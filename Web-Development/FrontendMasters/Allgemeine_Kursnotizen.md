
## Javascript

+ LocalServer ist das emulieren einer Website, damit lokale Pfade für Ressourcen funktionieren (CORS)
+ Chrome Workspaces: index.html öffnen und dann Projektfolder reinziehen, dann kann man im Browser arbeiten und die Dateien lokal verändern
+ Javascript kann man über iframes ausführen
+ requestAnimationFrame() ist ein globales window Objekt und wird jedesmal gecalled, wenn ein neuer Frame exekutiert wird. Damit lassen sich gschmeidige Animationen erstellen.


## Search Engine Optimation

+ Suchmaschinen ranken dich umso höher, wenn: Eine Website auf dich verlinkt, die viel Einfluss hat und selbst wenig verlinkt.
+ Facebook Open Graph Tags: Canonical url: <meta property="og:url" content="http://...." /> kann man eine html "id" festlegen, wenn sich die eigentliche ändert, findet man das Doikument trotzdem. og:type kann verschiedene Sachen zu FB-Card hinzufügen. og:title, og:description, og:image og:image/width or height image is cached for lifetime, wenn man etwas falscheingibt muss man die url ändern

## Cheatsheet

+ `curl cht.sh/....`
```
curl cht.sh/find~exec
curl cht.sh/javascript/splice+array
curl cht.sh/typescript/enum
curl cht.sh/typescript/enum+string
```


## Näher anschauen

+ `find ~/Development -type f -exec  grep -H "Cheatsheet" {} +` sucht nach dem Text Cheatsheet rekursiv im Verzeichnis Development und gibt den Daateinamen aus 
+ `find /Development -type f -exec sed -i 's/Cheatsheet/Aha/g' {} +` ersetzt Cheatsheet durch Aha
+ `sed 's/old_text/new_text/g' input.txt > output.txt` In diesem Beispiel wird der Befehl sed verwendet, um alle Vorkommnisse von "old_text" in der Datei input.txt durch "new_text" zu ersetzen. Das Ergebnis wird in die Datei output.txt geschrieben.


+ ArrayBuffer, const a = Uint8Aray() => a[2] = 45, über console ausgeben! usw..



