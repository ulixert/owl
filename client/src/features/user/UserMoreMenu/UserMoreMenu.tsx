import {
  showErrorNotification,
  showSuccessNotification,
} from '@/utils/showNotification.tsx';
import { Box, Menu } from '@mantine/core';
import {
  IconBan,
  IconDotsCircleHorizontal,
  IconFlag3,
  IconLink,
  IconShare2,
} from '@tabler/icons-react';

import styles from '../UserHeader/UserHeader.module.css';

export function UserMoreMenu() {
  async function handleCopyUrl() {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      showSuccessNotification({
        title: 'Link copied',
        message: 'You can now share this link with your friends',
      });
    } catch {
      showErrorNotification({
        title: 'Failed to copy link',
        message: 'You can copy link manually from the address bar',
      });
    }
  }

  return (
    <Menu>
      <Menu.Target>
        <Box className={styles.iconContainer}>
          <IconDotsCircleHorizontal size={24} cursor="pointer" />
        </Box>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconLink size={14} />} onClick={handleCopyUrl}>
          Copy link
        </Menu.Item>
        <Menu.Item leftSection={<IconShare2 size={14} />}>
          Share Profile
        </Menu.Item>
        <Menu.Item leftSection={<IconBan size={14} />}>Block</Menu.Item>
        <Menu.Item color="red" leftSection={<IconFlag3 size={14} />}>
          Report
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
