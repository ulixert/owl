import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import classes from './Signup.module.css';

type SignUpProps = {
  onLoginClick: () => void;
};

export function Signup({ onLoginClick }: SignUpProps) {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Become an Owl
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="button" onClick={onLoginClick}>
          Sign in
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="barn@owl.com" required />
        <TextInput
          label="Username"
          placeholder="Choose a username"
          required
          mt="md"
        />
        <TextInput label="Name" placeholder="Your name" required mt="md" />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter your password"
          required
          mt="md"
        />
        <Button fullWidth mt="xl">
          Create Account
        </Button>
      </Paper>
    </Container>
  );
}

export default Signup;
