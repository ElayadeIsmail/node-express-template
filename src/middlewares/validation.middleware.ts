import { ValidationError } from '@/errors';
import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validationMiddleware =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ValidationError(result.error.errors);
    }

    next();
  };
