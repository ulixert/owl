import { useNavigate } from 'react-router-dom';

import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';

export function useOpenLoginModal() {
  const navigate = useNavigate();

  return () =>
    modals.openConfirmModal({
      title: 'Say more with Owls',
      withOverlay: true,
      overlayProps: {
        backgroundOpacity: 0.5,
        blur: 3,
      },
      yOffset: '35vh',
      translate: 'yes',
      radius: 'lg',
      top: 'md',
      padding: 'lg',
      transitionProps: { transition: 'fade', duration: 200 },
      withCloseButton: true,
      children: (
        <Text>Join Owls to connect with friends and share your stories.</Text>
      ),
      labels: { confirm: 'Log in', cancel: 'Sign up' },
      onConfirm: () => navigate('/login', { replace: true }),
      onCancel: () => navigate('/signup', { replace: true }),
    });
}
