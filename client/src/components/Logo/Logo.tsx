import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Image,
  UnstyledButton,
  rem,
  useComputedColorScheme,
} from '@mantine/core';

type LogoProps = {
  size?: number;
};

export function Logo({ size = 30 }: LogoProps) {
  const computedColorScheme = useComputedColorScheme('light');
  const navigate = useNavigate();

  return (
    <Flex justify="center">
      <UnstyledButton w={rem(size)} onClick={() => navigate('/')}>
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
