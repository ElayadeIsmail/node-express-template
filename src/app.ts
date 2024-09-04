import loggerMiddleware from '@/middlewares/logger.middleware';
import express from 'express';

const app = express();

app.use(express.json());
app.use(loggerMiddleware.successHandler);
app.use(loggerMiddleware.errorHandler);

app.get('/', (_, res) => {
  res.send('Hello world');
});

export { app };
