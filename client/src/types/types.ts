import { z } from 'zod';

import { ForgotPasswordSchema, SignUpSchema } from './schemas.ts';

export type SignUpType = z.infer<typeof SignUpSchema>;
export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;
