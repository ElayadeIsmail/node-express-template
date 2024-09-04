import { logger } from '@/config';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import PinoHttp from 'pino-http';

export const loggerMiddleware = PinoHttp({
  logger,
  quietReqLogger: true,
  quietResLogger: true,
  genReqId: () => randomUUID(),
  customLevels: (_req: Request, res: Response, err: unknown) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent';
    }
    return 'info';
  },

  customSuccessMessage: (_req: Request, res: Response, responseTime) => {
    return `Method: ${res.req.method}, ${res.req.path} Status: ${res.statusCode}, IP: ${res.req.headers['x-forwarded-for'] || res.req.socket.remoteAddress} Time: ${responseTime}ms`;
  },

  // Define a custom receive message
  customReceivedMessage: function (req, _res) {
    return `Request received:  ${req.method} ${req.path}`;
  },

  // Define a custom error message
  customErrorMessage: function (req, res, err) {
    return `Request errored with status code:  ${res.statusCode} ${req.path}  err: ${err}`;
  },
});
