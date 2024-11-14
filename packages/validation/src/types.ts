import { z } from 'zod';

import { BasePostSchema, UserSchema } from './schemas.js';

export type UserType = z.infer<typeof UserSchema>;
export type PostType = z.infer<typeof BasePostSchema>;
