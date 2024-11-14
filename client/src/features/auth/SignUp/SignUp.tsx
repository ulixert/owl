import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignUpSchema, SignUpType } from 'validation';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useAuthViewStore } from '@stores/useAuthViewStore.ts';

import classes from '../Login/Login.module.css';

export function Signup() {
  const navigate = useNavigate();
  const { setView } = useAuthViewStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({ resolver: zodResolver(SignUpSchema) });

  const onSubmit = (data: SignUpType) => {
    // Remove `confirmPassword` before sending the data to the backend
    // const { ...userData } = data;
    // signupMutation.mutate(userData, {
    //   onSuccess: () => {
    //     navigate('/');
    //   },
    // });
    console.log(data);
  };

  return (
    <>
      <Title ta="center" className={classes.title}>
        Welcome Owl
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already an Owl?{' '}
        <Anchor
          size="sm"
          component="button"
          onClick={() => setView('login', navigate)}
        >
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...register('email')}
            error={errors.email?.message}
          />
          <TextInput
            label="Username"
            placeholder="Choose a username"
            {...register('username')}
            error={errors.username?.message}
            mt="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...register('password')}
            error={errors.password?.message}
            mt="md"
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            mt="md"
          />
          <Button type="submit" fullWidth mt="xl">
            Signup
          </Button>
        </form>
      </Paper>
    </>
  );
}
