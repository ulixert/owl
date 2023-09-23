import { Request, Response } from 'express';

export function logout(_req: Request, res: Response) {
  try {
    res.clearCookie('token').json({ message: 'Logged out' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      console.log('Error in logoutUser: ', error.message);
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
      console.error('Error in logoutUser: ', error);
    }
  }
}
