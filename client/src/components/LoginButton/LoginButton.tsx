import { useNavigate } from 'react-router-dom';

import { Button } from '@mantine/core';

import classes from './LoginButton.module.css';

export function LoginButton() {
  const navigate = useNavigate();

  return (
    <Button className={classes.login} onClick={() => navigate('/login')}>
      Log in
    </Button>
  );
}
