import { Avatar, Box, Flex } from '@mantine/core';

import styles from './PostLeftBar.module.css';

export function PostLeftBar() {
  return (
    <Flex direction="column" align="center">
      <Avatar alt="Thomas" src="/avatar.webp" />
      <Box w={1} bg="gray.6" my={8} className={styles.line} />
      <Box className={styles.avatars} w="100%">
        <Avatar
          size={18}
          alt="Tom"
          src="https://i.pravatar.cc/100?u=tom"
          top={-4}
          right={2}
        />
        <Avatar
          size={15}
          alt="John"
          src="https://i.pravatar.cc/100?u=john"
          top={0}
          left={-3}
        />
        <Avatar
          size={12}
          alt="Emily"
          src="https://i.pravatar.cc/100?u=emily"
          top={17}
          left={13}
        />
      </Box>
    </Flex>
  );
}
