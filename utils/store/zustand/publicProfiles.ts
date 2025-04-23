import { create } from 'zustand';

interface AnotherState {
  count: number;
  nav: boolean;
  setNav: (newNav: boolean) => void; // Changed to setNav and accepts a boolean
  decrement: () => void;
}

const publicProfile = create<AnotherState>((set) => ({
  count: 0,
  nav: true,
  setNav: (newNav: boolean) => set({ nav: newNav }), // Sets nav to the provided boolean
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default publicProfile;