import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number({}).int().positive().default(3000),
  DB_URL: z.string(),
  NODE_ENV: z
    .enum(['development', 'production', 'staging', 'test'])
    .default('development'),
  REDIS_URL: z.string(),
  SESSION_SECRET: z.string(),
  JWT_SECRET: z.string(),
  SESSION_EXPIRES_IN_MS: z.coerce
    .number()
    .int()
    .positive()
    .default(1000 * 60 * 60 * 24 * 7), // 1 week
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(`Invalid environment variables: ${result.error.issues}`);
  process.exit(1);
}

export const envVars = {
  port: result.data.PORT,
  dbUrl: result.data.DB_URL,
  env: result.data.NODE_ENV,
  redisUrl: result.data.REDIS_URL,
  sessionSecret: result.data.SESSION_SECRET,
  jwtSecret: result.data.JWT_SECRET,
  sessionExpiresInMs: result.data.SESSION_EXPIRES_IN_MS,
};
