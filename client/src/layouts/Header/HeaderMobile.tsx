import { DropdownMenu } from '@/components/DropdownMenu/DropdownMenu.tsx';
import { Logo } from '@/components/Logo/Logo.tsx';
import { ReturnButton } from '@/components/ReturnButton/ReturnButton.tsx';
import { Burger, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function HeaderMobile() {
  const [opened, { toggle }] = useDisclosure();

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
          { name: 'For you' },
          { name: 'Following' },
          { name: 'Liked' },
          { name: 'Saved' },
        ]}
        itemsAfterDivider={[
          { name: 'Create new post' },
          { name: 'Log out', color: 'red' },
        ]}
      />
    </Flex>
  );
}
