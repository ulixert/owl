import { z } from 'zod';

const HasId = z.object({ _id: z.string() });

export const BaseUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
  profilePicUrl: z.string().default(''),
  followers: z.array(z.string()).default([]),
  following: z.array(z.string()).default([]),
  biography: z.string().default(''),
});

export const UserLoginSchema = BaseUserSchema.pick({
  username: true,
  password: true, // Only allow username and password
});

export const UserSchema = BaseUserSchema.merge(HasId);

export const ReplySchema = z.object({
  userId: z.string(), // Assuming ObjectId can be represented as a string
  text: z.string().min(2).max(280),
  userProfilePic: z.string().optional(),
  likes: z.number().default(0),
  username: z.string(),
});

export const PostSchema = z
  .object({
    postedBy: z.string(), // Assuming ObjectId can be represented as a string
    text: z.string().max(280).optional(),
    img: z.string().optional(),
    likes: z.number().default(0),
    replies: z.array(ReplySchema),
  })
  .refine((data) => Boolean(data.text) || Boolean(data.img), {
    message: "At least 'text' or 'img' must be provided.",
    path: ['text', 'img'], // Specify the fields this refinement is related to
  });
