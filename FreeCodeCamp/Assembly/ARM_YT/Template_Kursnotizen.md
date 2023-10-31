# Assembly Language Programming with ARM  /  Scott Cosentino / Anfang November 23'

## Takeaways

+
+
+

## KOMMANDOS

**SWI Software Interrupt**
Der "SWI" (Software Interrupt) Befehl in der ARM-Assembler-Programmierung wird verwendet, um das Betriebssystem aufzufordern, eine spezifische Aufgabe oder Funktion auszuführen. Dies geschieht, indem in Register r7 ein SVC-Nummerncode platziert wird, der die gewünschte Aktion definiert. Der SWI-Befehl löst dann den Software Interrupt aus, wechselt in den Betriebssystemmodus und führt die entsprechende Funktion aus, abhängig vom übergebenen Nummerncode. Die genauen Funktionen und Codes variieren je nach Betriebssystem und Implementierung.

## REGISTER

**r0 - r6: Allgemeine Verwendung:**
Diese Register sind allgemeine Zweckregister und werden oft für temporäre Daten und Parameterübertragung zwischen Funktionen verwendet. In ARM-Assembler-Code können sie vielfältige Aufgaben erfüllen.

**r7 (auch als r11 in einigen Kontexten bezeichnet):**
Systemaufrufe, die in einem Table hinterlegt sind wie (zb.: 1 steht für Programm beenden) und mehr: r7 wird oft als der "Link Register" verwendet, um die Rücksprungadresse für Funktionen zu speichern, sodass diese zur Aufrufstelle zurückkehren können. Es ist jedoch wichtig zu beachten, dass r7 in einigen Kontexten auch für Systemaufrufe (SWI - Software Interrupts) verwendet wird, um auf bestimmte Betriebssystemfunktionen zuzugreifen. Die Verwendung von r7 hängt stark von der konkreten Anwendung ab. 

**lr (Link Register):**
Speichert die Adresse zu der eine Funktion zurückgeben soll. Wenn eine Funktion beendet wird, wird der Befehl BX lr (Branch and Exchange with Link Register) verwendet, um zur gespeicherten Adresse zurückzukehren.

**pc (Program Counter):**
pc ist der Programmzähler, der die Adresse des nächsten auszuführenden Befehls enthält. Er wird automatisch aktualisiert, wenn Befehle ausgeführt werden.

**cpsr (Current Program Status Register):**
cpsr speichert Informationen über den aktuellen Status des Prozessors, wie beispielsweise Flags, die auf Bedingungen nach Ausführung von Befehlen hinweisen. Diese Flags umfassen das Zero-Flag (Z), das Negative-Flag (N), das Carry-Flag (C), das Overflow-Flag (V) und andere. Es wird verwendet, um Bedingungen in bedingten Sprüngen zu überprüfen.

**spsr (Saved Program Status Register):**
spsr ist ein Register, das in Verbindung mit Ausnahmebehandlungsroutinen verwendet wird. Wenn eine Ausnahme auftritt, wird der Status des cpsr in das spsr dieses Modus gesichert. Dadurch kann der Prozessor nach Abschluss der Ausnahmebehandlung wieder in seinen vorherigen Zustand zurückkehren.


## Basiswissen

### Negativer Zahlen

#### One's and Two's Compliment

**One's Complement:**
Bei der Darstellung von negativen Zahlen im "one's complement" wird das Bitmuster einer negativen Dezimalzahl erzeugt, indem alle Bits der positiven Zahl umgekehrt werden. Das bedeutet, dass 0 zu 1 wird und umgekehrt. Dies führt dazu, dass es zwei Darstellungen für die Null gibt (positiv und negativ). Zum Beispiel wird die Dezimalzahl -3 im "one's complement" als 1110 dargestellt.

**Two's Complement:**
Die "two's complement"-Darstellung ist eine der gebräuchlichsten Methoden zur Darstellung von negativen Binärzahlen. Hierbei wird die Binärzahl negiert (alle Bits umgekehrt) und dann 1 zum Ergebnis hinzugefügt. Das bedeutet, dass es nur eine Darstellung der Null gibt. Zum Beispiel wird die Dezimalzahl -3 im "two's complement" als 1101 dargestellt.

**Der Unterschied zwischen beiden liegt in der Darstellung der Null und in der Art und Weise, wie Überträge behandelt werden.** Bei "one's complement" gibt es eine negative und eine positive Null, während bei "two's complement" nur eine Null existiert. "Two's complement" hat den Vorteil, dass arithmetische Operationen wie Addition und Subtraktion natürlicher ablaufen, da es nur eine Null gibt und keine speziellen Regeln für das Behandeln von Überträgen notwendig sind.
