import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordSchema } from '@/types/schemas.ts';
import { ForgotPasswordType } from '@/types/types.ts';
import { showSuccessNotification } from '@/utils/showNotification.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Anchor,
  Button,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

export function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const handleResetPassword = () => {
    showSuccessNotification({
      title: 'Password reset link sent to your email.',
      message: 'Please check your inbox.',
    });
  };

  return (
    <>
      <Title ta="center">Forgot your password?</Title>
      <Text ta="center" size="sm" c="dimmed" mt={5}>
        Enter your email to get a reset link
      </Text>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={handleSubmit(handleResetPassword)}>
          <TextInput
            label="Your email"
            placeholder="barn@owl.com"
            {...register('email')}
            error={errors.email?.message}
          />
          <Group mt="lg">
            <Anchor
              component="button"
              type="button"
              size="sm"
              onClick={() => navigate('/login')}
            >
              Back to login
            </Anchor>
            <Button type="submit" fullWidth>
              Reset password
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  );
}
