import { useLocation } from 'react-router-dom';

import { LoginButton } from '@/components/LoginButton/LoginButton.tsx';
import { AppShell, Container } from '@mantine/core';
import { useAuthStore } from '@stores/authStore.ts';

import { Footer } from '../Footer/Footer.tsx';
import { Header } from '../Header/Header.tsx';
import { NavBar } from '../NavBar/NavBar.tsx';
import classes from './Layout.module.css';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  return (
    <AppShell
      layout="alt"
      padding="md"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      {!isAuthenticated && location.pathname !== '/login' && <LoginButton />}

      <AppShell.Navbar
        p="md"
        visibleFrom="sm"
        withBorder={false}
        className={classes.navbar}
      >
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Header withBorder={false} className={classes.header}>
        <Header />
      </AppShell.Header>

      <Container size={640} className={classes.container}>
        <AppShell.Main className={classes.main}>{children}</AppShell.Main>
      </Container>

      <AppShell.Footer hiddenFrom="sm" withBorder={false}>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
