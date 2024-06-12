import { instanceServer } from '../instance-server';
import { IGetUserById } from './user.interface';

export const getUserById = (id: string): Promise<IGetUserById> => {
  return instanceServer.get(`/admin/user/${id}`);
};
