import { Request, Response } from 'express';
import { UserUpdateSchema } from 'validation';

import { prisma } from '../../db/index.js';

export async function followAndUnfollowUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const currentUserId = req.user!.id;
    const targetUserId = Number.parseInt(id, 10);

    // Check if the user is trying to follow/unfollow themselves
    if (targetUserId === currentUserId) {
      res.status(400).json({
        message: 'You cannot follow or unfollow yourself.',
      });
      return;
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      res.status(404).json({
        message: 'User not found.',
      });
      return;
    }

    // Check if the user is already following the target user
    const isFollowing = await prisma.userFollows.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: targetUserId,
        },
      },
    });

    if (isFollowing) {
      // Unfollow the user
      await prisma.userFollows.delete({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: targetUserId,
          },
        },
      });

      // Update the user's following count
      await prisma.user.update({
        where: { id: targetUserId },
        data: {
          followersCount: {
            decrement: 1,
          },
        },
      });

      await prisma.user.update({
        where: { id: currentUserId },
        data: {
          followingCount: {
            decrement: 1,
          },
        },
      });

      res.status(204).send();
    } else {
      // Follow the user
      await prisma.userFollows.create({
        data: {
          followerId: currentUserId,
          followingId: targetUserId,
        },
      });

      // Update the user's following count
      await prisma.user.update({
        where: { id: targetUserId },
        data: {
          followersCount: {
            increment: 1,
          },
        },
      });

      await prisma.user.update({
        where: { id: currentUserId },
        data: {
          followingCount: {
            increment: 1,
          },
        },
      });

      res.status(204).send();
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

    const currentUserId = req.user!.id;

    await prisma.user.update({
      where: { id: currentUserId },
      data: input.data,
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
    console.error('Error in updateUser: ', error);
  }
}

export async function getUserProfile(req: Request, res: Response) {
  try {
    const { username } = req.params;
    const user = await prisma.user.findUnique({
      where: { username },
      omit: {
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred.' });
    console.error('Error in getUserProfile: ', error);
  }
}
