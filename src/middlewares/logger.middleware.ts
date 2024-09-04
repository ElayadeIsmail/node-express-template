import { envVars } from '@/config';
import { Response } from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';

morgan.token('message', (_, res: Response) => res.locals.errorMessage || '');

const getIPFormat = () =>
  envVars.env === 'production' ? ':remote-addr - ' : '';

const accessLogStream = fs.createWriteStream(
  path.join(process.cwd(), 'logs/access.log'),
  { flags: 'a' }
);

const successResponseFormat = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date`;

const successHandler = morgan(successResponseFormat, {
  stream: envVars.env === 'production' ? accessLogStream : process.stdout,
  skip: (_, res) => res.statusCode >= 400,
});

const errorResponseFormat = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date - error-message: :message`;
const errorHandler = morgan(errorResponseFormat, {
  stream: envVars.env === 'production' ? accessLogStream : process.stdout,
  skip: (_, res) => res.statusCode < 400,
});

export default { errorHandler, successHandler };
