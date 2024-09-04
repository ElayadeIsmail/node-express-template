import { loginSchema } from '@/lib/validation';
import { validationMiddleware } from '@/middlewares';
import { authService } from '@/services';
import express from 'express';

const router = express.Router();

router.post('/login', validationMiddleware(loginSchema), authService.login);

router.post('/register', authService.register);

export { router as authRouter };
