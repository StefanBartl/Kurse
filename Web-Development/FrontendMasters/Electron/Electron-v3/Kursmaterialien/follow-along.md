# Electron, v3

- [Firesale](#firesale)
  * [Showing the Window When It's Ready](#showing-the-window-when-it-s-ready)
  * [Opening the Native File Dialog](#opening-the-native-file-dialog)
  * [Filtering Accepted File Types](#filtering-accepted-file-types)
  * [Reading the File](#reading-the-file)
    + [Separating showOpenFileDialog from Reading the File](#separating-showopenfiledialog-from-reading-the-file)
  * [Attaching the Dialog to the Correct Window in macOS](#attaching-the-dialog-to-the-correct-window-in-macos)
  * [Receiving in the Renderer](#receiving-in-the-renderer)
  * [Rendering the File](#rendering-the-file)
  * [Attaching to the "Open File" Button](#attaching-to-the--open-file--button)
  * [Exporting HTML](#exporting-html)
  * [Saving a Markdown File](#saving-a-markdown-file)
  * [Keeping Track of the Current File (Part I)](#keeping-track-of-the-current-file--part-i-)
    + [Setting the Document Title](#setting-the-document-title)
  * [Keeping Track of the Current File](#keeping-track-of-the-current-file)
  * [Checking for Unsaved Changes](#checking-for-unsaved-changes)
  * [Going Back to a Sending IPC Messages](#going-back-to-a-sending-ipc-messages)
  * [Setting the Edited Status on macOS](#setting-the-edited-status-on-macos)
  * [Reverting the Changes](#reverting-the-changes)
    + [Or, Leveraging file-opened](#or--leveraging-file-opened)
  * [Solutions: Open in File System and Open in Default Application](#solutions--open-in-file-system-and-open-in-default-application)
  * [Adding to Recent Documents](#adding-to-recent-documents)
  * [Setting Up Application Menus](#setting-up-application-menus)
  * [Fixing the Menu for macOS](#fixing-the-menu-for-macos)
  * [Adding Keyboard Shortcuts](#adding-keyboard-shortcuts)
- [Clipmaster](#clipmaster)
  * [Tweaking the Window](#tweaking-the-window)
  * [Making Types Easier](#making-types-easier)
  * [Writing to the Clipboard](#writing-to-the-clipboard)
  * [Copy from Clipboard](#copy-from-clipboard)
  * [Adding Global Shortcuts](#adding-global-shortcuts)
  * [Creating a Keyboard Shortcut for Writing to Clipmaster](#creating-a-keyboard-shortcut-for-writing-to-clipmaster)
  * [Adding Notifications](#adding-notifications)
    + [Exercise: Add a Notification When the Global Shortcut is Triggered](#exercise--add-a-notification-when-the-global-shortcut-is-triggered)
  * [Unregistering Global Shortcuts](#unregistering-global-shortcuts)
  * [Context Menus](#context-menus)
  * [Adding a Tray Icon](#adding-a-tray-icon)
  * [Making a Menubar Application](#making-a-menubar-application)
    + [Removing the Ability to Close the Window](#removing-the-ability-to-close-the-window)
- [Not Done Yet](#not-done-yet)
  * [Using Native Modules](#using-native-modules)

# Firesale

## Showing the Window When It's Ready

```ts
const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  show: false,
  webPreferences: {
    preload: join(__dirname, 'preload.js'),
  },
});
```

```ts
mainWindow.once('ready-to-show', () => {
  mainWindow.show();
  mainWindow.focus();
});
```

## Opening the Native File Dialog

In the main process:

```typescript
const showOpenDialog = async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
  });

  console.log(result);
};
```

Let's start by just showing it when the process starts up.

```typescript
mainWindow.once('ready-to-show', () => {
  mainWindow.show();
  mainWindow.focus();
  showOpenDialog();
});
```

## Filtering Accepted File Types

```typescript
const result = await dialog.showOpenDialog({
  properties: ['openFile'],
  filters: [{ name: 'Markdown', extensions: ['md'] }],
});
```

## Reading the File

```typescript
import { readFile } from 'node:fs/promises';
```

```typescript
const showOpenDialog = async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
  });

  const file = await readFile(result.filePaths[0], 'utf-8');

  console.log(file);
};
```

### Separating showOpenFileDialog from Reading the File

```typescript
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

const openFile = async (filePath: string) => {
  const fileContent = await readFile(filePath, 'utf-8');

  console.log(fileContent);
};
```

## Attaching the Dialog to the Correct Window in macOS

```typescript
const showOpenDialog = async (browserWindow: BrowserWindow) => {
  const result = await dialog.showOpenDialog(browserWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Markdown', extensions: ['md'] }],
  });

  if (result.canceled) return;

  const { filePaths } = result;
  const [filePath] = filePaths;

  openFile(filePath, browserWindow);
};
```

```typescript
mainWindow.once('ready-to-show', () => {
  mainWindow.show();
  mainWindow.focus();
  showOpenDialog(mainWindow);
});
```

```ts
const openFile = async (browserWindow: BrowserWindow, filePath: string) => {
  const fileContent = await readFile(filePath, 'utf-8');

  browserWindow.webContents.send('file-opened', fileContent, filePath);
};
```

```typescript
const openFile = async (browserWindow: BrowserWindow, filePath: string) => {
  const fileContent = await readFile(filePath, 'utf-8');

  browserWindow.webContents.send('file-opened', fileContent, filePath);
};
```

## Receiving in the Renderer

In `preload.ts`:

```typescript
import { ipcRenderer } from 'electron';

ipcRenderer.on('file-opened', (_, file, content) => {
  console.log('file-opened', { file, content });
});
```

## Rendering the File

```typescript
ipcRenderer.on('file-opened', (_, content) => {
  Elements.MarkdownView.value = content;
  renderMarkdown(content);
});
```

## Attaching to the "Open File" Button

In `main/index.ts`:

```diff
@@ -27,7 +27,6 @@ const createWindow = () => {
   mainWindow.once('ready-to-show', () => {
     mainWindow.show();
     mainWindow.focus();
-    showOpenDialog(mainWindow);
   });
 };
```

In `preload.ts`:

```ts
contextBridge.exposeInMainWorld('api', {
  showOpenDialog: () => ipcRenderer.send('show-open-dialog'),
});
```

In `electron.d.ts`:

```ts
declare interface Window {
  api: {
    showOpenDialog: () => void;
  };
}
```

In `render/index.ts`:

```ts
Elements.OpenFileButton.addEventListener('click', () => {
  window.api.showOpenDialog();
});
```

In `main/index.ts`:

```ts
ipcMain.on('show-open-dialog', (event) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);

  if (!browserWindow) return;

  showOpenDialog(browserWindow);
});
```

## Exporting HTML

`dialog` also has another method called `showSaveDialog`.

In `src/electron.d.ts`:

```typescript
declare interface Window {
  api: {
    showOpenDialog: () => void;
    showExportHtmlDialog: (html: string) => void;
  };
}
```

In `main/index.ts`:

```ts
const exportHtml = async (filePath: string, html: string) => {
  await writeFile(filePath, html);
  ipcMain.emit('html-exported', filePath);
};
```

```ts
const showExportHtmlDialog = async (
  browserWindow: BrowserWindow,
  html: string,
) => {
  const result = await dialog.showSaveDialog(browserWindow, {
    properties: ['showOverwriteConfirmation'],
    filters: [{ name: 'HTML', extensions: ['html'] }],
  });

  if (result.canceled) return;

  const { filePath } = result;

  if (!filePath) return;

  exportHtml(filePath, html);
};
```

```ts
ipcMain.on('show-export-html-dialog', (event, html) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);

  if (!browserWindow) return;

  showExportHtmlDialog(browserWindow, html);
});
```

In `preload.ts`:

```ts
contextBridge.exposeInMainWorld('api', {
  showOpenDialog: () => ipcRenderer.send('show-open-dialog'),
  showExportHtmlDialog: (html: string) => {
    ipcRenderer.send('show-export-html-dialog', html);
  },
});
```

## Saving a Markdown File

In `src/electron.d.ts`:

```typescript
declare interface Window {
  api: {
    showOpenDialog: () => void;
    showExportHtmlDialog: (html: string) => void;
    showSaveDialog: (content: string) => void;
  };
}
```

In `main/index.ts`:

```ts
ipcMain.on('show-save-dialog', (event, content) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);

  if (!browserWindow) return;

  showSaveDialog(browserWindow, content);
});
```

```ts
const showSaveDialog = async (
  browserWindow: BrowserWindow,
  content: string,
) => {
  const result = await dialog.showSaveDialog(browserWindow, {
    properties: ['showOverwriteConfirmation'],
    filters: [{ name: 'Markdown', extensions: ['md'] }],
  });

  if (result.canceled) return;

  const { filePath } = result;

  if (!filePath) return;

  saveFile(browserWindow, content, filePath);
};
```

```ts
const saveFile = async (
  browserWindow: BrowserWindow,
  content: string,
  filePath: string,
) => {
  await writeFile(filePath, content);
  browserWindow.webContents.emit('file-saved', filePath);
};
```

In `preload.ts`:

```ts
contextBridge.exposeInMainWorld('api', {
  showOpenDialog: () => ipcRenderer.send('show-open-dialog'),
  showExportHtmlDialog: (html: string) => {
    ipcRenderer.send('show-export-html-dialog', html);
  },
  showSaveDialog: (content: string) =>
    ipcRenderer.send('show-save-dialog', content),
});
```

In `renderer/index.ts`:

```ts
Elements.MarkdownView.addEventListener('input', async () => {
  const markdown = Elements.MarkdownView.value;
  Elements.SaveMarkdownButton.disabled = markdown.length === 0;
  renderMarkdown(markdown);
});
```

```ts
Elements.SaveMarkdownButton.addEventListener('click', () => {
  const content = Elements.MarkdownView.value;
  window.api.showSaveDialog(content);
});
```

## Keeping Track of the Current File (Part I)

In `main.js`:

```ts
const updateCurrentFile = (browserWindow: BrowserWindow, filePath: string) => {
  browserWindow.setRepresentedFilename(filePath);
};
```

```ts
const openFile = async (browserWindow: BrowserWindow, filePath: string) => {
  const fileContent = await readFile(filePath, 'utf-8');

  browserWindow.webContents.send('file-opened', fileContent, filePath);
  updateCurrentFile(browserWindow, filePath);
};
```

```ts
const saveFile = async (
  browserWindow: BrowserWindow,
  content: string,
  filePath: string,
) => {
  await writeFile(filePath, content);
  browserWindow.webContents.emit('file-saved', filePath);
  updateCurrentFile(browserWindow, filePath);
};
```

### Setting the Document Title

```typescript
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { readFile, writeFile } from 'node:fs/promises';
import { join, basename } from 'path';

const updateCurrentFile = (browserWindow: BrowserWindow, filePath: string) => {
  browserWindow.setRepresentedFilename(filePath);
  basename(filePath);
  browserWindow.setTitle(`${basename(filePath)} - ${app.name}`);
};
```

## Keeping Track of the Current File

In `main/index.ts`

```ts
type File = {
  filePath?: string;
};

const currentFile: File = {};
```

```ts
const updateCurrentFile = (browserWindow: BrowserWindow, filePath: string) => {
  browserWindow.setRepresentedFilename(filePath);
  currentFile.filePath = filePath;
  basename(filePath);
  browserWindow.setTitle(`${basename(filePath)} - ${app.name}`);
};
```

```diff
--- a/src/main/index.ts
+++ b/src/main/index.ts
@@ -1,9 +1,18 @@
 import { app, BrowserWindow, dialog, ipcMain } from 'electron';
 import { readFile, writeFile } from 'node:fs/promises';
-import { join } from 'path';
+import { join, basename } from 'path';
+
+type File = {
+  filePath?: string;
+};
+
+const currentFile: File = {};

 const updateCurrentFile = (browserWindow: BrowserWindow, filePath: string) => {
   browserWindow.setRepresentedFilename(filePath);
+  currentFile.filePath = filePath;
+  basename(filePath);
+  browserWindow.setTitle(`${basename(filePath)} - ${app.name}`);
 };

 const createWindow = () => {
@@ -112,18 +121,19 @@ const exportHtml = async (
   browserWindow.webContents.emit('html-exported', filePath);
 };

-ipcMain.on('show-save-dialog', (event, content) => {
+ipcMain.on('show-save-dialog', async (event, content) => {
   const browserWindow = BrowserWindow.fromWebContents(event.sender);

   if (!browserWindow) return;

-  showSaveDialog(browserWindow, content);
+  const fileName = await showSaveDialog(browserWindow);
+
+  if (!fileName) return;
+
+  saveFile(browserWindow, content, fileName);
 });

-const showSaveDialog = async (
-  browserWindow: BrowserWindow,
-  content: string,
-) => {
+const showSaveDialog = async (browserWindow: BrowserWindow) => {
   const result = await dialog.showSaveDialog(browserWindow, {
     properties: ['showOverwriteConfirmation'],
     filters: [{ name: 'Markdown', extensions: ['md'] }],
@@ -135,7 +145,7 @@ const showSaveDialog = async (

   if (!filePath) return;

-  saveFile(browserWindow, content, filePath);
+  return filePath;
 };

 const saveFile = async (
@@ -147,3 +157,17 @@ const saveFile = async (
   browserWindow.webContents.emit('file-saved', filePath);
   updateCurrentFile(browserWindow, filePath);
 };
```

```ts
ipcMain.on('save-file', async (event, content: string) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);

  if (!browserWindow) return;

  if (!currentFile.filePath) {
    const filePath = await showSaveDialog(browserWindow);

    if (!filePath) return;

    currentFile.filePath = filePath;
  }

  saveFile(browserWindow, content, currentFile.filePath);
});
```

## Checking for Unsaved Changes

```ts
type File = {
  filePath?: string;
  content?: string;
};

const currentFile: File = {
  content: '',
};
```

```ts
const updateCurrentFile = (
  browserWindow: BrowserWindow,
  { filePath, content }: { filePath: string; content: string },
) => {
  browserWindow.setRepresentedFilename(filePath);

  currentFile.filePath = filePath;
  currentFile.content = content;

  browserWindow.setTitle(`${basename(filePath)} - ${app.name}`);
};
```

```ts
const openFile = async (browserWindow: BrowserWindow, filePath: string) => {
  const content = await readFile(filePath, 'utf-8');

  browserWindow.webContents.send('file-opened', content, filePath);
  updateCurrentFile(browserWindow, { filePath, content });
};
```

```ts
const saveFile = async (
  browserWindow: BrowserWindow,
  content: string,
  filePath: string,
) => {
  await writeFile(filePath, content);
  browserWindow.webContents.emit('file-saved', filePath);
  updateCurrentFile(browserWindow, { filePath, content });
};
```

```ts
const checkUnsavedChanges = (content: string) => {
  return content !== currentFile.content;
};

ipcMain.handle('check-unsaved-changes', (_, content: string) => {
  return checkUnsavedChanges(content);
});
```

## Going Back to a Sending IPC Messages

```ts
const updateCurrentFile = (
  browserWindow: BrowserWindow,
  { filePath, content }: { filePath: string; content: string },
) => {
  browserWindow.setRepresentedFilename(filePath);

  currentFile.filePath = filePath;
  currentFile.content = content;

  browserWindow.setTitle(`${basename(filePath)} - ${app.name}`);
  browserWindow.webContents.send('has-unsaved-changes', false);
};
```

```ts
ipcMain.on('check-unsaved-changes', (event, content: string) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);

  if (!browserWindow) return;

  const hasUnsavedChanges = checkUnsavedChanges(content);

  browserWindow.webContents.send('has-unsaved-changes', hasUnsavedChanges);
});
```

In `preload.ts`:

```ts
+ipcRenderer.on('has-unsaved-changes', (_, hasUnsavedChanges) => {
  console.log(hasUnsavedChanges);
  Elements.SaveMarkdownButton.disabled = !hasUnsavedChanges;
});

contextBridge.exposeInMainWorld('api', {
  showOpenDialog: () => ipcRenderer.send('show-open-dialog'),
  showExportHtmlDialog: (html: string) => {
@ -14,5 +19,5 @@ contextBridge.exposeInMainWorld('api', {
  },
  saveFile: (content: string) => ipcRenderer.send('save-file', content),
  hasUnsavedChanges: (content: string) =>
    ipcRenderer.invoke('check-unsaved-changes', content),
    ipcRenderer.send('check-unsaved-changes', content),
});
```

In the renderer:

```ts
Elements.MarkdownView.addEventListener('input', async () => {
  const markdown = Elements.MarkdownView.value;

  const hasUnsavedChanges = await window.api.hasUnsavedChanges(markdown);

  Elements.SaveMarkdownButton.disabled = !hasUnsavedChanges;
  window.api.hasUnsavedChanges(markdown);

  renderMarkdown(markdown);
});
```

## Setting the Edited Status on macOS

```ts
browserWindow.setDocumentEdited(hasUnsavedChanges);
```

## Reverting the Changes

In `electron.d.ts`:

```ts
declare interface Window {
  api: {
    showOpenDialog: () => void;
    showExportHtmlDialog: (html: string) => void;
    saveFile: (content: string) => void;
    hasUnsavedChanges: (content: string) => Promise<boolean>;
    revert: () => Promise<void>;
  };
}
```

In `main/index.ts`:

```ts
const getLastSavedContent = () => currentFile.content;

ipcMain.handle('get-last-saved-content', getLastSavedContent);
```

In `preload.ts`:

```ts
contextBridge.exposeInMainWorld('api', {
  // …
  revert: async () => {
    const content = await ipcRenderer.invoke('get-last-saved-content');
    Elements.MarkdownView.value = content;
    ipcRenderer.send('check-unsaved-changes', content);
    renderMarkdown(content);
  },
});
```

In the renderer:

```ts
Elements.RevertButton.addEventListener('click', async () => {
  await window.api.revert();
});
```

### Or, Leveraging file-opened

In `src/main/index.ts`:

```ts
ipcMain.on('revert', (event) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);

  browserWindow?.webContents.send(
    'file-opened',
    currentFile.content,
    currentFile.filePath,
  );

  browserWindow?.setDocumentEdited(false);
  browserWindow?.webContents.send('has-unsaved-changes', false);
});
```

In `preload.ts`:

```ts
contextBridge.exposeInMainWorld('api', {
  // …
  revert: () => ipcRenderer.send('revert'),
});
```

In `electron.d.ts`:

```ts
declare interface Window {
  api: {
    showOpenDialog: () => void;
    showExportHtmlDialog: (html: string) => void;
    saveFile: (content: string) => void;
    hasUnsavedChanges: (content: string) => Promise<boolean>;
    revert: () => void;
  };
}
```

## Solutions: Open in File System and Open in Default Application

In `electron.d.ts`:

```ts
declare interface Window {
  api: {
    showOpenDialog: () => void;
    showExportHtmlDialog: (html: string) => void;
    saveFile: (content: string) => void;
    hasUnsavedChanges: (content: string) => Promise<boolean>;
    revert: () => void;
    showFileInFolder: () => void;
    openInDefaultApplication: () => void;
  };
}
```

In `main/index.ts`:

```ts
const updateCurrentFile = (
  browserWindow: BrowserWindow,
  { filePath, content }: { filePath: string; content: string },
) => {
  browserWindow.setRepresentedFilename(filePath);

  currentFile.filePath = filePath;
  currentFile.content = content;

  browserWindow.setTitle(`${basename(filePath)} - ${app.name}`);
  browserWindow.webContents.send('has-unsaved-changes', false);
  browserWindow.webContents.send('has-current-file', currentFile.filePath);
};
```

```ts
const showFileInFolder = async () => {
  if (!currentFile.filePath) return;
  shell.showItemInFolder(currentFile.filePath);
};

ipcMain.on('show-file-in-folder', (event) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);

  if (!browserWindow) return;
  if (!currentFile.filePath) return;

  showFileInFolder();
});

ipcMain.on('open-in-default-application', (event) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);

  if (!browserWindow) return;
  if (!currentFile.filePath) return;

  shell.openPath(currentFile.filePath);
});
```

In `preload.ts`:

```ts
ipcRenderer.on('has-current-file', (_, hasCurrentFile: boolean) => {
  Elements.ShowFileButton.disabled = !hasCurrentFile;
  Elements.OpenInDefaultApplicationButton.disabled = !hasCurrentFile;
});
```

```ts
contextBridge.exposeInMainWorld('api', {
  // …
  showFileInFolder: () => ipcRenderer.send('show-file-in-folder'),
  openInDefaultApplication: () =>
    ipcRenderer.send('open-in-default-application'),
});
```

In `renderer/index.ts`:

```ts
+Elements.RevertButton.addEventListener('click', () => {
  window.api.revert();
});

Elements.ShowFileButton.addEventListener('click', () => {
  window.api.showFileInFolder();
});

Elements.OpenInDefaultApplicationButton.addEventListener('click', () => {
  window.api.openInDefaultApplication();
});
```

## Adding to Recent Documents

```ts
app.addRecentDocument(currentFile.filePath);
```

## Setting Up Application Menus

In `main/index.ts`:

```ts
import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  shell,
  Menu,
  type MenuItemConstructorOptions,
} from 'electron';
```

```ts
const createMenuTemplate = (browserWindow: BrowserWindow) => {
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          click: () => {
            showOpenDialog(browserWindow);
          },
        },
        { type: 'separator' },
        {
          label: 'Quit',
          role: 'quit',
        },
      ],
    },
  ];

  return Menu.buildFromTemplate(template);
};
```

```ts
const createWindow = () => {
  // …

  Menu.setApplicationMenu(createMenuTemplate(mainWindow));

  return mainWindow;
};
```

## Fixing the Menu for macOS

Add back in the macOS application menu:

```ts
if (process.platform === 'darwin') {
  template.unshift({
    label: app.name,
    role: 'appMenu',
  });
}
```

## Adding Keyboard Shortcuts

```ts
const template: MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        click: () => {
          showOpenDialog(browserWindow);
        },
        accelerator: 'CmdOrCtrl+O',
      },
    ],
  },
  {
    label: 'Edit',
    role: 'editMenu',
  },
];
```

# Clipmaster

## Tweaking the Window

In `main/index.ts`

```ts
const mainWindow = new BrowserWindow({
  width: 400,
  height: 600,
  minWidth: 400,
  minHeight: 400,
  maxWidth: 600,
  maxHeight: 800,
  maximizable: false,
  titleBarStyle: 'hidden',
  titleBarOverlay: true,
  webPreferences: {
    preload: join(__dirname, 'preload.js'),
  },
});
```

In `index.css`:

```css
#title-bar {
  -webkit-app-region: drag;
  user-select: none;
}
```

## Making Types Easier

In `preload.ts`:

```ts
import { contextBridge } from 'electron';

const api = {} as const;

contextBridge.exposeInMainWorld('api', api);

export type Clipmaster = typeof api;
```

In `electron.d.ts`:

```ts
declare interface Window {
  api: import('../src/preload').Clipmaster;
}
```

## Writing to the Clipboard

In `src/main/index.ts`:

```ts
ipcMain.on('write-to-clipboard', (_, content: string) => {
  clipboard.writeText(content);
});
```

In `preload.ts`:

```ts
const api = {
  writeToClipboard: (content: string) => {
    ipcRenderer.send('write-to-clipboard', content);
  },
} as const;
```

In `src/renderer/components/application.tsx`:

```tsx
<Clipping
  key={clipping.id}
  id={clipping.id}
  value={clipping.value}
  onCopy={window.api.writeToClipboard}
  onRemove={removeClipping}
/>
```

## Copy from Clipboard

In `main/index.ts`:

```ts
ipcMain.handle('copy-from-clipboard', () => {
  const content = clipboard.readText();
  return content;
});
```

In `preload.ts`:

```ts
const api = {
  writeToClipboard: (content: string) => {
    ipcRenderer.send('write-to-clipboard', content);
  },
  copyFromClipboard: (): Promise<string> => {
    return ipcRenderer.invoke('copy-from-clipboard');
  },
} as const;
```

In `src/renderer/components/application.tsx`:

```tsx
<CopyFromClipboard
  onClick={async () => {
    const clipping = await window.api.copyFromClipboard();
    if (clipping) addClipping(clipping);
  }}
/>
```

## Adding Global Shortcuts

Add a `globalShortcut` in `main/index.ts`:

```ts
app.on('ready', () => {
  const mainWindow = createWindow();

  globalShortcut.register('CommandOrControl+Shift+Alt+V', () => {
    mainWindow.show();
    mainWindow.focus();
  });
});
```

## Creating a Keyboard Shortcut for Writing to Clipmaster

In `main/index.ts`:

```ts
const sendClipboardToRenderer = (mainWindow: BrowserWindow) => {
  const content = clipboard.readText();
  mainWindow.webContents.send('clipboard', content);
};
```

```ts
globalShortcut.register('CommandOrControl+Shift+Alt+C', () => {
  sendClipboardToRenderer(mainWindow);
});
```

In `preload.ts`:

```ts
const api = {
  writeToClipboard: (content: string) => {
    ipcRenderer.send('write-to-clipboard', content);
  },
  copyFromClipboard: (): Promise<string> => {
    return ipcRenderer.invoke('copy-from-clipboard');
  },
  onClippingAdded: (callback: (content: string) => void) => {
    ipcRenderer.on('clipboard', (_, content: string) => {
      callback(content);
    });
  },
} as const;
```

In `src/renderer/components/application.tsx`:

```ts
useEffect(() => {
  window.api.onClippingAdded(addClipping);
}, [addClipping]);
```

## Adding Notifications

In `main/index.ts`:

```ts
ipcMain.on('write-to-clipboard', (_, content: string) => {
  clipboard.writeText(content);
  new Notification({
    title: 'Written to Clipboard',
    subtitle: content,
  }).show();
});
```

### Exercise: Add a Notification When the Global Shortcut is Triggered

```ts
globalShortcut.register('CommandOrControl+Shift+Alt+C', () => {
  const content = sendClipboardToRenderer(mainWindow);
  new Notification({
    title: 'Added to Clipmaster',
    subtitle: content,
  }).show();
});
```

## Unregistering Global Shortcuts

In `main/index.ts`:

```ts
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
```

## Context Menus

In `main/index.ts`:

```ts
ipcMain.on('show-context-menu', (event, clipping: Clipping) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);

  const menu = Menu.buildFromTemplate([
    { label: 'Copy', click: () => clipboard.writeText(clipping.value) },
  ]);

  if (!browserWindow) return;

  menu.popup({ window: browserWindow });
});
```

In `preload.ts`:

```ts
const api = {
  writeToClipboard: (content: string) => {
    ipcRenderer.send('write-to-clipboard', content);
  },
  copyFromClipboard: (): Promise<string> => {
    return ipcRenderer.invoke('copy-from-clipboard');
  },
  onClippingAdded: (callback: (content: string) => void) => {
    ipcRenderer.on('clipboard', (_, content: string) => {
      callback(content);
    });
  },
  showContextMenu: (clipping: Clipping) => {
    ipcRenderer.send('show-context-menu', clipping);
  },
} as const;
```

In `src/renderer/components/application.tsx`:

```tsx
<Clipping
  onContextMenu={(e) => {
    e.preventDefault();
    window.api.showContextMenu(clipping);
  }}
  key={clipping.id}
  id={clipping.id}
  value={clipping.value}
  onCopy={window.api.writeToClipboard}
  onRemove={removeClipping}
/>
```

## Adding a Tray Icon

```ts
app.on('ready', () => {
  tray = new Tray('./src/icons/trayTemplate.png');

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open', click: () => mainWindow.show() },
    { label: 'Quit', click: () => app.quit() },
  ]);

  tray.setToolTip('Clipboard App');
  tray.setContextMenu(contextMenu);

  //…
});
```

## Making a Menubar Application

```ts
const mainWindow = new BrowserWindow({
  // ... your previous options ...
  show: false, // Start hidden
});
```

```ts
tray = new Tray('./src/icons/trayTemplate.png');
tray.setIgnoreDoubleClickEvents(true);

const positioner = new Positioner(mainWindow);
const trayPosition = positioner.calculate('trayCenter', tray.getBounds());

mainWindow.setPosition(trayPosition.x, trayPosition.y);

tray.on('click', () => {
  if (!tray) return;
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    const trayPosition = positioner.calculate('trayCenter', tray.getBounds());
    mainWindow.setPosition(trayPosition.x, trayPosition.y);
    mainWindow.show();
  }
});
```

This line makes it work more reliably:

```ts
tray.setIgnoreDoubleClickEvents(true);
```

### Removing the Ability to Close the Window

```ts
const mainWindow = new BrowserWindow({
  width: 400,
  height: 600,
  minWidth: 400,
  minHeight: 400,
  maxWidth: 600,
  maxHeight: 800,
  maximizable: false,
  show: false,
  frame: false, // Here!
  webPreferences: {
    preload: join(__dirname, 'preload.js'),
  },
});
```

# Not Done Yet

## Using Native Modules

Set up `ipcMain`:

```ts
ipcMain.handle('create-task', async (event, title) => {
  const id = await createTask(title);
  return await getTask(id);
});

ipcMain.handle('get-tasks', async () => {
  return await getAllTasks();
});

ipcMain.handle('update-task', async (_, taskId: string, completed: boolean) => {
  const id = Number(taskId);
  return await updateTask(id);
});

ipcMain.handle('delete-task', async (event, id) => {
  await deleteTask(Number(id));
});
```

In `preload.ts`:

```ts
+import { contextBridge, ipcRenderer } from 'electron';

const api = {
  createTask: async (title: string) => {
    return ipcRenderer.invoke('create-task', title);
  },
  getTasks: async () => {
    return ipcRenderer.invoke('get-tasks');
  },
  updateTask: async (id: string) => {
    return ipcRenderer.invoke('update-task', id);
  },
  deleteTask: async (id: string) => {
    return ipcRenderer.invoke('delete-task', id);
  },
};

export type Api = typeof api;

contextBridge.exposeInMainWorld('api', api);
```

If `src/lib/tasks.ts`:

```ts
export const toggleTask = async (id: string): Promise<void> => {
  window.api.updateTask(id);
};

export const removeTask = async (id: string): Promise<void> => {
  window.api.deleteTask(id);
};
```

In `src/renderer.ts`:

```ts
window.api.getTasks().then((tasks) => {
  addAllTasksToList(tasks);
});

newTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.target as HTMLFormElement);
  const title = data.get('new-task-title');

  console.log(`Adding task: ${title}`);

  window.api.createTask(title.toString()).then((task: Task) => {
    addTaskToList(task);
  });

  newTaskTitle.value = '';
  submitButton?.setAttribute('disabled', 'disabled');
});
```
