import { Anchor, Avatar, Box, Button, Flex, Stack, Text } from '@mantine/core';
import { IconBrandInstagram } from '@tabler/icons-react';

import { UserMoreMenu } from '../UserMoreMenu/UserMoreMenu.tsx';
import styles from './UserHeader.module.css';

export function UserHeader() {
  return (
    <Stack gap={16} align="start">
      <Flex justify="space-between" w="100%">
        <Box>
          <Text size="xl">Thomas</Text>
          <Flex gap={8} align={'center'}>
            <Text size="sm" c="gray.6">
              @Thomas
            </Text>
            <Button size="xs" className={styles.net} radius="lg" component="a">
              Owl.net
            </Button>
          </Flex>
        </Box>
        <Box>
          <Avatar alt="Thomas" src="/avatar.webp" size="xl">
            TH
          </Avatar>
        </Box>
      </Flex>

      <Text>Father, citizen and a dog keeper</Text>

      <Flex w="100%" justify="space-between">
        <Flex gap={8} align={'center'} c="gray.6" className={styles.follow}>
          <Anchor c="inherit">
            <span>3.2k</span> follows
          </Anchor>
          <Text>&bull;</Text>
          <Anchor c="inherit">
            <span>1.2k</span> followers
          </Anchor>
        </Flex>
        <Flex>
          <Box className={styles.iconContainer}>
            <IconBrandInstagram size={24} cursor="pointer" />
          </Box>
          <UserMoreMenu />
        </Flex>
      </Flex>

      <Flex w="100%">
        <Flex justify="center" pb={12} className={styles.posts}>
          <Text fw={600}>Posts</Text>
        </Flex>
        <Flex justify="center" pb={12} className={styles.replies}>
          <Text fw={500} c="gray.6">
            Replies
          </Text>
        </Flex>
      </Flex>
    </Stack>
  );
}
