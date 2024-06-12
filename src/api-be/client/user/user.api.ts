import { instanceClient } from '../instance-client';
import { ICreateUser, IQueryParamsGetListUsers, IUpdateUser } from './user.interface';

export const getListUsers = {
  key: '/admin/user/list',
  fetch: function (key: string, queryParams: IQueryParamsGetListUsers) {
    return instanceClient.get(key, { params: { ...queryParams } });
  },
};

export const createUser = {
  key: '/admin/user/create',
  fetch: function (key: string, data: { arg: ICreateUser }) {
    return instanceClient.post(key, data.arg);
  },
};

export const getUserById = {
  key: '/admin/user',
  fetch: function (key: string, id: string) {
    const url = `${key}/${id}`;
    return instanceClient.get(url);
  },
};

export const updateUser = {
  key: '/admin/user',
  fetch: function (key: string, data: { arg: IUpdateUser }) {
    const { id, ...updateBody } = data.arg;
    const url = `${key}/${id}`;

    return instanceClient.put(url, updateBody);
  },
};
