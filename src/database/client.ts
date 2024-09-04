import { envVars } from '@/config';
import * as schema from '@/database/schemas';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqlite = new Database(envVars.dbUrl);
const db = drizzle(sqlite, { schema });

export { db };
