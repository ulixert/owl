import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginType } from 'validation';

import { SignUpType } from '@/types/types.ts';
import { useMutation } from '@tanstack/react-query';

export type ApiResponse = {
  message: string;
};

axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true,
});

export const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: SignUpType) => {
      const response = await axiosInstance.post('/api/signup', data);
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
      const response = await axiosInstance.post('/api/login', data);
      return response.data as ApiResponse;
    },
    onSuccess: () => {
      navigate('/');
    },
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post('/api/logout');
      return response.data as ApiResponse;
    },
    onSuccess: () => {
      navigate('/');
    },
  });
};
