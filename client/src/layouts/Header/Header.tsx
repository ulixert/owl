import { Container } from '@mantine/core';

import classes from './Header.module.css';
import { HeaderDesktop } from './HeaderDesktop.tsx';
import { HeaderMobile } from './HeaderMobile.tsx';

export function Header() {
  return (
    <>
      <Container size={640} className={classes.container} hiddenFrom="sm">
        <HeaderMobile />
      </Container>
      <Container size={640} className={classes.container} visibleFrom="sm">
        <HeaderDesktop />
      </Container>
    </>
  );
}
