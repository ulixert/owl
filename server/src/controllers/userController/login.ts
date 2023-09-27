import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { UserLoginSchema } from 'validation';

import { UserModel } from '../../models/userModel.js';
import { generateTokenAndSetCookie } from '../../utils/generateTokenAndSetCookie.js';

export async function login(req: Request, res: Response) {
  try {
    // Validate input
    const input = UserLoginSchema.safeParse(req.body);
    if (!input.success) {
      res.status(400).json({ message: input.error });
      return;
    }

    const { username, password } = input.data;
    const user = await UserModel.findOne({ username });

    // Check if user exists
    if (!user) {
      res.status(400).json({ message: 'User does not exist' });
      return;
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: 'Invalid password' });
      return;
    }

    // return user
    generateTokenAndSetCookie(res, user._id.toString());
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      console.log('Error in loginUser: ', error.message);
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
      console.error('Error in loginUser: ', error);
    }
  }
}
