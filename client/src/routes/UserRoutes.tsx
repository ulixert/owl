import { Loading } from '@/components/Loading/Loading.tsx';

export const UserRoutes = [
  {
    path: 'profile',
    async lazy() {
      const { ProfilePage } = await import('../pages/ProfilePage.tsx');
      return { Component: ProfilePage };
    },
    hydrateFallbackElement: <Loading />,
  },
];
