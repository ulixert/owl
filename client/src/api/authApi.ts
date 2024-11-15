import { SignUpType } from 'validation';

import { useMutation } from '@tanstack/react-query';

export async function signup(data: SignUpType) {
  const { confirmPassword, ...userData } = data;

  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }

  return response.json();
}

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      console.log('User signed up: ', user);
    },
    onError: (error) => {
      console.error('Error signing up: ', error);
    },
  });
};
