import { useState } from 'react';

import { CommentItem } from '@/features/comments/Comment/CommentItem.tsx';
import { PostActions } from '@/features/posts/PostActions/PostActions.tsx';
import { PostContent } from '@/features/posts/PostContent/PostContent.tsx';
import { PostHeader } from '@/features/posts/PostHeader/PostHeader.tsx';
import { PostMain } from '@/features/posts/PostMain/PostMain.tsx';
import { PostStats } from '@/features/posts/PostStats/PostStats.tsx';
import { Avatar, Button, Divider, Flex, Text } from '@mantine/core';

function PostPage() {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <PostMain>
        <Flex gap={12}>
          <Avatar src="/avatar.webp" alt="thomas" size="md" />
          <PostHeader userName="Thomas" createdAt="1d" />
        </Flex>
        <PostContent postText="this is my first post" />
        <PostActions liked={liked} setLiked={setLiked} />
        <PostStats replies={423} likes={342 + (liked ? 1 : 0)} />
      </PostMain>
      <Divider my={16} />
      <Flex justify="space-between">
        <Flex gap={8} align="center">
          <Text size="xxl">👋</Text>
          <Text c="gray.6">Reply here</Text>
        </Flex>
        <Button>Reply</Button>
      </Flex>
      <Divider my={16} />
      <CommentItem
        likes={22}
        comment="I love your post"
        createdAt="1m"
        userName="Tom"
        userAvatar="https://i.pravatar.cc/100?u=tom"
      />{' '}
      <CommentItem
        likes={432}
        comment="Thank you for your information"
        createdAt="1d"
        userName="Emily"
      />{' '}
      <CommentItem
        likes={342}
        comment="You are the god"
        createdAt="3d"
        userName="Joe"
        userAvatar="https://i.pravatar.cc/100?u=jonas"
      />
    </>
  );
}

export default PostPage;
