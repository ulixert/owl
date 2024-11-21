import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Flex } from '@mantine/core';

import { PostActions } from '../PostActions/PostActions.tsx';
import { PostContent } from '../PostContent/PostContent.tsx';
import { PostHeader } from '../PostHeader/PostHeader.tsx';
import { PostLeftBar } from '../PostLeftBar/PostLeftBar.tsx';
import { PostMain } from '../PostMain/PostMain.tsx';
import { PostStats } from '../PostStats/PostStats.tsx';
import styles from './PostItem.module.css';

type PostProps = {
  likes: number;
  replies: number;
  postText: string;
  postImg?: string;
};

export function PostItem({ likes, replies, postImg, postText }: PostProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Link to="/post/1" className={styles.post}>
      <Flex gap={12} mb={16} py={20}>
        <PostLeftBar />
        <PostMain>
          <PostHeader createdAt="1d" userName="Thomas" />
          <PostContent postText={postText} postImg={postImg} />
          <PostActions liked={liked} setLiked={setLiked} />
          <PostStats replies={replies} likes={likes} />
        </PostMain>
      </Flex>
    </Link>
  );
}
