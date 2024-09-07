import { envVars, redisClient } from '@/config';
import { NotFoundError } from '@/errors';
import {
  currentUserMiddleware,
  errorHandlerMiddleware,
  loggerMiddleware,
} from '@/middlewares';
import { authRouter } from '@/router';
import RedisStore from 'connect-redis';
import express from 'express';
import 'express-async-errors';
import cookieSession from 'express-session';
import { COOKIE_NAME } from './lib/constants';

// Initialize store.
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'express-example:',
});

const app = express();

// Initialize session storage.
app.use(
  cookieSession({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: envVars.sessionSecret.split(','),
    name: COOKIE_NAME,
    cookie: {
      maxAge: envVars.sessionExpiresInMs, // 1 week
      httpOnly: true,
      secure: envVars.env === 'production',
      sameSite: 'strict',
    },
  })
);

if (envVars.env === 'production') {
  app.set('trust proxy', 1);
}
app.use(express.json());
app.use(loggerMiddleware);
app.use(currentUserMiddleware);

app.get('/', (_, res) => {
  res.send('Hello world');
});

app.use('/auth', authRouter);

app.all('*', async (_req, _res) => {
  throw new NotFoundError();
});

app.use(errorHandlerMiddleware);

export { app };
