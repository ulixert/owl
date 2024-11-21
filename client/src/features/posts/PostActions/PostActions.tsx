import { useState } from 'react';

import { Center, Group, Text } from '@mantine/core';
import {
  IconHeart,
  IconMessageCircle,
  IconRepeat,
  IconSend,
} from '@tabler/icons-react';

import { PostAction } from './PostAction.tsx';
import classes from './PostActions.module.css';

type ActionsProps = {
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
};

export function PostActions({
  likesCount,
  commentsCount,
  repostsCount,
}: ActionsProps) {
  const [liked, setLiked] = useState(false);
  const currentLikesCount = liked ? likesCount + 1 : likesCount;

  return (
    <Group ml={-6} gap={12}>
      <Center>
        <PostAction color="red" onClick={() => setLiked(!liked)} type="like">
          <IconHeart className={liked ? classes.liked : ''} />
        </PostAction>
        <Text className={classes.count}>
          {currentLikesCount === 0 ? '' : currentLikesCount}
        </Text>
      </Center>

      <Center>
        <PostAction
          color="blue"
          type="reply"
          onClick={() => {
            console.log('commented'); // TODO
          }}
        >
          <IconMessageCircle />
        </PostAction>
        <Text className={classes.count}>
          {commentsCount === 0 ? '' : commentsCount}
        </Text>
      </Center>

      <Center>
        <PostAction
          type="repost"
          color="green"
          onClick={() => {
            console.log('repost');
          }}
        >
          <IconRepeat />
        </PostAction>
        <Text className={classes.count}>
          {repostsCount === 0 ? '' : repostsCount}
        </Text>
      </Center>

      <PostAction
        type="share"
        color="yellow"
        onClick={() => {
          console.log('share');
        }}
      >
        <IconSend />
      </PostAction>
    </Group>
  );
}
