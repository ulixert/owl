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
  username: z.string(),
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8),
  profilePicUrl: z.string().nullable().default(null),
  followers: z.array(ObjectIdSchema).default([]),
  following: z.array(ObjectIdSchema).default([]),
  biography: z.string().default(''),
  active: z.boolean().default(true),
});

export const UserLoginSchema = BaseUserSchema.pick({
  username: true,
  password: true, // Only allow username and password
});

export const UserCreateSchema = BaseUserSchema;

export const UserUpdateSchema = BaseUserSchema.partial().omit({
  password: true,
  followers: true,
  following: true,
});

export const UserSchema = BaseUserSchema.merge(HasId);

export const ReplySchema = z.object({
  userId: ObjectIdSchema,
  text: z.string().min(2).max(280),
  userProfilePic: z.string().optional(),
  likes: z.number().default(0),
  username: z.string(),
});

export const PostSchema = z.object({
  postedBy: ObjectIdSchema,
  text: z.string().max(280).optional(),
  img: z.string().optional(),
  likes: z.number().default(0),
  replies: z.array(ReplySchema),
});

export const PostCreateSchema = PostSchema.omit({
  postedBy: true,
  likes: true,
  replies: true,
}).refine((data) => Boolean(data.text) || Boolean(data.img), {
  message: "At least 'text' or 'img' must be provided.",
  path: ['text', 'img'],
});

export const PostUpdateSchema = PostSchema.partial()
  .omit({
    postedBy: true,
    likes: true,
    replies: true,
  })
  .refine((data) => Boolean(data.text) || Boolean(data.img), {
    message: "At least 'text' or 'img' must be provided.",
    path: ['text', 'img'],
  });
