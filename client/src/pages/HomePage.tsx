import { useEffect } from 'react';

import { PostList } from '@/features/posts/PostList/PostList.tsx';
import { useAuthStore } from '@stores/authStore.ts';
import { useTitleStore } from '@stores/titleStore.ts';

function HomePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setTitle = useTitleStore((state) => state.setTitle);

  useEffect(() => {
    setTitle(isAuthenticated ? 'For You' : 'Home');
  }, [isAuthenticated, setTitle]);

  return <PostList />;
}

export default HomePage;
