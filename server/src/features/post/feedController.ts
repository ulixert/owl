import { Request, Response } from 'express';

import { selectFeedPosts } from '@prisma/client/sql';

import { prisma } from '../../db/index.js';
import { postQuerySchema } from '../../types/validation/schemas.js';

export async function getFeedPosts(req: Request, res: Response) {
  try {
    const currentUserId = req.user!.id;
    const input = postQuerySchema.safeParse(req.query);
    if (!input.success) {
      res.status(400).json({ message: 'Invalid query params' });
      return;
    }
    const { cursor, limit } = input.data;

    const posts = await prisma.$queryRawTyped(
      selectFeedPosts(currentUserId, cursor, limit),
    );

    const nextCursor = posts.length > 0 ? posts[posts.length - 1].id : null;

    res.status(200).json({ posts, nextCursor });
  } catch (error) {
    res.status(500).json({ error: 'An unknown error occurred' });
    console.error('Error in getFeedPosts: ', error);
  }
}
