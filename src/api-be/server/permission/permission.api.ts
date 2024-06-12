import { instanceServer } from '../instance-server';
import { IGetAllPermissions } from './permission.interface';

export const getAllPermissions = (): Promise<IGetAllPermissions> => {
  return instanceServer.get(`/admin/permission/list`, { params: { pageSize: -1 } });
};
