import express, { Router } from 'express';

import { protectRoute } from '../../middlewares/protectRoute.js';
import {
  followAndUnfollowUser,
  getUserProfile,
  updateUserProfile,
} from './userController.js';

export const userRouter: Router = express.Router();

userRouter.get('/:username', getUserProfile);
userRouter.put('/follow/:id', protectRoute, followAndUnfollowUser);
userRouter.put('/me/profile', protectRoute, updateUserProfile);
