import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Anchor,
  Button,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useAuthViewStore } from '@stores/useAuthViewStore.ts';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { setView } = useAuthViewStore();

  const handleResetPassword = () => {
    console.log(`Reset link sent to: ${email}`);
    alert('Password reset link has been sent to your email.');
  };

  return (
    <>
      <Title ta="center">Forgot your password?</Title>
      <Text ta="center" size="sm" c="dimmed" mt={5}>
        Enter your email to get a reset link
      </Text>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput
          label="Your email"
          placeholder="barn@owl.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Group mt="lg">
          <Anchor
            component="button"
            size="sm"
            onClick={() => setView('login', navigate)}
          >
            Back to login
          </Anchor>
          <Button fullWidth onClick={handleResetPassword}>
            Reset password
          </Button>
        </Group>
      </Paper>
    </>
  );
}
