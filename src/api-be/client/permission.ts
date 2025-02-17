import { instanceClient } from './instance-client';
import { ICreatePermission, IGetPermissionPagination, IPermission, IQueryParamsGetPermisions, IUpdatePermission } from '../interface';

export const getAllPermissions = {
  key: '/admin/permission/list',
  fetch: async function (key: string): Promise<IGetPermissionPagination> {
    const result = await instanceClient.get(key, { params: { pageSize: -1 } });
    return result;
  },
};

export const createPermissions = {
  key: '/admin/permission/create',
  fetch: async function (key: string, data: { arg: ICreatePermission }): Promise<IPermission> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const getListPermissions = {
  key: '/admin/permission/list',
  fetch: async function (key: string, queryParams: IQueryParamsGetPermisions): Promise<IGetPermissionPagination> {
    const result = await instanceClient.get(key, { params: { ...queryParams } });
    return result;
  },
};

export const updatePermission = {
  key: (id: string) => `/admin/permission/${id}`,
  fetch: async function (url: string, data: { arg: IUpdatePermission }): Promise<IPermission> {
    const result = await instanceClient.put(url, data.arg);
    return result;
  },
};
