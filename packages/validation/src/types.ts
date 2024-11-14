import { z } from 'zod';

import { BasePostSchema, ReplySchema, UserSchema } from './schemas.js';

export type UserType = z.infer<typeof UserSchema>;
export type ReplyType = z.infer<typeof ReplySchema>;
export type PostType = z.infer<typeof BasePostSchema>;
