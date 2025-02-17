import { IGetPermissionPagination, IQueryParamsGetPermisions } from '../interface';
import { instanceServer } from './instance-server';

export const getAllPermissions = (query?: IQueryParamsGetPermisions): Promise<IGetPermissionPagination> => {
  return instanceServer.get(`/admin/permission/list`, { params: { pageSize: -1, ...(query || {}) } });
};
