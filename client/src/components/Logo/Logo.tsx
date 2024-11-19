8import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Image,
  UnstyledButton,
  rem,
  useComputedColorScheme,
} from '@mantine/core';

export function Logo() {
  const computedColorScheme = useComputedColorScheme('light');
  const navigate = useNavigate();

  return (
    <Flex justify="center">
      <UnstyledButton w={rem(30)} onClick={() => navigate('/')}>
        <Image
          src={
            computedColorScheme === 'light'
              ? '/logo/owl-dark.svg'
              : '/logo/owl-light.svg'
          }
          alt="logo"
        />
      </UnstyledButton>
    </Flex>
  );
}
