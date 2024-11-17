import { PostList } from '@/features/posts/PostList/PostList.tsx';
import { Container } from '@mantine/core';

function HomePage() {
  return (
    <Container>
      <PostList />
    </Container>
  );
}

export default HomePage;
