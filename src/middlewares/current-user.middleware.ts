import { tokenService } from '@/services';
import { TokenPayload } from '@/services/token.service';
import { NextFunction, Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      currentUser?: TokenPayload;
    }
  }
}

export const currentUserMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.session.token) {
    return next();
  }
  const user = tokenService.verifyToken(req.session.token);
  if (user) {
    req.currentUser = user;
  }
  next();
};
