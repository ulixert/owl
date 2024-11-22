import { AxiosError } from 'axios';

import { ApiErrorResponse } from '@/api/axiosConfig.ts';
import { Text } from '@mantine/core';

export function FormError({ error }: { error: Error }) {
  const axiosError = error as AxiosError<ApiErrorResponse>;
  const message =
    axiosError.response?.data.message ?? 'An unknown error occurred.';

  return (
    <Text c="red" size="sm" ta="center" mb="md">
      {message}
    </Text>
  );
}
