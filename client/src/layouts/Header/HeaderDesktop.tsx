import { DropdownMenu } from '@/components/DropdownMenu/DropdownMenu.tsx';
import { ReturnButton } from '@/components/ReturnButton/ReturnButton.tsx';
import { ActionIcon, Flex, UnstyledButton } from '@mantine/core';
import { useAuthStore } from '@stores/authStore.ts';
import { IconArrowDown } from '@tabler/icons-react';

import classes from './Header.module.css';

export function HeaderDesktop() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Flex justify="center" align="center" p="md" gap={10}>
      <ReturnButton />
      <UnstyledButton>Home</UnstyledButton>

      {isAuthenticated && (
        <DropdownMenu
          target={
            <ActionIcon
              radius={100}
              className={classes.dropdownIcon}
              size={24}
              color="gray"
            >
              <IconArrowDown size={16} />
            </ActionIcon>
          }
          itemsBeforeDivider={[
            { name: 'For you' },
            { name: 'Following' },
            { name: 'Liked' },
            { name: 'Saved' },
          ]}
          itemsAfterDivider={[{ name: 'Create new post' }]}
        />
      )}
    </Flex>
  );
}
