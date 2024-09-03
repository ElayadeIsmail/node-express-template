import { app } from './app';
import { envVars } from './config';

const server = app.listen(envVars.PORT, () => {
  console.log(`Server running at http://localhost:${envVars.PORT}`);
});

// listen for SIGTERM signal ^C is
// used to gracefully shutdown a Node.js server
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down..');
  server.close();
});
