import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginType } from 'validation';

import { SignUpType } from '@/types/types.ts';
import { useMutation } from '@tanstack/react-query';

export type ApiResponse = {
  message: string;
};

axios.defaults.withCredentials = true;

export const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: SignUpType) => {
      const response = await axios.post('/api/signup', data);
      return response.data as ApiResponse;
    },
    onSuccess: () => {
      navigate('/');
    },
  });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginType) => {
      const response = await axios.post('/api/login', data);
      return response.data as ApiResponse;
    },
    onSuccess: () => {
      navigate('/');
    },
  });
};
