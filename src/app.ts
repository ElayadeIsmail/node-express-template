import { errorHandlerMiddleware, loggerMiddleware } from '@/middlewares';
import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors';

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.get('/', (_, res) => {
  res.send('Hello world');
});

app.all('*', async (_req, _res) => {
  throw new NotFoundError();
});

app.use(errorHandlerMiddleware);

export { app };
