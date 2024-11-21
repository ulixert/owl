import { Flex } from '@mantine/core';

import { NavLinks } from '../NavLinks/NavLinks.tsx';

export function Footer() {
  return (
    <Flex justify="space-between" align="center" pt={8} pb={8}>
      <NavLinks />
    </Flex>
  );
}
