import { PostType } from 'validation';

import { axiosInstance } from '@/api/axiosConfig.ts';
import { Loading } from '@/components/Loading/Loading.tsx';
import { Button, Stack, Text, Title } from '@mantine/core';
import { useAuthStore } from '@stores/authStore.ts';
import { useQuery } from '@tanstack/react-query';

import { PostItem } from '../PostItem/PostItem.tsx';

export function PostList() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  console.log('Initial isAuthenticated', isAuthenticated);

  async function fetchPosts() {
    const endpoint = isAuthenticated ? '/posts/feed' : '/posts/hot';

    const response = await axiosInstance.get<{
      message: string;
      posts: PostType[];
    }>(endpoint);

    console.log('isAuthenticated', isAuthenticated);
    console.log(response.data.posts);
    return response.data.posts;
  }

  const {
    data: posts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['posts', isAuthenticated],
    queryFn: fetchPosts,
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <Stack>
      <Title>{isAuthenticated ? 'Feed' : 'Hot'}</Title>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem
            likes={post.likes.length}
            replies={post.commentsCount}
            postText={post.text ?? 'empty'}
            key={post.text}
          />
        ))
      ) : (
        <div>
          <Text>No posts</Text>
          <Button onClick={fetchPosts}>Reload</Button>
        </div>
      )}
    </Stack>
  );
}
