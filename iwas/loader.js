import { promises as fs, existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

import { compileStreaming } from 'assemblyscript/bin/asc';


async function buildAssemblyScript() {
  const entryFile = 'assembly/index.ts'; // Pfad zur Eingabedatei für Ihre AssemblyScript-Anwendung
  const outFile = 'build/assembly.wasm'; // Ausgabedatei für das kompilierte WebAssembly
  const asconfigPath = 'assembly/tsconfig.json'; // Pfad zur tsconfig.json-Datei für AssemblyScript
  const ascOptions = ['--validate', '--exportRuntime'];

  // Kompilieren Sie die AssemblyScript-Dateien in WebAssembly
  await compileStreaming(
    [entryFile, ...ascOptions, '--outFile', outFile, '--config', asconfigPath]
  );

  console.log('AssemblyScript-Build abgeschlossen.');
}

async function generateLoader() {
  // Pfad zur Index.js-Datei, in die die WebAssembly-Module geladen werden sollen
  const indexJsPath = 'index.js';
  
  // Name des WebAssembly-Moduls (ohne Erweiterung)
  const wasmModuleName = 'assembly';

  // Laden Sie die kompilierte WebAssembly-Datei
  const wasmPath = 'build/assembly.wasm'; // Pfad zur kompilierten .wasm-Datei
  const wasmBytes = await fs.readFile(wasmPath);

  // Erstellen Sie die WebAssembly-Moduldefinition für die Index.js-Datei
  const wasmDefinition = `
    const ${wasmModuleName} = new WebAssembly.Module(new Uint8Array([${Array.from(wasmBytes)}]));
    export default ${wasmModuleName};
  `;

  // Fügen Sie die WebAssembly-Moduldefinition zur Index.js-Datei hinzu oder aktualisieren Sie sie
  if (existsSync(indexJsPath)) {
    const indexJsContents = readFileSync(indexJsPath, 'utf-8');
    if (!indexJsContents.includes(wasmModuleName)) {
      writeFileSync(indexJsPath, indexJsContents + wasmDefinition, { flag: 'a' });
    }
  } else {
    writeFileSync(indexJsPath, wasmDefinition);
  }

  console.log('WebAssembly-Loader generiert und in index.js eingefügt.');
}

async function main() {
  try {
    await buildAssemblyScript();
    await generateLoader();
  } catch (error) {
    console.error('Fehler beim Erstellen des AssemblyScript-Loaders:', error);
  }
}

main();