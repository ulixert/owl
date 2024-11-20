import { Logo } from '@/components/Logo/Logo.tsx';
import { useLogoutMutation } from '@/features/auth/hooks/useLogoutMutation.ts';
import {
  Center,
  Stack,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useAuthStore } from '@stores/authStore.ts';
import { IconLogout, IconSun } from '@tabler/icons-react';

import { NavLink } from '../NavLinks/NavLink.tsx';
import { NavLinks } from '../NavLinks/NavLinks.tsx';

export function NavBar() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const mutation = useLogoutMutation();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  function handleColorSchemeChange() {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  }

  return (
    <>
      <Center mb={40}>
        <Logo />
      </Center>

      <Stack justify="center" align="center" gap={10} flex={1}>
        <NavLinks />
      </Stack>

      <Stack justify="center" align="center" gap={0} mt={40}>
        <NavLink
          icon={IconSun}
          label="theme"
          onClick={handleColorSchemeChange}
        />
        {isAuthenticated && (
          <NavLink icon={IconLogout} label="Logout" onClick={mutation.mutate} />
        )}
      </Stack>
    </>
  );
}
