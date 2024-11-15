import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { SignUpSchema } from '@/types/schemas.ts';
import { SignUpType } from '@/types/types.ts';
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

import classes from '../Login/Login.module.css';

export function Signup() {
  // const signupMutation = useSignupMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({ resolver: zodResolver(SignUpSchema) });

  const onSubmit = (data: SignUpType) => {
    // signupMutation.mutate(data, {
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
        <Anchor size="sm" component="button" onClick={() => navigate('/login')}>
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
