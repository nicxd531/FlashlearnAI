import { create } from 'zustand';

interface TabBarState {
  scrollY: number;
  setScrollY: (value: number) => void;
}

const useTabBarStore = create<TabBarState>((set) => ({
  scrollY: 0,
  setScrollY: (value) => set({ scrollY: value }),
}));

export default useTabBarStore;