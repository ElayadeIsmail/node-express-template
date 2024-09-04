import { envVars } from '@/config';
import path from 'path';
import pino from 'pino';
import pretty from 'pino-pretty';

const devStream = pretty({
  colorize: true,
  translateTime: 'SYS:standard',
});

const prodStream = pino.destination({
  dest: path.join(process.cwd(), 'logs', 'app.log'),
  minLength: 4096,
  sync: false,
});

const logger = pino(
  {
    level: 'info',
    formatters: {
      level(label) {
        return { level: label.toUpperCase() };
      },
    },
  },
  envVars.env === 'production' ? prodStream : devStream
);

export { logger };
