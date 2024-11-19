import express, { Router } from 'express';

import { protectRoute } from '../../middlewares/protectRoute.js';
import {
  likeUnlikePost,
  repostUnrepost,
  saveOrUnsavePost,
} from './actionController.js';
import { getFeedPosts } from './feedController.js';
import {
  createPost,
  deletePost,
  getChildPosts,
  getHotPosts,
  getPostById,
} from './postController.js';

export const postRouter: Router = express.Router();

postRouter.get('/feed', protectRoute, getFeedPosts);
postRouter.get('/hot', getHotPosts);

postRouter.get('/:postId', getPostById);
postRouter.get('/:postId/children', getChildPosts);

postRouter.post('/:parentPostId', protectRoute, createPost);
postRouter.post('/', protectRoute, createPost);

postRouter.delete('/:postId', protectRoute, deletePost);

// Like, save, and repost routes
postRouter.put('/:postId/like', protectRoute, likeUnlikePost);
postRouter.put('/:postId/save', protectRoute, saveOrUnsavePost);
postRouter.put('/:postId/repost', protectRoute, repostUnrepost);
