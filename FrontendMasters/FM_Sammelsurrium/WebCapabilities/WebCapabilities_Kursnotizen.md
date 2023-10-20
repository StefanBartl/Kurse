# A Tour of Web Capabilities / Maximiliano Firtman, Producer, Author / Ende September 23

[Kurswebsite](https://firtman.github.io/capabilities/)
[Kursslides](https://firtman.github.io/capabilities/)
[Kursrepo](https://github.com/firtman/capabilities)
[Transkript.zip](https://static.frontendmasters.com/assets/courses/2023-07-11-device-web-apis/transcripts.zip)

## Takeaways

+ ***WKWebView*** ist das Webkit  bzw. die ***Web Rendering Engine (WRE)*** auf Geräten mit iOS und iPadOs (Also keine Mac's betroffen). Diese lässt keine andere WRE auf dem Gerät zu und so ist Google Chrome, Edge, Brave usw... nur ein Safari Scheme.
Google Chrome User Agent on iPhone: CriOS (Chrome for iOS anstatt von Chrome)

+ [Chrome Test APIs](https://developer.chrome.com/origintrials/#/trials/active)

+ Geolocation API: Wird auch für Maps benutzt. Funktioniert bevorzugt über Wi-Fi, indem die Access Points der Umgebung gescannt, deren Daten ausgewertet und mit der Goggle Datenbank abgeglichen werden. Diese wird durch die Google Cars WiFi Antennen und unserer Smartphones laufend aktualisiert (wenn viele User einen neuen Access Point oder eine neue SSID melden, wird diese hinzugefügt). Wenn kein Wi-Fi verfügbar ist sendet das Device die Liste der umgebenden Access-Points über 5G/4G  Gibt es keine Daten von Acces-Points kann GPS benutzt weerden, dies verbraucht aber weitem mehr Batterie, da es die Timestamps der Satelliten über Radiosignale empfangen muss und kann bis zu mehrere Minuten dauern. Ein Gerät ohne SIM-Karte benutzt GPS.
Bekommt man im `coords.altitude: null` ist das ein Hinweis darauf, dass man Wi-Fi Daten benutzt hat. Es ist aber auch möglich, mit Wi-Fi Daten einen Wert zu bekommen. Mit GPS bekommt man immer Longitude und Altitude.


