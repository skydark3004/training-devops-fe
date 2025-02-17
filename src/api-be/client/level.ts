import { instanceClient } from './instance-client';
import { ICreateLevel, IGetLevelPagination, ILevel, IQueryParamsGetPermisions, IUpdateLevel } from '../interface';

export const getAllLevels = {
  key: '/admin/level/list',
  fetch: async function (key: string, query: IQueryParamsGetPermisions): Promise<IGetLevelPagination> {
    const result = await instanceClient.get(key, { params: { ...(query || {}), pageSize: -1 } });
    return result;
  },
};

export const createLevel = {
  key: '/admin/level/create',
  fetch: async function (key: string, data: { arg: ICreateLevel }): Promise<ILevel> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const getListLevelsPagination = {
  key: '/admin/level/list',
  fetch: async function (key: string, queryParams: IQueryParamsGetPermisions): Promise<IGetLevelPagination> {
    const result = await instanceClient.get(key, { params: { ...queryParams } });
    return result;
  },
};

export const updateLevel = {
  key: (id: string) => `/admin/level/${id}`,
  fetch: async function (url: string, data: { arg: IUpdateLevel }): Promise<ILevel> {
    const result = await instanceClient.put(url, data.arg);
    return result;
  },
};
