import { Button, Divider, Flex, Textarea } from '@mantine/core';

import classes from './AddComment.module.css';

export function AddComment() {
  return (
    <>
      <Divider mx={-16} />

      <Flex gap={12}>
        <Textarea
          autosize
          placeholder="Post your reply"
          className={classes.content}
        />
        <Button className={classes.reply} radius={100}>
          Reply
        </Button>
      </Flex>
    </>
  );
}
