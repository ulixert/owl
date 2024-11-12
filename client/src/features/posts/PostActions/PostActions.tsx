import { Group } from '@mantine/core';
import {
  IconHeart,
  IconMessageCircle,
  IconRepeat,
  IconSend,
} from '@tabler/icons-react';

import { PostAction } from './PostAction.tsx';
import styles from './PostActions.module.css';

type ActionsProps = {
  liked: boolean;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
};

export function PostActions({ liked, setLiked }: ActionsProps) {
  return (
    <Group ml={-6} gap={6}>
      <PostAction color="red" onClick={() => setLiked(!liked)} type="like">
        <IconHeart className={liked ? styles.liked : ''} />
      </PostAction>
      <PostAction
        color="blue"
        type="reply"
        onClick={() => {
          console.log('message'); // TODO
        }}
      >
        <IconMessageCircle />
      </PostAction>
      <PostAction
        type="repost"
        color="green"
        onClick={() => {
          console.log('repost');
        }}
      >
        <IconRepeat />
      </PostAction>
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
