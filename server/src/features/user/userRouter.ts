import express, { Router } from 'express';

import { protectRoute } from '../../middlewares/protectRoute.js';
import { login, logout, signup } from '../auth/authController.js';
import {
  followAndUnfollowUser,
  getUserProfile,
  getUsers,
  updateUserProfile,
} from './userController.js';

export const userRouter: Router = express.Router();

// auth routes
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

// user routes
userRouter.get('/:username', getUserProfile);
userRouter.put('/follow/:id', protectRoute, followAndUnfollowUser);
userRouter.put('/me/profile', protectRoute, updateUserProfile);

userRouter.route('/').get(getUsers);
