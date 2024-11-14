import { NavigateFunction } from 'react-router-dom';
import { create } from 'zustand';

type AuthView = 'login' | 'signup' | 'forgot-password';

type AuthViewState = {
  currentView: AuthView;
  setView: (view: AuthView, navigate: NavigateFunction) => void;
};

export const useAuthViewStore = create<AuthViewState>((set) => ({
  currentView: 'login',
  setView: (view, navigate) => {
    set({ currentView: view });
    navigate(`/${view}`);
  },
}));
