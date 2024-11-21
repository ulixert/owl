import { UserAvatar } from '@/components/UserAvatar/UserAvatar.tsx';
import { Stack } from '@mantine/core';

type PostLeftBarProps = {
  username: string;
  avatar: string | null;
};

export function PostLeftBar({ username, avatar }: PostLeftBarProps) {
  return (
    <Stack align="center">
      <UserAvatar username={username} avatar={avatar} />
    </Stack>
  );
}
