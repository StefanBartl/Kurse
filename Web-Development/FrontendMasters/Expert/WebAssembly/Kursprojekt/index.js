import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import * as loader from '@assemblyscript/loader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imports = { /* imports go here */ };
const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + '/build/debug.wasm'), imports);
export default wasmModule.exports;

