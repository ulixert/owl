import { DropdownMenu } from '@/components/DropdownMenu/DropdownMenu.tsx';
import { Logo } from '@/components/Logo/Logo.tsx';
import { ReturnButton } from '@/components/ReturnButton/ReturnButton.tsx';
import { useLogoutMutation } from '@/features/auth/hooks/useLogoutMutation.ts';
import { Burger, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function HeaderMobile() {
  const [opened, { toggle }] = useDisclosure();
  const mutation = useLogoutMutation();

  return (
    <Flex justify="center" align="center" p="md" gap={10}>
      <ReturnButton />
      <Logo size={24} />

      <DropdownMenu
        target={
          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
          />
        }
        itemsBeforeDivider={[
          { name: 'For you', path: '/for-you' },
          { name: 'Following', path: '/following' },
          { name: 'Liked', path: '/liked' },
          { name: 'Saved', path: '/saved' },
        ]}
        itemsAfterDivider={[
          {
            name: 'Create new post',
            onClick: () => {
              /* TODO */
            },
          },

          { name: 'Log out', color: 'red', onClick: () => mutation.mutate() },
        ]}
      />
    </Flex>
  );
}
