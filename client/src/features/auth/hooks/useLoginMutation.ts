import { useNavigate } from 'react-router-dom';
import { LoginType } from 'validation';

import { AuthResponse, axiosInstance } from '@/api/axiosConfig.ts';
import { useAuthStore } from '@stores/authStore.ts';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: async (data: LoginType) => {
      const response = await axiosInstance.post('/auth/login', data);
      console.log('response', response); // TODO: Remove this line
      console.log('response.data', response.data); // TODO: Remove this line
      return response.data as AuthResponse;
    },
    onSuccess: ({ accessToken }) => {
      console.log('accessToken', accessToken); // TODO: Remove this line
      setAccessToken(accessToken);
      navigate(-1);
    },
  });
};
