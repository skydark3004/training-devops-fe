import { ILogin } from './auth.interface';
import { instanceClient } from '../instance-client';

export const login = {
  key: 'LOGIN',
  fetch: function login(key: string, data: { arg: ILogin }) {
    return instanceClient.post(`/admin/auth/login`, data.arg);
  },
};
