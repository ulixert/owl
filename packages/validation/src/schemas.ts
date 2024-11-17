import mongoose from 'mongoose';
import { z } from 'zod';

// Define Zod schema for MongoDB ObjectId using Mongoose's `ObjectId`
const ObjectIdSchema = z.instanceof(mongoose.Types.ObjectId, {
  message: 'Invalid MongoDB ObjectId',
});

// Zod schema for a document with MongoDB ObjectId
const HasId = z.object({
  _id: ObjectIdSchema,
});

export const BaseUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username can't be less than 3 characters")
    .max(20, "Username can't be more than 20 characters"),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  profilePicUrl: z.string().nullable().default(null),
  followers: z.array(ObjectIdSchema).default([]),
  following: z.array(ObjectIdSchema).default([]),
  biography: z.string().default(''),
  active: z.boolean().default(true),
});

export const LoginSchema = BaseUserSchema.pick({
  email: true,
  password: true,
});

export const UserCreateSchema = BaseUserSchema.pick({
  username: true,
  email: true,
  password: true,
});

export const UserUpdateSchema = BaseUserSchema.partial().omit({
  password: true,
  followers: true,
  following: true,
});

export const UserSchema = BaseUserSchema.merge(HasId);

export const BasePostSchema = z.object({
  postedBy: ObjectIdSchema,
  text: z.string().max(280).optional(),
  img: z.string().optional(),
  likes: z.array(ObjectIdSchema).default([]),
  commentsCount: z.number().default(0),
});

export const PostCreateSchema = BasePostSchema.omit({
  postedBy: true,
  likes: true,
}).refine((data) => Boolean(data.text) || Boolean(data.img), {
  message: "At least 'text' or 'img' must be provided.",
  path: ['text', 'img'],
});

export const PostUpdateSchema = BasePostSchema.partial()
  .omit({
    postedBy: true,
    likes: true,
  })
  .refine((data) => Boolean(data.text) || Boolean(data.img), {
    message: "At least 'text' or 'img' must be provided.",
    path: ['text', 'img'],
  });

export const BaseCommentSchema = z.object({
  postId: ObjectIdSchema,
  userId: ObjectIdSchema,
  text: z.string().max(280),
  username: z.string(),
  profilePicUrl: z.string().optional(),
  likes: z.array(ObjectIdSchema).default([]),
  parentCommentId: ObjectIdSchema.optional().nullable(),
  repliesCount: z.number().default(0),
});

export const CommentCreateSchema = BaseCommentSchema.pick({
  text: true,
});

export const CommentUpdateSchema = BaseCommentSchema.partial().omit({
  text: true,
});
