import { Avatar, Button, Divider, Flex, Textarea } from '@mantine/core';

import styles from './AddComment.module.css';

export function AddComment() {
  return (
    <>
      <Divider my={16} mx={-16} />

      <Flex gap={12}>
        <Avatar src="/avatar.webp" size="md" />
        <Textarea
          autosize
          placeholder="Post your reply"
          className={styles.content}
        />
        <Button className={styles.reply} radius={100}>
          Reply
        </Button>
      </Flex>
    </>
  );
}
