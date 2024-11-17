import express, { Router } from 'express';

import { protectRoute } from '../../middlewares/protectRoute.js';
import { commentPost, getPostComments } from '../comment/commentController.js';
import {
  createPost,
  deletePost,
  getAllPosts,
  getFeedPosts,
  getHotPosts,
  getPostById,
  likeUnlikePost,
} from './postController.js';

export const postRouter: Router = express.Router();

postRouter.get('/feed', protectRoute, getFeedPosts);
postRouter.get('/hot', getHotPosts);

postRouter.put('/:postId/like', protectRoute, likeUnlikePost);
postRouter.route('/:postId').get(getPostById).delete(protectRoute, deletePost);

// Comments
postRouter
  .route('/:postId/comments')
  .get(protectRoute, getPostComments)
  .post(protectRoute, commentPost);

postRouter.route('/').post(protectRoute, createPost).get(getAllPosts);
