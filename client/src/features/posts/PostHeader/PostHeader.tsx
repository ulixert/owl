import { Flex, Image, Text } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';

type PostHeaderProps = {
  userName: string;
  createdAt: string;
};

export function PostHeader({ userName, createdAt }: PostHeaderProps) {
  return (
    <Flex justify="space-between" w="100%">
      <Flex w="100%" align="center">
        <Text size="sm" fw="600">
          {userName}
        </Text>
        <Image src="/verified.webp" w={16} h={16} ml={4} />
      </Flex>

      <Flex gap={16} align="center">
        <Text size="sm" c="gray.6">
          {createdAt}
        </Text>
        <IconDots cursor="pointer" />
      </Flex>
    </Flex>
  );
}
