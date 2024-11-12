import cookieParser from 'cookie-parser';
import express, { Application, NextFunction } from 'express';

import { connectDB } from './db/connectDB.js';
import { NotFoundError } from './errors/errors.js';
import { userRouter } from './routes/userRouter.js';

void connectDB();
export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/users', userRouter);

// Error handling
app.all('*', (req, _, next: NextFunction) => {
  const err = new NotFoundError(`Can't find ${req.originalUrl} on this server`);
  next(err);
});
