import { Image, Text } from '@mantine/core';

type PostContentProps = {
  postText?: string;
  postImages?: string;
};

export function PostContent({ postText, postImages }: PostContentProps) {
  return (
    <>
      {postText && <Text size="sm">{postText}</Text>}
      {postImages && <Image src={postImages} w="100%" radius="lg" />}
    </>
  );
}
