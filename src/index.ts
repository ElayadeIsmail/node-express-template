import { app } from './app';
import { envVars, logger } from './config';

const server = app.listen(envVars.port, () => {
  logger.info(`Server running at http://localhost:${envVars.port}`);
});

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM. Shutting down..');
  server.close();
});
