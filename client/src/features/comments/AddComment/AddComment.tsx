import { UserAvatar } from '@/components/UserAvatar/UserAvatar.tsx';
import { Button, Divider, Flex, Textarea } from '@mantine/core';
import { useAuthStore } from '@stores/authStore.ts';

import classes from './AddComment.module.css';

export function AddComment() {
  const userData = useAuthStore((state) => state.userData);

  return (
    <>
      <Divider mx={-16} />

      <Flex gap={12}>
        <UserAvatar
          username={userData?.username ?? ''}
          avatar={userData?.profilePic ?? ''}
        />
        <Textarea
          autosize
          placeholder="Post your reply"
          className={classes.content}
        />
        <Button className={classes.reply} radius={100}>
          Reply
        </Button>
      </Flex>
    </>
  );
}
