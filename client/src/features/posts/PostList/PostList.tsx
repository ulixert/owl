import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Loading } from '@/components/Loading/Loading.tsx';
import { usePosts } from '@/hooks/usePosts.tsx';
import { Center, Loader, Stack } from '@mantine/core';

import { PostItem } from '../PostItem/PostItem.tsx';

export function PostList() {
  const { data, isPending, isError, hasNextPage, fetchNextPage, isFetching } =
    usePosts();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <Stack>
      {data?.pages.map((page) =>
        page.posts.map((post) => (
          <PostItem
            postId={post.id}
            key={post.id}
            postText={post.text ?? ''}
            postImg={post?.images?.[0]}
            postTime={post.createdAt}
            postAuthor={post.postedBy.username}
            postAuthorId={post.postedBy.id}
            postAuthorAvatar={post.postedBy.profilePic}
            likesCount={post.likesCount}
            commentsCount={post.commentsCount}
            repostsCount={post.repostsCount}
          />
        )),
      )}

      {hasNextPage && (
        <div ref={ref}>
          {isFetching && (
            <Center>
              <Loader type="bars" />
            </Center>
          )}
        </div>
      )}
    </Stack>
  );
}
