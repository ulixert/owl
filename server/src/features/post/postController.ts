import { Request, Response } from 'express';
import { PostCreateSchema } from 'validation';

import { prisma } from '../../db/index.js';
import {
  createPostPramsSchema,
  postParamsSchema,
  postQuerySchema,
} from '../../types/validation/schemas.js';

export async function getHotPosts(req: Request, res: Response) {
  try {
    const input = postQuerySchema.safeParse(req.query);
    if (!input.success) {
      res.status(400).json({ message: 'Invalid query params' });
      return;
    }
    const { cursor, limit } = input.data;

    const posts = await prisma.post.findMany({
      orderBy: { likesCount: 'desc', commentsCount: 'desc', createdAt: 'desc' },
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      include: {
        postedBy: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          },
        },
      },
    });

    const nextCursor = posts.length > 0 ? posts[posts.length - 1].id : null;
    res.status(200).json({ posts, nextCursor });
  } catch (error) {
    res.status(500).json({ error: 'An unknown error occurred' });
    console.error('Error in getHotPosts: ', error);
  }
}

export async function getPostById(req: Request, res: Response) {
  try {
    const params = postParamsSchema.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: 'Invalid post data' });
      return;
    }

    const postId = params.data.postId;

    const input = postQuerySchema.safeParse(req.query);
    if (!input.success) {
      res.status(400).json({ message: 'Invalid query params' });
      return;
    }

    const { cursor, limit } = input.data;

    // Fetch the main post details including user info
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        postedBy: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          },
        },
      },
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Fetch child posts (comments) with pagination
    const childPosts = await prisma.post.findMany({
      where: { parentPostId: postId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      include: {
        postedBy: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          },
        },
      },
    });

    const nextCursor =
      childPosts.length > 0 ? childPosts[childPosts.length - 1].id : null;
    res.status(200).json({ post, childPosts, nextCursor });
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred' });
    console.error('Error in getPostById: ', error);
  }
}

export async function getChildPosts(req: Request, res: Response) {
  try {
    const params = postParamsSchema.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: 'Invalid post data' });
      return;
    }

    const postId = params.data.postId;

    const input = postQuerySchema.safeParse(req.query);
    if (!input.success) {
      res.status(400).json({ message: 'Invalid query params' });
      return;
    }

    const { cursor, limit } = input.data;

    const childPosts = await prisma.post.findMany({
      where: { parentPostId: postId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      include: {
        postedBy: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          },
        },
      },
    });

    const nextCursor =
      childPosts.length > 0 ? childPosts[childPosts.length - 1].id : null;
    res.status(200).json({ childPosts, nextCursor });
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred' });
    console.error('Error in getChildPosts: ', error);
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const params = createPostPramsSchema.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: 'Invalid post data' });
      return;
    }

    const parentPostId = params.data.parentPostId;

    // Validate input
    const input = PostCreateSchema.safeParse(req.body);
    const currentUserId = req.user!.id;
    if (!input.success) {
      res.status(400).json({ error: 'Invalid post data' });
      return;
    }

    const { text, images } = input.data;

    // Check if the parent post exists
    if (parentPostId) {
      const parentPost = await prisma.post.findUnique({
        where: { id: parentPostId },
      });

      if (!parentPost) {
        res.status(404).json({ error: 'Parent post not found' });
        return;
      }

      // Increment the comments count of the parent post
      await prisma.post.update({
        where: { id: parentPostId },
        data: { commentsCount: { increment: 1 } },
      });
    }

    // Create post
    const post = await prisma.post.create({
      data: {
        text,
        images: images ?? undefined,
        parentPostId: parentPostId,
        postedById: currentUserId,
      },
      include: {
        postedBy: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          },
        },
      },
    });

    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ error: 'An unknown error occurred' });
    console.error('Error in createPost: ', error);
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    const params = postParamsSchema.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: 'Invalid post data' });
      return;
    }

    const postId = params.data.postId;

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { postedById: true },
    });
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    // Check if the user is authorized to delete the post
    const currentUserId = req.user!.id;
    if (post.postedById !== currentUserId) {
      res
        .status(403)
        .json({ error: 'You are not authorized to delete this post' });
      return;
    }

    await prisma.post.update({
      where: { id: postId },
      data: { isDeleted: true },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'An unknown error occurred' });
    console.error('Error in deletePost: ', error);
  }
}
