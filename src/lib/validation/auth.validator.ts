import { z } from 'zod';

const usernameSchema = z
  .string({ required_error: 'Username is required' })
  .min(4, { message: 'Username must be at least 4 characters long' })
  .max(12, { message: 'Username must be at max 12 characters long' })
  .regex(/^[a-zA-Z_]+$/, {
    message: 'Username can only contain letters and underscores',
  });

const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .regex(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,;:])[A-Za-z\d!@#$%^&*.,;:]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long, and include at least one uppercase letter, one number, and one special character',
    }
  );

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  rememberMe: z.boolean().default(false),
});

export type LoginSchema = z.infer<typeof loginSchema>;
