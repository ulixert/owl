import { Request, Response } from 'express';
import { UserCreateSchema, UserLoginSchema } from 'validation';

import argon2 from '@node-rs/argon2';

import { UserModel } from '../../models/userModel.js';
import { generateTokenAndSetCookie } from '../../utils/generateTokenAndSetCookie.js';
import { checkPassword } from './utils/checkPassword.js';

export async function login(req: Request, res: Response) {
  try {
    // Validate input
    const input = UserLoginSchema.safeParse(req.body);
    if (!input.success) {
      res.status(400).json({ message: 'Invalid user data' });
      return;
    }

    const { username, password } = input.data;
    const user = await UserModel.findOne({ username }).select('+password');

    // Check if password is correct
    const isPasswordCorrect = await checkPassword(user?.password, password);
    if (!user || !isPasswordCorrect) {
      res.status(400).json({ message: 'Invalid username or password' });
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
    res.status(500).json({ message: 'An unknown error occurred.' });
    console.error('Error in login: ', error);
  }
}

export function logout(_req: Request, res: Response) {
  try {
    res.clearCookie('jwt').status(200).json({ message: 'Logged out' });
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
    console.error('Error in logout: ', error);
  }
}

export async function signup(req: Request, res: Response) {
  try {
    // Validate input
    const input = UserCreateSchema.safeParse(req.body);
    if (!input.success) {
      res.status(400).json({ message: 'Invalid user data' });
      return;
    }

    // Check if user already exists
    const { username, email, name, password } = input.data;
    const user = await UserModel.findOne({ $or: [{ email }, { username }] });

    if (user) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create new user
    const hashedPassword = await argon2.hash(password);

    const newUser = await UserModel.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    generateTokenAndSetCookie(res, newUser._id.toString());

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
    });
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
    console.error('Error in signup: ', error);
  }
}
