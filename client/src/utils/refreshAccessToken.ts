import { AuthResponse, axiosInstance } from '@/api/axiosConfig.ts';
import { useAuthStore } from '@stores/authStore.ts';

export async function refreshAccessToken() {
  try {
    const response = await axiosInstance.get<AuthResponse>(
      '/auth/refresh-token',
    );
    const accessToken = response.data.accessToken;

    const { userId, username, profilePic } = response.data;

    useAuthStore
      .getState()
      .setAccessToken(accessToken, { username, userId, profilePic });
    return response.data.accessToken;
  } catch {
    useAuthStore.getState().setAccessToken(null);
    return null;
  }
}
