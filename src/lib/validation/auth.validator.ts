import { z } from 'zod';

const usernameSchema = z
  .string({ required_error: 'Username is required' })
  .min(4, { message: 'Username must be at least 4 characters long' })
  .max(12, { message: 'Username must be at max 12 characters long' })
  .regex(/^[a-zA-Z_]+$/, {
    message: 'Username can only contain letters and underscores',
  });

const emailSchema = z.string({ required_error: 'Email is required' }).email({
  message: 'Email is not valid',
});

const emailOrUsernameSchema = z.union([emailSchema, usernameSchema]);

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
  usernameOrEmail: emailOrUsernameSchema,
  password: passwordSchema,
  rememberMe: z.boolean().default(false),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string({
      required_error: 'Confirm password is required',
    }),
    acceptTerms: z.boolean({
      required_error: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
