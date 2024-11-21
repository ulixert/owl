import { RouteObject } from 'react-router-dom';

import { PostList } from '@/features/posts/PostList/PostList.tsx';

import { ProtectedRoute } from './ProtectedRoute.tsx';

export const PostRoutes = (): RouteObject[] => [
  { path: 'hot', element: <PostList /> },
  {
    path: 'for-you',
    element: (
      <ProtectedRoute>
        <PostList />
      </ProtectedRoute>
    ),
  },
  {
    path: 'following',
    element: (
      <ProtectedRoute>
        <PostList />
      </ProtectedRoute>
    ),
  },
  {
    path: 'liked',
    element: (
      <ProtectedRoute>
        <PostList />
      </ProtectedRoute>
    ),
  },
  {
    path: 'saved',
    element: (
      <ProtectedRoute>
        <PostList />
      </ProtectedRoute>
    ),
  },
];
