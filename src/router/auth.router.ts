import { loginSchema, registerSchema } from '@/lib/validation';
import { validationMiddleware } from '@/middlewares';
import { authService } from '@/services';
import express from 'express';

const router = express.Router();

router.post('/login', validationMiddleware(loginSchema), authService.login);

router.post(
  '/register',
  validationMiddleware(registerSchema),
  authService.register
);

router.post('/logout', authService.logout);

export { router as authRouter };
