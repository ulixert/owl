import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { useAuthStore } from '@stores/authStore.ts';

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true, // Important for sending cookies
});

const authStore = useAuthStore.getState();

// Request interceptor to attach the access token
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = authStore.accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Function to handle token refresh
const refreshAuthLogic = async (failedRequest: any) => {
  try {
    const response: AxiosResponse<{ accessToken: string }> =
      await axiosInstance.post('/auth/refresh-token');
    const newAccessToken = response.data.accessToken;

    authStore.setAccessToken(newAccessToken);

    failedRequest.response.config.headers.Authorization = `Bearer ${newAccessToken}`;
    return Promise.resolve();
  } catch (error) {
    authStore.logout(); // Clear authentication state
    return Promise.reject(error);
  }
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export default axiosInstance;
