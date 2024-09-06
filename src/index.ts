import { app } from '@/app';
import { envVars, logger, redisClient } from '@/config';
import http from 'http';

const httpServer = http.createServer(app);

const server = httpServer.listen(envVars.port, () => {
  logger.info(`Server running at http://localhost:${envVars.port}`);
});

const exitHandler = () => {
  redisClient
    .quit()
    .then(() => {
      logger.info('Redis client disconnected');
    })
    .catch((err) => {
      logger.error('Error disconnecting Redis client:', err);
    })
    .finally(() => {
      server.close(() => {
        logger.info('Server closed');
        process.exit(1);
      });
    });
};
const unExpectedErrorHandler = (error: Error) => {
  logger.fatal(error, 'unExpectedErrorHandler');
  exitHandler();
};

process.on('uncaughtException', unExpectedErrorHandler);
process.on('unhandledRejection', unExpectedErrorHandler);
process.on('SIGTERM', () => {
  logger.info('Received SIGTERM. Shutting down..');
  exitHandler();
});
