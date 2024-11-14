import { Request, Response } from 'express';
import { CommentCreateSchema } from 'validation';

import { CommentModel } from '../../models/commentModel.js';
import { PostModel } from '../../models/postModel.js';
import { toObjectId } from '../../utils/toObjectId.js';

export async function getPostComments(req: Request, res: Response) {
  try {
    const postId = toObjectId(req.params.id);
    const comments = await CommentModel.find({ postId });
    res.status(200).json({ message: 'Comments found', comments });
  } catch (error) {
    res.status(500).json({ error: 'An unknown error occurred' });
    console.error('Error in getPostComments: ', error);
  }
}

export async function commentPost(req: Request, res: Response) {
  try {
    // Validate request body
    const input = CommentCreateSchema.safeParse(req.body);
    if (!input.success) {
      res.status(400).json({ error: 'Invalid comment data' });
      return;
    }

    // Check if the post exists
    const postId = toObjectId(req.params.id);
    const post = await PostModel.findById(postId);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const currentUser = req.user!;
    const { text } = input.data;

    // Create comment
    const comment = await CommentModel.create({
      postId,
      userId: currentUser._id,
      text,
      username: currentUser.username,
      profilePicUrl: currentUser.profilePicUrl,
    });

    // Update post comments count
    await PostModel.findByIdAndUpdate(postId, {
      $inc: { commentsCount: 1 },
    });

    res.status(201).json({ message: 'Comment created', comment });
  } catch (error) {
    res.status(500).json({ error: 'An unknown error occurred' });
    console.error('Error in commentPost: ', error);
  }
}
