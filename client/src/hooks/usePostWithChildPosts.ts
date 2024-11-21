import { useLocation } from 'react-router-dom';

import { axiosInstance } from '@/api/axiosConfig.ts';
import { useQuery } from '@tanstack/react-query';

import { useChildPosts } from './useChildPosts';
import { Post } from './usePosts.tsx';

type PostResponse = {
  post: Post;
};

export function usePostWithChildPosts() {
  const location = useLocation();
  const postId = Number(location.pathname.split('/').pop());

  // Fetch the parent post
  const {
    data: parentPost,
    isLoading: isParentLoading,
    isError: isParentError,
  } = useQuery<PostResponse>({
    queryKey: ['parentPost', location.pathname],
    queryFn: async () => {
      const response = await axiosInstance.get<PostResponse>(`posts/${postId}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  const {
    data: childPostsData,
    isPending: isChildFetching,
    isError: isChildError,
    hasNextPage,
    fetchNextPage,
  } = useChildPosts(postId);

  return {
    parentPost,
    isParentLoading,
    isParentError,
    childPostsData,
    isChildFetching,
    isChildError,
    hasNextPage,
    fetchNextPage,
  } as const;
}
