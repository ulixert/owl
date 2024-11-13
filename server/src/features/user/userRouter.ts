import express, { Router } from 'express';

import { protectRoute } from '../../middlewares/protectRoute.js';
import { login, logout, signup } from '../auth/authController.js';
import { followAndUnfollowUser, getUsers } from './userController.js';

export const userRouter: Router = express.Router();

// auth routes
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

// user routes
userRouter.post('/follow/:id', protectRoute, followAndUnfollowUser);

userRouter.route('/').get(getUsers);
