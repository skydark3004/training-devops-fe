import { instanceClient } from './instance-client';
import { ICreateTip, IGetTipPagination, ITip, IQueryParamsGetTips, IUpdateTip } from '../interface';

export const getAllTips = {
  key: '/admin/tip/list',
  fetch: async function (key: string, query: IQueryParamsGetTips): Promise<IGetTipPagination> {
    const result = await instanceClient.get(key, { params: { ...(query || {}), pageSize: -1 } });
    return result;
  },
};

export const createTip = {
  key: '/admin/tip/create',
  fetch: async function (key: string, data: { arg: ICreateTip }): Promise<ITip> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const getListTipPagination = {
  key: '/admin/tip/list',
  fetch: async function (key: string, queryParams: IQueryParamsGetTips): Promise<IGetTipPagination> {
    const result = await instanceClient.get(key, { params: { ...queryParams } });
    return result;
  },
};

export const updateTip = {
  key: (id: string) => `/admin/tip/${id}`,
  fetch: async function (url: string, data: { arg: IUpdateTip }): Promise<ITip> {
    const result = await instanceClient.put(url, data.arg);
    return result;
  },
};
