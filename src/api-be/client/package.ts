import { instanceClient } from './instance-client';
import { ICreatePackage, IGetPackagePagination, IPackage, IQueryParamsGetPackages, IUpdatePackage } from '../interface';

export const getAllPackages = {
  key: '/admin/package/list',
  fetch: async function (key: string, queryParams?: IQueryParamsGetPackages): Promise<IGetPackagePagination> {
    const result = await instanceClient.get(key, { params: { ...(queryParams || {}), pageSize: -1 } });
    return result;
  },
};

export const createPackages = {
  key: '/admin/package/create',
  fetch: async function (key: string, data: { arg: ICreatePackage }): Promise<IPackage> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const getListPackagesPagination = {
  key: '/admin/package/list',
  fetch: async function (key: string, queryParams: IQueryParamsGetPackages): Promise<IGetPackagePagination> {
    const result = await instanceClient.get(key, { params: { ...queryParams } });
    return result;
  },
};

export const updatePackage = {
  key: (id: string) => `/admin/package/${id}`,
  fetch: async function (url: string, data: { arg: IUpdatePackage }): Promise<IPackage> {
    const result = await instanceClient.put(url, data.arg);
    return result;
  },
};
