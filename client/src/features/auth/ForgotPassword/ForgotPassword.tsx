import { useState } from 'react';

import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

export function ForgotPassword({
  onBackToLoginClick,
}: {
  onBackToLoginClick: () => void;
}) {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    console.log(`Reset link sent to: ${email}`);
    alert('Password reset link has been sent to your email.');
  };

  return (
    <Container size={420} my={40}>
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
          <Anchor component="button" size="sm" onClick={onBackToLoginClick}>
            Back to login
          </Anchor>
          <Button fullWidth onClick={handleResetPassword}>
            Reset password
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
