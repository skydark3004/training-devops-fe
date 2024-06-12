import { create } from 'zustand';

interface ILogin {
  email: string;
  password: string;
  isKeepLogin: boolean;
  setEmail: (value: string) => void;
  setKeepLogin: (value: boolean) => void;
  setPassword: (value: string) => void;
}

const initState = {
  email: 'supper_admin@egdgroup.com',
  password: '123456789',
  isKeepLogin: false,
};

export const useLoginStore = create<ILogin>((set) => ({
  ...initState,
  setEmail: (value: string) => set(() => ({ email: value })),
  setKeepLogin: (value: boolean) => set(() => ({ isKeepLogin: value })),
  setPassword: (value: string) => set(() => ({ password: value })),
}));
