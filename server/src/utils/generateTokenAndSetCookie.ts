import { Response } from 'express';
import jwt from 'jsonwebtoken';

export function generateTokenAndSetCookie(res: Response, userId: string) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
    sameSite: 'strict', // CSRF
  });

  return token;
}
