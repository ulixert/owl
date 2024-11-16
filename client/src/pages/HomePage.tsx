import { Link } from 'react-router-dom';
import { PostType } from 'validation';

import { ApiResponse, axiosInstance } from '@/api/axiosConfig.ts';
import { Button } from '@mantine/core';
import { useAuthStore } from '@stores/authStore.ts';
import { useQuery } from '@tanstack/react-query';

function HomePage() {
  // TODO: Remove this function
  function handleClick() {
    axiosInstance
      .get('/posts/feed')
      .then((response) => {
        console.log('response', response); // TODO: Remove this line
      })
      .catch((error) => {
        console.log('error', error); // TODO: Remove this line
      });
  }

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log('isAuthenticated', isAuthenticated); // TODO: Remove this line

  async function fetchPosts() {
    const endpoint = isAuthenticated ? '/posts/feed' : '/posts/hot';
    const response = await axiosInstance.get<
      ApiResponse & { posts: PostType[] }
    >(endpoint);
    return response.data.posts;
  }

  const {
    data: posts,
    isPending,
    error,
  } = useQuery<PostType[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Link to="/Login">Login</Link>
      <Button onClick={handleClick}>Sign up</Button>
      {posts.map((post) => (
        <div key={post.text}>
          <p>{post.text}</p>
          <Button onClick={handleClick}>Feed</Button>
        </div>
      ))}
    </>
  );
}

export default HomePage;
