import express, { Router } from 'express';

import { protectRoute } from '../../middlewares/protectRoute.js';
import { createPost, getPostById, getPosts } from './postController.js';

export const postRouter: Router = express.Router();

postRouter.route('/:id').get(getPostById);
postRouter.route('/').post(protectRoute, createPost).get(getPosts);
