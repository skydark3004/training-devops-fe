import { instanceClient } from './instance-client';
import { ICreateUser, IGetUserById, IQueryParamsGetListUsers, IUpdateUser } from '../interface/user';
import { EnumRoleCode } from '@/constants/enum';

export const getMe = {
  key: '/admin/user/me',
  fetch: async function (key: string): Promise<IGetUserById> {
    return instanceClient.get(key);
  },
};

export const getListUsers = {
  key: '/admin/user/list',
  fetch: function (key: string, queryParams: IQueryParamsGetListUsers) {
    return instanceClient.get(key, { params: { ...queryParams, roleCode: EnumRoleCode.EMPLOYEE } });
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
  key: (id: string) => `/admin/user/${id}`,
  fetch: async function (url: string, data: { arg: IUpdateUser }): Promise<IGetUserById> {
    return await instanceClient.put(url, data.arg);
  },
};
