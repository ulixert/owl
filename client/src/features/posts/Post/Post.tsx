import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Flex, Image, Text } from '@mantine/core';

import { Actions } from '../Actions/Actions.tsx';
import { LeftBar } from '../LeftBar/LeftBar.tsx';
import { PostHeader } from '../PostHeader/PostHeader.tsx';
import styles from './Post.module.css';

type PostProps = {
  likes: number;
  replies: number;
  postText: string;
  postImg?: string;
};

export function Post({ likes, replies, postImg, postText }: PostProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Link to="/thomas/post/1" className={styles.post}>
      <Flex gap={12} mb={16} py={20}>
        <LeftBar />

        <Flex direction="column" gap={8} className={styles.postContent}>
          <PostHeader />

          <Text size="sm">{postText}</Text>
          {postImg && <Image src={postImg} w="100%" radius="md" />}

          <Flex gap={12} mt={8}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>

          <Flex gap={8} align="center" c="gray.6">
            <Text size="sm">{replies} replies</Text>
            <Text>&bull;</Text>
            <Text size="sm">{likes} likes</Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}
