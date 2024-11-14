import { useNavigate } from 'react-router-dom';

import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useAuthViewStore } from '@stores/useAuthViewStore.ts';

import classes from './Login.module.css';

export function Login() {
  const { setView } = useAuthViewStore();
  const navigate = useNavigate();

  return (
    <>
      <Title ta="center" className={classes.title}>
        Welcome Owl
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor
          size="sm"
          component="button"
          onClick={() => setView('signup', navigate)}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="barn@owl.com" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor
            component="button"
            size="sm"
            onClick={() => setView('forgot-password', navigate)}
          >
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </>
  );
}
