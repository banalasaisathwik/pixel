import {create} from 'zustand';

interface ImageState {
    image: File | null;
    setImage: (image: File | null) => void;
}

export const useImageStore = create<ImageState>((set) => ({
    image: null,
    setImage: (image) => set({ image }),
}));
