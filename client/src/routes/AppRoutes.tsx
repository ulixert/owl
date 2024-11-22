import { createBrowserRouter } from 'react-router-dom';

import { Loading } from '@/components/Loading/Loading.tsx';

import { AuthRoutes } from './AuthRoutes.tsx';
import { PostRoutes } from './PostRoutes.tsx';

export const router = createBrowserRouter(
  [
    {
      id: 'root',
      path: '/',
      async lazy() {
        const { Layout } = await import('../layouts/Layout/Layout.tsx');
        return { Component: Layout };
      },
      hydrateFallbackElement: <Loading />,
      children: [
        {
          path: '/',
          async lazy() {
            const { HomePage } = await import('../pages/HomePage.tsx');
            return { Component: HomePage };
          },
        },
        PostRoutes,
        ...AuthRoutes(),
        {
          path: 'posts/:postId',
          async lazy() {
            const { PostPage } = await import('../pages/PostPage.tsx');
            return { Component: PostPage };
          },
        },
        {
          path: '*',
          async lazy() {
            const { NotFoundPage } = await import('../pages/NotFoundPage.tsx');
            return { Component: NotFoundPage };
          },
        },
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
