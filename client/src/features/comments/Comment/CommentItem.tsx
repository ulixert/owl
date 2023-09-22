import { useState } from 'react';

import { Avatar, Divider, Flex, Text } from '@mantine/core';

import { PostActions } from '../../posts/PostActions/PostActions.tsx';
import { PostContent } from '../../posts/PostContent/PostContent.tsx';
import { PostHeader } from '../../posts/PostHeader/PostHeader.tsx';
import { PostMain } from '../../posts/PostMain/PostMain.tsx';

type CommentItemProps = {
  comment: string;
  createdAt: string;
  likes: number;
  userName: string;
  userAvatar?: string;
};

export function CommentItem({
  comment,
  createdAt,
  likes,
  userName,
  userAvatar,
}: CommentItemProps) {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex gap={12} py={8} my={8} w="100%">
        <Avatar src={userAvatar} alt={userName} size="md">
          {userName.slice(0, 2).toUpperCase()}
        </Avatar>
        <PostMain gap={4}>
          <PostHeader createdAt={createdAt} userName={userName} />
          <PostContent postText={comment} />
          <PostActions liked={liked} setLiked={setLiked} />
          <Text my={-6} c="gray.6" size="sm">
            {likes + (liked ? 1 : 0)} likes
          </Text>
        </PostMain>
      </Flex>

      <Divider my={16} />
    </>
  );
}
