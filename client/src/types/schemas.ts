import { BaseUserSchema, UserCreateSchema } from 'validation';
import { z } from 'zod';

export const SignUpSchema = UserCreateSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const ForgotPasswordSchema = BaseUserSchema.pick({
  email: true,
});
