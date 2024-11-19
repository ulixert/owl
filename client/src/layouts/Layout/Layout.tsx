import { Logo } from '@/components/Logo/Logo.tsx';
import { AppShell, Burger, Center, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout, IconSwitchHorizontal } from '@tabler/icons-react';

import { NavLink } from '../NavLinks/NavLink.tsx';
import { NavLinks } from '../NavLinks/NavLinks.tsx';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 60, collapsed: !opened }}
      navbar={{ width: 70, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Center>
          <Logo />
        </Center>

        <Stack justify="center" align="center" gap={10} flex={1}>
          <NavLinks />
        </Stack>

        <Stack justify="center" gap={0}>
          <NavLink icon={IconSwitchHorizontal} label="Change account" />
          <NavLink icon={IconLogout} label="Logout" />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer p="md">
        <NavLinks />
      </AppShell.Footer>
    </AppShell>
  );
}
