import { Avatar } from '@mantine/core';

type AvatarProps = {
  username: string;
  avatar: string | null;
};

export function UserAvatar({ username, avatar }: AvatarProps) {
  return (
    <Avatar
      alt={username}
      src={avatar}
      key={username}
      name={username}
      color="initials"
      allowedInitialsColors={['blue', 'green', 'orange', 'indigo']}
    />
  );
}
