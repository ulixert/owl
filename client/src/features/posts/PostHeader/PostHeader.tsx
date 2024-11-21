import { Flex, Text } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';

type PostHeaderProps = {
  userName: string;
  createdAt: string;
};

export function PostHeader({ userName, createdAt }: PostHeaderProps) {
  return (
    <Flex justify="space-between" w="100%" align="flex-start">
      <Flex w="100%" align="center" gap={10}>
        <Text size="sm" fw="600">
          {userName}
        </Text>
        <Text size="sm" c="gray.6">
          {createdAt}
        </Text>
      </Flex>

      <Flex align="center">
        <IconDots cursor="pointer" />
      </Flex>
    </Flex>
  );
}
