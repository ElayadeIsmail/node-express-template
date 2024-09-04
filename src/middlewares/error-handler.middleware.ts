import { logger } from '@/config';
import { CustomError } from '@/errors';
import { NextFunction, Request, Response } from 'express';

export const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  logger.error(err);
  return res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
