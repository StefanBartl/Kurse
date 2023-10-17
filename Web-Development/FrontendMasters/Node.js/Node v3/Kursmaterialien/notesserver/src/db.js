import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const currentFilePath = fileURLToPath(import.meta.url);
const dbFilePath = path.resolve(path.dirname(currentFilePath), '../db.json');

export const getDB = async () => {
  const db = await fs.readFile(dbFilePath, 'utf-8');
  return JSON.parse(db);
}

export const saveDB = async (db) => {
  await fs.writeFile(dbFilePath, JSON.stringify(db, null, 2));
  return db;
}

export const insert = async (data) => {
  const db = await getDB();
  db.notes.push(data);
  await saveDB(db);
  return data;
}
