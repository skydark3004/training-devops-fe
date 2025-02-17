import { instanceClient } from './instance-client';
import { ICreateLevelSexology, IGetLevelSexologyPagination, ILevelSexology, IQueryParamsGetPermisions, IUpdateLevelSexology } from '../interface';

export const getAllLevelSexologys = {
  key: '/admin/level-sexology/list',
  fetch: async function (key: string, query: IQueryParamsGetPermisions): Promise<IGetLevelSexologyPagination> {
    const result = await instanceClient.get(key, { params: { ...(query || {}), pageSize: -1 } });
    return result;
  },
};

export const createLevelSexology = {
  key: '/admin/level-sexology/create',
  fetch: async function (key: string, data: { arg: ICreateLevelSexology }): Promise<ILevelSexology> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const getListLevelSexologysPagination = {
  key: '/admin/level-sexology/list',
  fetch: async function (key: string, queryParams: IQueryParamsGetPermisions): Promise<IGetLevelSexologyPagination> {
    const result = await instanceClient.get(key, { params: { ...queryParams } });
    return result;
  },
};

export const updateLevelSexology = {
  key: (id: string) => `/admin/level-sexology/${id}`,
  fetch: async function (url: string, data: { arg: IUpdateLevelSexology }): Promise<ILevelSexology> {
    const result = await instanceClient.put(url, data.arg);
    return result;
  },
};
