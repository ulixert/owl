import { Request, Response } from 'express';

import { UserModel } from '../../models/userModel.js';

export async function getUsers(_req: Request, res: Response) {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
    console.error('Error in getUsers: ', error);
  }
}

export async function followAndUnfollowUser(req: Request, res: Response) {
  try {
    const { id: targetUserId } = req.params;
    const currentUser = req.user!;
    const targetUser = await UserModel.findById(targetUserId);

    if (targetUserId === currentUser._id.toString()) {
      res
        .status(400)
        .json({ message: 'You cannot follow or unfollow yourself.' });
      return;
    }

    if (!targetUser) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      await UserModel.findByIdAndUpdate(currentUser._id, {
        $pull: { following: targetUserId },
      });
      await UserModel.findByIdAndUpdate(targetUser._id, {
        $pull: { followers: currentUser._id },
      });
      res.status(200).json({ message: 'User unfollowed successfully.' });
    } else {
      await UserModel.findByIdAndUpdate(currentUser._id, {
        $push: { following: targetUserId },
      });
      await UserModel.findByIdAndUpdate(targetUser._id, {
        $push: { followers: currentUser._id },
      });
      res.status(200).json({ message: 'User followed successfully.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
    console.error('Error in followAndUnfollowUser: ', error);
  }
}
