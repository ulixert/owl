import { UnstyledButton, rem } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';

import classes from './NavBar.module.css';

type NavLinkProps = {
  icon: typeof IconHome;
  onClick: () => void;
};

export function NavBarButton({ icon: Icon, onClick }: NavLinkProps) {
  return (
    <UnstyledButton onClick={onClick} className={classes.link}>
      <Icon style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
    </UnstyledButton>
  );
}
