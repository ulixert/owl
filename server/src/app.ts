import cookieParser from 'cookie-parser';
import express, { Application, NextFunction } from 'express';

import { connectDB } from './db/connectDB.js';
import { NotFoundError } from './errors/errors.js';
import { authRouter } from './features/auth/authRouter.js';
import { postRouter } from './features/post/postRouter.js';
import { userRouter } from './features/user/userRouter.js';

void connectDB();

export const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
export const API_PREFIX = process.env.API_PREFIX ?? '/api/v1';
app.use(`${API_PREFIX}/users`, userRouter);
app.use(`${API_PREFIX}/posts`, postRouter);
app.use(`${API_PREFIX}/auth`, authRouter);

// Error handling
app.all('*', (req, _, next: NextFunction) => {
  const err = new NotFoundError(`Can't find ${req.originalUrl} on this server`);
  next(err);
});
