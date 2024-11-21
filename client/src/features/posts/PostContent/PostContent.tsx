import { Image, Text } from '@mantine/core';

type PostContentProps = {
  postText?: string;
  postImg?: string;
};

export function PostContent({ postText, postImg }: PostContentProps) {
  return (
    <>
      {postText && <Text size="sm">{postText}</Text>}
      {postImg && <Image src={postImg} w="100%" radius="md" />}
    </>
  );
}
