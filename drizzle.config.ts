import { defineConfig } from 'drizzle-kit';
import { envVars } from './src/config';

export default defineConfig({
  schema: './src/database/schemas/**/*.{ts,js}',
  dbCredentials: {
    url: envVars.dbUrl,
  },
  dialect: 'sqlite',
  out: './drizzle',
});
