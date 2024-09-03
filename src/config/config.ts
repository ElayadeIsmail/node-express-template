import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number({}).int().positive().default(3000),
  DB_URL: z.string(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(`Invalid environment variables: ${result.error.issues}`);
  process.exit(1);
}

export const envVars = result.data;
