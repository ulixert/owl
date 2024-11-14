import { Request, Response } from 'express';
import { PostCreateSchema } from 'validation';

import { PostModel } from '../../models/postModel.js';
import { toObjectId } from '../../utils/toObjectId.js';

export async function getPosts(_req: Request, res: Response) {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'An unknown error occurred' });
    console.error('Error in getPosts: ', error);
  }
}

export async function getPostById(req: Request, res: Response) {
  try {
    const postId = toObjectId(req.params.id);
    const post = await PostModel.findById(postId);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.status(200).json({ message: 'Post found', post });
  } catch (error) {
    res.status(500).json({ error: 'An unknown error occurred' });
    console.error('Error in getPostById: ', error);
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    // Validate request body
    const input = PostCreateSchema.safeParse(req.body);
    const currentUserId = req.user!._id;
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
    const postId = toObjectId(req.params.id);
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
    const postId = toObjectId(req.params.id);
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
        $push: { likes: currentUserId },
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
