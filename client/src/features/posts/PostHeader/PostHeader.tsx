import { Flex, Image, Text } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';

export function PostHeader() {
  return (
    <Flex justify="space-between" w="100%">
      <Flex w="100%" align="center">
        <Text size="sm" fw="600">
          Thomas
        </Text>
        <Image src="/verified.webp" w={16} h={16} ml={4} />
      </Flex>

      <Flex gap={16} align="center">
        <Text size="sm" c="gray.6">
          1d
        </Text>
        <IconDots />
      </Flex>
    </Flex>
  );
}
