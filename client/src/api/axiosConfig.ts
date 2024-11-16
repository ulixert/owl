// axiosInstance.ts
import axios, { AxiosError, AxiosResponse } from 'axios';

import { useAuthStore } from '@stores/authStore.ts';

// Create an Axios instance
const API_PREFIX = import.meta.env.VITE_API_PREFIX as string;

export const axiosInstance = axios.create({
  baseURL: API_PREFIX,
  withCredentials: true, // Include HTTP-only cookie in requests
});

export type ApiResponse = {
  message: string;
};

export type AuthResponse = ApiResponse & {
  accessToken: string;
};

// Add a request interceptor to attach the access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Add a response interceptor to handle token refreshing
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Check if the error is due to an expired access token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/')
    ) {
      originalRequest._retry = true; // Custom property to prevent infinite loops

      try {
        // Attempt to refresh the access token
        const refreshResponse = await axiosInstance.post<{
          accessToken: string;
        }>('/auth/refresh-token');

        const newAccessToken = refreshResponse.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccessToken);

        // Update the Authorization header and retry the original request
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        if (error instanceof AxiosError) {
          // Refresh token is invalid or expired
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }

        return Promise.reject(new Error('An unknown error occurred.'));
      }
    }

    return Promise.reject(error);
  },
);
