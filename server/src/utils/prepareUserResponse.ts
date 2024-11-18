import { UserType } from 'validation';

export function prepareUserResponse(user: UserType) {
  const {
    id,
    username,
    email,
    name,
    profilePic,
    followersCount,
    followingCount,
    biography,
    createdAt,
  } = user;

  return {
    id,
    username,
    email,
    name,
    profilePic,
    followersCount,
    followingCount,
    biography,
    createdAt,
  };
}
