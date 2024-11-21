import { create } from 'zustand';

type TitleState = {
  title: string;
  setTitle: (title: string) => void;
};

export const useTitleStore = create<TitleState>((set) => ({
  title: 'Home',
  setTitle: (title) => set({ title }),
}));
