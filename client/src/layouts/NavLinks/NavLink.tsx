import { UnstyledButton, rem } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';

import classes from './NavLinks.module.css';

type NavLinkProps = {
  icon: typeof IconHome;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export function NavLink({ icon: Icon, active, onClick }: NavLinkProps) {
  return (
    <UnstyledButton
      onClick={onClick}
      className={classes.link}
      data-active={active ? 'true' : undefined}
    >
      <Icon
        style={{ width: rem(30), height: rem(30) }}
        stroke={1.5}
        fill={active ? 'currentColor' : 'none'}
      />
    </UnstyledButton>
  );
}
