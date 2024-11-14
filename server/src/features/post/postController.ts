import { Request, Response } from 'express';
import { PostCreateSchema } from 'validation';

import { PostModel } from '../../models/postModel.js';

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
    const postId = req.params.id;
    const post = await PostModel.findById(postId);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.status(200).json({ post });
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
