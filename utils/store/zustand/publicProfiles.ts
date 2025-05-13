import { create } from 'zustand';

interface AnotherState {
  count: number;
  nav: boolean;
  setNav: (newNav: boolean) => void; // Changed to setNav and accepts a boolean
  
}

const publicProfile = create<AnotherState>((set) => ({
  count: 0,
  nav: true,
  setNav: (newNav: boolean) => set({ nav: newNav }), // Sets nav to the provided boolean
 
}));

export default publicProfile;