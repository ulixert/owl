import { useNavigate } from 'react-router-dom';

import { UnstyledButton, rem } from '@mantine/core';
import { useAuthStore } from '@stores/authStore.ts';
import { IconHome } from '@tabler/icons-react';

import classes from './NavLinks.module.css';

type NavLinkProps = {
  icon: typeof IconHome;
  active?: boolean;
  onClick: () => void;
  needLogin?: boolean;
  path: string;
};

export function NavLink({
  icon: Icon,
  active,
  onClick,
  needLogin,
  path,
}: NavLinkProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  function handleClick() {
    onClick();
    if (needLogin && !isAuthenticated) {
      navigate('/login');
    } else {
      navigate(path);
    }
  }

  return (
    <UnstyledButton
      onClick={handleClick}
      className={classes.link}
      data-active={active ? 'true' : undefined}
    >
      <Icon style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
    </UnstyledButton>
  );
}
