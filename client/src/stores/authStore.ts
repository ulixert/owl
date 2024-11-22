import { create } from 'zustand';

type UserData = {
  userId: number;
  username: string;
  profilePic: string | null;
};

type AuthState = {
  accessToken: string | null;
  userData: UserData | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string | null, userData?: UserData | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  userData: null,

  setAccessToken: (token, userData = null) =>
    set({
      accessToken: token,
      isAuthenticated: Boolean(token),
      userData,
    }),
}));
