import express, { Router } from 'express';

import { protectRoute } from '../../middlewares/protectRoute.js';
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
} from './postController.js';

export const postRouter: Router = express.Router();

postRouter.route('/:id').get(getPostById).delete(protectRoute, deletePost);
postRouter.route('/').post(protectRoute, createPost).get(getPosts);
