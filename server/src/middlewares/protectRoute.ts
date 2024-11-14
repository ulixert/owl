import { NextFunction, Request, Response } from 'express';

import { UserModel } from '../models/userModel.js';
import { jwtVerify } from './utils/jwtVerify.js';

export async function protectRoute(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // 1) Get the token from the headers
    // const token = req.headers.authorization?.split(' ')[1];
    const token =
      typeof req.cookies?.jwt === 'string' ? req.cookies.jwt : undefined;

    if (!token) {
      res
        .status(401)
        .json({ message: 'Unauthorized. Please log in to get access.' });
      return;
    }

    // 2) Verify the token
    const { userId } = await jwtVerify(token, process.env.JWT_SECRET!);

    // 3) Check if user still exists
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(401).json({
        message: 'The user belonging to this token no longer exists.',
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
    console.error('Error in protectRoute: ', error);
  }
}
