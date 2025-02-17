import { instanceClient } from './instance-client';
import { ICreateModule, IGetModulePagination, IModule, IQueryParamsGetPermisions, IUpdateModule } from '../interface';

export const getAllModules = {
  key: '/admin/module/list',
  fetch: async function (key: string, query: IQueryParamsGetPermisions): Promise<IGetModulePagination> {
    const result = await instanceClient.get(key, { params: { ...(query || {}), pageSize: -1 } });
    return result;
  },
};

export const createModule = {
  key: '/admin/module/create',
  fetch: async function (key: string, data: { arg: ICreateModule }): Promise<IModule> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const getListModulesPagination = {
  key: '/admin/module/list',
  fetch: async function (key: string, queryParams: IQueryParamsGetPermisions): Promise<IGetModulePagination> {
    const result = await instanceClient.get(key, { params: { ...queryParams } });
    return result;
  },
};

export const updateModule = {
  key: (id: string) => `/admin/module/${id}`,
  fetch: async function (url: string, data: { arg: IUpdateModule }): Promise<IModule> {
    const result = await instanceClient.put(url, data.arg);
    return result;
  },
};
