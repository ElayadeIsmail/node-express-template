import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { envVars } from '../config';

const sqlite = new Database(envVars.dbUrl);
const db = drizzle(sqlite);

export { db };
