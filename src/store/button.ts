import {create} from 'zustand';

interface ButtonState {
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
}

export const useButtonStore = create<ButtonState>((set) => ({
  clicked: false,
  setClicked: (clicked) => set({ clicked }),
}));
