import redis from 'ioredis';
import { envVars } from './config';
import { logger } from './logger';

const redisClient = new redis(envVars.redisUrl);

redisClient.on('connect', () => {
  logger.info('Redis client connected');
});

redisClient.on('error', (err) => {
  logger.error('Redis client error:', err);
});

export { redisClient };
