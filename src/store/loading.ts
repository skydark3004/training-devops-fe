import { create } from 'zustand';

export interface ILoading {
  isLoading: boolean;
  setIsLoading(value: boolean): void;
}

const initState = {
  isLoading: false,
};

export const useLoadingStore = create<ILoading>((set) => ({
  ...initState,
  setIsLoading: (value: boolean) => set(() => ({ isLoading: value })),
}));
