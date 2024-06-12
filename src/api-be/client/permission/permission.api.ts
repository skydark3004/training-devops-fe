import { instanceClient } from '../instance-client';
import { ICreatePermission, IQueryParamsGetPermisions, IUpdatePermission } from './permission.interface';

export const getAllPermissions = {
  key: '/admin/permission/list',
  fetch: function (key: string) {
    return instanceClient.get(key, { params: { pageSize: -1 } });
  },
};

export const createPermissions = {
  key: '/admin/permission/create',
  fetch: function (key: string, data: { arg: ICreatePermission }) {
    const body = data.arg;
    return instanceClient.post(key, body);
  },
};

export const getListPermissions = {
  key: '/admin/permission/list',
  fetch: function (key: string, queryParams: IQueryParamsGetPermisions) {
    return instanceClient.get(key, { params: { ...queryParams } });
  },
};

export const updatePermission = {
  key: '/admin/permission',
  fetch: function (url: string, data: { arg: IUpdatePermission }) {
    const { id, ...updateBody } = data.arg;
    const fullUrl = `${url}/${id}`;

    return instanceClient.put(fullUrl, updateBody);
  },
};
