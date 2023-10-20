# Electron, v3 / Steve Kinney / Mitte Oktober 23

[Course Notes](https://gist.github.com/stevekinney/837ce9b2fa05ed88f6bc76d7d6e22efd) (in ./Kursmaterialien enthalten)
[Curse SLides](https://static.frontendmasters.com/resources/2023-08-18-electron-v3/electron-v3.pdf) (in ./Kursmaterialien enthalten)

**Steve's Electron Lecture Projects:**
[firesale](https://github.com/stevekinney/firesale-v3)
[Clipmaster-v3](https://github.com/stevekinney/clipmaster-v3)
[not-done](https://github.com/stevekinney/not-done)

**Electron specific:**
[Electron](https://www.electronjs.org/docs/latest/api/app)
[Electron Forge](https://www.electronforge.io/)
[Electron Fiddle](https://www.electronjs.org/fiddle)

## Takeaways

## Main / Renderer Prozess Kommunikation

### Beispiel aus firesale-v3 - Dateidialog mit auslesen und Ausgabe

**- main/index.ts Import und Konfiguration von Electron-Modulen**:
`import { app, BrowserWindow, dialog, ipcMain } from 'electron';`: Hier werden die benötigten Electron-Module importiert, darunter `app`, `BrowserWindow`, `dialog` und `ipcMain`.

```javascript
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { join } from 'path';
import { readFile } from 'node:fs/promises';

// Funktion zur Erstellung des Hauptfensters
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  // Wenn eine Dev-URL für das Hauptfenster vorhanden ist, lade diese, ansonsten lade eine HTML-Datei.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Zeige das Hauptfenster an und öffne die Entwicklertools.
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.webContents.openDevTools({
    mode: 'detach',
  });
};

// Event-Listener für den Start der Anwendung und das Schließen von Fenstern.
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Funktion zur Anzeige des Dateiauswahldialogs
const showOpenDialog = async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Markdown', extensions: ['md'] }],
  });

  if (result.canceled) return;

  const { filePaths } = result;
  const [filePath] = filePaths;

  openFile(filePath);
};

// Funktion zur Öffnung und Lesen der ausgewählten Datei
const openFile = async (filePath: string) => {
  const fileContent = await readFile(filePath, 'utf-8');

  console.log(fileContent);
};

// Event-Handler zur Verarbeitung der Anforderung aus dem Renderer-Prozess
ipcMain.on('show-open-dialog', (event) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);
  if (!browserWindow) return;
  showOpenDialog();
});
```

**- Erstellung des Hauptfensters renderer/preload.ts**:
- `const createWindow = () => { ... }`: Diese Funktion erstellt das Hauptfenster der Anwendung. Dabei werden Breite, Höhe und Web-Präferenzen konfiguriert.
- Die URL des Hauptfensters wird entweder auf eine Entwicklungsumgebung (`MAIN_WINDOW_VITE_DEV_SERVER_URL`) oder auf eine lokale HTML-Datei gesetzt, je nachdem, ob die Anwendung im Entwicklungsmodus oder im Produktionsmodus läuft.

```javascript
import { ipcRenderer, contextBridge } from 'electron';
import Elements from './renderer/elements';
import { renderMarkdown } from './renderer/markdown';

// Kommunikation zwischen Renderer-Prozess und Hauptprozess
ipcRenderer.on('file-opened', (_, content: string) => {
  Elements.MarkdownView.value = content;
  renderMarkdown(content);
});

// Exponiere die 'api'-Funktion zur Kommunikation mit dem Hauptprozess
contextBridge.exposeInMainWorld('api', {
  showOpenDialog: () => ipcRenderer.send('show-open-dialog'),
});
```

**renderer/index.ts**:

```javascript
import { renderMarkdown } from './markdown';
import Elements from './elements';

// Event-Listener für Änderungen im Markdown-Textarea
Elements.MarkdownView.addEventListener('input', async () => {
  const markdown = Elements.MarkdownView.value;
  renderMarkdown(markdown);
});

// Event-Listener für den Klick auf den "OpenFileButton"
Elements.OpenFileButton.addEventListener('click', () => {
  window.api.showOpenDialog();
});
```

Die Hauptfunktionen sind die Erstellung des Hauptfensters, das Öffnen von Dateien und die Kommunikation zwischen Haupt- und Renderer-Prozessen, um den Dateiauswahldialog und den Dateiinhalt zu verarbeiten. Bitte stelle sicher, dass die Dateipfade und Abhängigkeiten ordnungsgemäß konfiguriert sind und dass die HTML-Elemente im Renderer-Prozess vorhanden sind.

1. **Anwendungsevents**:
   - `app.on('ready', createWindow);`: Dieses Event tritt auf, wenn die App bereit ist, und löst die Funktion `createWindow` aus.
   - `app.on('window-all-closed', ... }`: Dieses Event tritt auf, wenn alle Fenster geschlossen sind, und beendet die App, es sei denn, es handelt sich um macOS (hier bleibt die App geöffnet).
   - `app.on('activate', ... }`: Dieses Event tritt auf, wenn die App aktiviert wird und erzeugt ein neues Hauptfenster, wenn keines geöffnet ist.

2. **Dateiauswahldialog**:
   - `const showOpenDialog = async () => { ... }`: Diese Funktion öffnet einen Dateiauswahldialog, der die Auswahl von Markdown-Dateien ermöglicht.
   - Wenn eine Datei ausgewählt wird, wird ihr Pfad an die Funktion `openFile` übergeben.

3. **Öffnen und Lesen der Datei**:
   - `const openFile = async (filePath: string) => { ... }`: Diese Funktion öffnet und liest den Inhalt der ausgewählten Datei. Der Dateiinhalt wird in der Konsole angezeigt.

4. **Kommunikation zwischen Haupt- und Renderer-Prozess**:
   - `ipcMain.on('show-open-dialog', (event) => { ... }`: Dieser Event-Handler wird ausgelöst, wenn der Renderer-Prozess die Funktion `showOpenDialog` anfordert. Er verwendet den `dialog.showOpenDialog`-Befehl, um den Dateiauswahldialog zu öffnen.

**renderer/preload.ts**:

1. **Import von Electron-Modulen**:
   - `import { ipcRenderer, contextBridge } from 'electron';`: Hier werden die benötigten Electron-Module für den Renderer-Prozess importiert.

2. **Kommunikation zwischen Renderer-Prozess und Hauptprozess**:
   - `ipcRenderer.on('file-opened', (_, content: string) => { ... }`: Hier wird ein Event-Handler registriert, der auf Nachrichten aus dem Hauptprozess wartet. Wenn der Hauptprozess den Dateiinhalt sendet, wird dieser im Renderer-Prozess verarbeitet und in das Textarea-Element eingefügt.
   - `contextBridge.exposeInMainWorld('api', { ... }`: Dieser Code exponiert die Funktion `showOpenDialog` zur Kommunikation mit dem Hauptprozess über die `contextBridge`.

**renderer/index.ts**:

1. **Import von Modulen und Elementen**:
   - Hier werden die benötigten Module und HTML-Elemente importiert, darunter die Funktion `renderMarkdown` und die HTML-Elemente aus der Datei `elements`.

2. **Event-Listener für Änderungen im Markdown-Textarea**:
   - `Elements.MarkdownView.addEventListener('input', async () => { ... }`: Dieser Event-Listener reagiert auf Änderungen im Textbereich und ruft die Funktion `renderMarkdown` auf, um den Markdown-Inhalt zu rendern.

3. **Event-Listener für den Klick auf den "OpenFileButton"**:
   - `Elements.OpenFileButton.addEventListener('click', () => { ... }`: Dieser Event-Listener wird aktiviert, wenn der "OpenFileButton" geklickt wird. Er ruft die Funktion `window.api.showOpenDialog` auf, um den Dateiauswahldialog zu öffnen.

Diese Struktur ermöglicht die Kommunikation zwischen Haupt- und Renderer-Prozessen und die Handhabung der Dateiauswahl und Anzeige des Dateiinhalts im Renderer-Prozess. Bitte stelle sicher, dass alle Abhängigkeiten korrekt installiert sind und die HTML-Elemente im Renderer-Prozess vorhanden sind.

