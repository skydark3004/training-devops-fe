import { instanceClient } from './instance-client';
import { IGetPurchasePagination, IPurchase, IQueryParamsGetPurchases, IUpdatePurchase } from '../interface';

export const getAllPurchases = {
  key: '/admin/purchase/list',
  fetch: async function (key: string, query: IQueryParamsGetPurchases): Promise<IGetPurchasePagination> {
    const result = await instanceClient.get(key, { params: { ...(query || {}), pageSize: -1 } });
    return result;
  },
};

export const getListPurchasePagination = {
  key: '/admin/purchase/list',
  fetch: async function (key: string, queryParams: IQueryParamsGetPurchases): Promise<IGetPurchasePagination> {
    const result = await instanceClient.get(key, { params: { ...queryParams } });
    return result;
  },
};

export const updatePurchase = {
  key: (id: string) => `/admin/purchase/${id}`,
  fetch: async function (url: string, data: { arg: IUpdatePurchase }): Promise<IPurchase> {
    const result = await instanceClient.put(url, data.arg);
    return result;
  },
};
