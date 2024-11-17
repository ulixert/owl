import { z } from 'zod';

import {
  BasePostSchema,
  LoginSchema,
  UserCreateSchema,
  UserSchema,
} from './schemas.js';

export type UserType = z.infer<typeof UserSchema>;
export type PostType = z.infer<typeof BasePostSchema>;
export type UserCreateType = z.infer<typeof UserCreateSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
