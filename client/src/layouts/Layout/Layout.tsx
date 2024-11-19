import { AppShell, Container } from '@mantine/core';

import { Footer } from '../Footer/Footer.tsx';
import { Header } from '../Header/Header.tsx';
import { NavBar } from '../NavBar/NavBar.tsx';
import classes from './Layout.module.css';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <AppShell
      layout="alt"
      padding="md"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <AppShell.Header withBorder={false}>
        {/*<Group h="100%" px="md">*/}
        {/*  <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />*/}
        {/*</Group>*/}
        <Header />
      </AppShell.Header>
      <AppShell.Navbar
        p="md"
        visibleFrom="sm"
        withBorder={false}
        className={classes.navbar}
      >
        <NavBar />
      </AppShell.Navbar>
      <Container size={640} className={classes.container}>
        <AppShell.Main className={classes.main}>{children}</AppShell.Main>
        <AppShell.Footer hiddenFrom="sm" withBorder={false}>
          <Footer />
        </AppShell.Footer>
      </Container>
    </AppShell>
  );
}
