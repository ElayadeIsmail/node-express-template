import pino from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({
  colorize: true,
  translateTime: 'SYS:standard',
});

const logger = pino({ level: 'info' }, stream);

export { logger };
