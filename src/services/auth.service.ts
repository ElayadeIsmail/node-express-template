import { logger } from '@/config';
import { usersQuery } from '@/database/queries';
import { NotAuthorizedError } from '@/errors';
import { LoginSchema } from '@/lib/validation';
import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
  const input = req.body as LoginSchema;
  const exists = await usersQuery.findByUsername(input.username);
  if (!exists) {
    throw new NotAuthorizedError('Invalid Credentials');
  }
  logger.info(typeof exists);
  res.send('login');
};

const register = async (req: Request, res: Response) => {
  res.send('register Motherfucker');
};

export default { login, register };
