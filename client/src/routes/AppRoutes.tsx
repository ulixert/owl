import { createBrowserRouter } from 'react-router-dom';

import { Loading } from '@/components/Loading/Loading.tsx';

import { AuthRoutes } from './AuthRoutes.tsx';
import { PostRoutes } from './PostRoutes.tsx';
import { UserRoutes } from './UserRoutes.tsx';

export const router = createBrowserRouter(
  [
    {
      id: 'root',
      path: '/',
      async lazy() {
        const { AppLayout } = await import('@layouts/AppLayout/AppLayout.tsx');
        return { Component: AppLayout };
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
        ...PostRoutes,
        ...UserRoutes,
      ],
    },
    ...AuthRoutes,
    {
      path: '*',
      async lazy() {
        const { NotFoundPage } = await import('../pages/NotFoundPage.tsx');
        return { Component: NotFoundPage };
      },
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
