import { Flex, Text } from '@mantine/core';

type PostStatsProps = {
  replies: number;
  likes: number;
};

export function PostStats({ replies, likes }: PostStatsProps) {
  return (
    <Flex gap={8} align="center" c="gray.6" mt={-8}>
      <Text size="sm">{replies} replies</Text>
      <Text>&bull;</Text>
      <Text size="sm">{likes} likes</Text>
    </Flex>
  );
}
