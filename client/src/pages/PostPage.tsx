import { useEffect } from 'react';

import { PostWithComments } from '@/features/comments/PostWithComments/PostWithComments.tsx';
import { useTitleStore } from '@stores/titleStore.ts';

export function PostPage() {
  const setTitle = useTitleStore((state) => state.setTitle);

  useEffect(() => {
    setTitle('Post');
  }, [setTitle]);

  return <PostWithComments />;
}
