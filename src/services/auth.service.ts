import { logger } from '@/config';
import { usersQuery } from '@/database/queries';
import {
  BadRequestError,
  InternalServerError,
  NotAuthorizedError,
} from '@/errors';
import { COOKIE_NAME, SALT_ROUNDS } from '@/lib/constants';
import { LoginSchema, RegisterSchema } from '@/lib/validation';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import tokenService from './token.service';

declare module 'express-session' {
  interface SessionData {
    token?: string;
  }
}

const login = async (req: Request, res: Response) => {
  const input = req.body as LoginSchema;
  const exists = await usersQuery.findByUsernameOrEmail(input.usernameOrEmail);
  if (!exists) {
    throw new NotAuthorizedError('Invalid Credentials');
  }
  const isPasswordCorrect = await bcrypt.compare(
    input.password,
    exists.password
  );
  if (!isPasswordCorrect) {
    throw new NotAuthorizedError('Invalid Credentials');
  }
  const token = tokenService.generateToken({
    userId: exists.id!,
    username: exists.username,
  });
  req.session.token = token;
  res.send({
    success: true,
    user: {
      id: exists.id,
      username: exists.username,
      email: exists.email,
    },
  });
};

const register = async (req: Request, res: Response) => {
  const input = req.body as RegisterSchema;
  const [usernameExists, emailExists] = await Promise.all([
    usersQuery.findByUsernameOrEmail(input.username),
    usersQuery.findByUsernameOrEmail(input.email),
  ]);
  if (usernameExists || emailExists) {
    throw new BadRequestError('User already exists');
  }
  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);
  const user = await usersQuery.create({
    username: input.username,
    email: input.email,
    password: hashedPassword,
  });
  const token = tokenService.generateToken({
    userId: user.id!,
    username: user.username,
  });
  req.session.token = token;
  res.send({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
};

const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    res.clearCookie(COOKIE_NAME);
    if (err) {
      logger.error('Error destroying session:', err);
      throw new InternalServerError('Error destroying session');
    }
    res.send({
      success: true,
    });
  });
};

export default { login, register, logout };
