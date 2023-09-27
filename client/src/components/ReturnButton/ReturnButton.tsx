import { useNavigate } from 'react-router-dom';

import { ActionIcon } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

import styles from './ReturnButton.module.css';

export function ReturnButton() {
  const navigate = useNavigate();

  return (
    <ActionIcon
      className={styles.button}
      onClick={() => navigate(-1)}
      variant="subtle"
      color="gray"
      radius={100}
      ml={-6}
    >
      <IconArrowLeft />
    </ActionIcon>
  );
}
