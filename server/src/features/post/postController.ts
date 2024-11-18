import { Request, Response } from 'express';
import { PostCreateSchema } from 'validation';

import { selectFeedPosts } from '@prisma/client/sql';

import { prisma } from '../../db/index.js';
import { postQuerySchema } from '../../types/validation/schemas.js';

export async function getFeedPosts(req: Request, res: Response) {
  try {
    const currentUserId = req.user!.id;
    const { cursor, limit = 10 } = req.query;

    // Construct the cursor condition for pagination
    const cursorCondition = cursor ? Number(cursor) : 0;

    // Use raw SQL query with cursor-based pagination
    const posts = await prisma.$queryRawTyped(
      selectFeedPosts(currentUserId, cursorCondition, Number(limit)),
    );

    res.status(200).json({ message: 'Feed posts found', posts });
  } catch (error) {
    res.status(500).json({ error: 'An unknown error occurred' });
    console.error('Error in getFeedPosts: ', error);
  }
}

export async function getHotPosts(_req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { likesCount: 'desc', commentsCount: 'desc' },
    });
    res.status(200).json({ message: 'Hot posts found', posts });
  } catch (error) {
    res.status(500).json({ error: 'An unknown error occurred' });
    console.error('Error in getHotPosts: ', error);
  }
}

export async function getPostById(req: Request, res: Response) {
  try {
    const postId = Number.parseInt(req.params.postId);
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

    // Construct the response data
    const response = {
      post: {
        id: post.id,
        text: post.text,
        images: post.images,
        likesCount: post.likesCount,
        commentsCount: post.commentsCount,
        repostsCount: post.repostsCount,
        isDeleted: post.isDeleted,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        postedBy: {
          id: post.postedBy.id,
          username: post.postedBy.username,
          profilePic: post.postedBy.profilePic,
        },
      },
      childPosts,
      nextCursor:
        childPosts.length > 0 ? childPosts[childPosts.length - 1].id : null,
    };

    res.status(200).json({ post: response });
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred' });
    console.error('Error in getPostById: ', error);
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    // Validate request body
    const input = PostCreateSchema.safeParse(req.body);
    const currentUserId = req.user!.id;
    if (!input.success) {
      res.status(400).json({ error: 'Invalid post data' });
      return;
    }

    const { text, img } = input.data;

    // Create post
    const post = await PostModel.create({
      postedBy: currentUserId,
      text,
      img,
    });

    res.status(201).json({ message: 'Post created', post });
  } catch (error) {
    res.status(500).json({ error: 'An unknown error occurred' });
    console.error('Error in createPost: ', error);
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    const postId = toObjectId(req.params.postId);
    const post = await PostModel.findById(postId);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    // Check if the user is authorized to delete the post
    const currentUserId = req.user!._id;
    if (!post.postedBy.equals(currentUserId)) {
      res
        .status(403)
        .json({ error: 'You are not authorized to delete this post' });
      return;
    }

    await PostModel.deleteOne({ _id: postId });

    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'An unknown error occurred' });
    console.error('Error in deletePost: ', error);
  }
}

export async function likeUnlikePost(req: Request, res: Response) {
  try {
    const postId = toObjectId(req.params.postId);
    const post = await PostModel.findById(postId);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const currentUserId = req.user!._id;
    const isLiked = post.likes.includes(currentUserId);

    if (isLiked) {
      await PostModel.findByIdAndUpdate(postId, {
        $pull: { likes: currentUserId },
      });
    } else {
      await PostModel.findByIdAndUpdate(postId, {
        $addToSet: { likes: currentUserId },
      });
    }

    res
      .status(200)
      .json({ message: isLiked ? 'Post unliked.' : 'Post liked.' });
  } catch (error) {
    res.status(500).json({ error: 'An unknown error occurred' });
    console.error('Error in likeUnlikePost: ', error);
  }
}
