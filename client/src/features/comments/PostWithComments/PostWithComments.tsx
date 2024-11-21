import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { usePostWithChildPosts } from '@/hooks/usePostWithChildPosts.ts';
import { Center, Divider, Loader, Stack } from '@mantine/core';
import { useAuthStore } from '@stores/authStore.ts';

import { PostItem } from '../../posts/PostItem/PostItem.tsx';
import { AddComment } from '../AddComment/AddComment.tsx';
import { OriginalPost } from '../OriginalPost/OriginalPost.tsx';

export function PostWithComments() {
  const {
    parentPost,
    isParentLoading,
    isParentError,
    childPostsData,
    isChildFetching,
    isChildError,
    hasNextPage,
    fetchNextPage,
  } = usePostWithChildPosts();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isParentLoading) {
    return <Loader />;
  }

  if (isParentError) {
    return <div>Error loading parent post</div>;
  }

  return (
    <Stack>
      {parentPost && (
        <OriginalPost
          postText={parentPost.post.text}
          postImages={parentPost.post.images?.[0]}
          commentsCount={parentPost.post.commentsCount}
          likesCount={parentPost.post.likesCount}
          repostsCount={parentPost.post.repostsCount}
          postTime={parentPost.post.createdAt}
          username={parentPost.post.postedBy.username}
          avatar={parentPost.post.postedBy.profilePic}
        />
      )}

      {isAuthenticated && <AddComment />}

      <Divider mx={-16} />

      {/* Render Child Posts */}
      {childPostsData?.pages.map((page) =>
        page.childPosts.map((post) => (
          <PostItem
            postAuthorId={post.postedBy.id}
            key={post.id}
            postId={post.id}
            postTime={post.createdAt}
            postAuthor={post.postedBy.username}
            postAuthorAvatar={post.postedBy.profilePic}
            likesCount={post.likesCount}
            commentsCount={post.commentsCount}
            repostsCount={post.repostsCount}
            postText={post.text}
            postImages={post.images?.[0]}
          />
        )),
      )}

      {/* Infinite Scroll Loader */}
      {hasNextPage && (
        <div ref={ref}>
          {isChildFetching && (
            <Center>
              <Loader />
            </Center>
          )}
        </div>
      )}

      {/* Error Handling for Child Posts */}
      {isChildError && <div>Error loading child posts</div>}
    </Stack>
  );
}
