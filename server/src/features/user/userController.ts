import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { UserUpdateSchema } from 'validation';

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
    const { id } = req.params;
    const currentUser = req.user!;
    const currentUserId = currentUser._id;

    // Convert the string ID to a MongoDB ObjectId
    const targetUserId = new mongoose.Types.ObjectId(id);
    const targetUser = await UserModel.findById(targetUserId);

    // Check if the user is trying to follow/unfollow themselves
    if (targetUserId.equals(currentUserId)) {
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
      await UserModel.findByIdAndUpdate(currentUserId, {
        $pull: { following: targetUserId },
      });
      await UserModel.findByIdAndUpdate(targetUserId, {
        $pull: { followers: currentUserId },
      });

      res.status(200).json({ message: 'User unfollowed successfully.' });
    } else {
      await UserModel.findByIdAndUpdate(currentUserId, {
        $addToSet: { following: targetUserId },
      });
      await UserModel.findByIdAndUpdate(targetUserId, {
        $addToSet: { followers: currentUserId },
      });

      res.status(200).json({ message: 'User followed successfully.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
    console.error('Error in followAndUnfollowUser: ', error);
  }
}

export async function updateUserProfile(req: Request, res: Response) {
  try {
    const input = UserUpdateSchema.safeParse(req.body);
    if (!input.success) {
      res.status(400).json({ message: 'Invalid user data' });
      return;
    }

    const currentUser = req.user!;
    const currentUserId = currentUser._id;

    await UserModel.findByIdAndUpdate(currentUserId, input.data);

    res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
    console.error('Error in updateUser: ', error);
  }
}

export async function getSuggestedUsers(req: Request, res: Response) {
  try {
    const currentUser = req.user!;
    const currentUserId = currentUser._id;

    const users = await UserModel.find({
      _id: { $ne: currentUserId },
      followers: { $ne: currentUserId },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
    console.error('Error in getSuggestedUsers: ', error);
  }
}

export async function getUserProfile(req: Request, res: Response) {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ username }).select('-updatedAt');

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
    console.error('Error in getUserProfile: ', error);
  }
}
