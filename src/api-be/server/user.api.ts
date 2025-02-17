import { IGetUserById } from '../interface';
import { instanceServer } from './instance-server';

export const getUserById = (id: string): Promise<IGetUserById> => {
  const result: any = instanceServer.get(`/admin/user/${id}`);
  return result;
};
