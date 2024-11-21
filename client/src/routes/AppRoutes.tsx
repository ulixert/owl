import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const PostRoutes = lazy(() => import('./PostRoutes.tsx'));

export const router = createBrowserRouter(
  [
    {
      path: '/',
      async lazy() {
        const { Layout } = await import('../layouts/Layout/Layout.tsx');
        return { Component: Layout };
      },
      children: [
        {
          path: '/',
          async lazy() {
            const { HomePage } = await import('../pages/HomePage.tsx');
            return { Component: HomePage };
          },
        },
        ...PostRoutes(),
        ...AuthRoutes(),
        { path: 'posts/:postId', element: <PostPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  {
    future: {
      v7_partialHydration: true,
      v7_fetcherPersist: true,
      v7_skipActionErrorRevalidation: true,
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
    },
  },
);
