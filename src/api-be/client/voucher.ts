import { instanceClient } from './instance-client';
import { ICreateVoucher, IGetVoucherPagination, IVoucher, IQueryParamsGetVouchers, IUpdateVoucher } from '../interface';

export const getAllVouchers = {
  key: '/admin/voucher/list',
  fetch: async function (key: string, query: IQueryParamsGetVouchers): Promise<IGetVoucherPagination> {
    const result = await instanceClient.get(key, { params: { ...(query || {}), pageSize: -1 } });
    return result;
  },
};

export const createVoucher = {
  key: '/admin/voucher/create',
  fetch: async function (key: string, data: { arg: ICreateVoucher }): Promise<IVoucher> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const getListVoucherPagination = {
  key: '/admin/voucher/list',
  fetch: async function (key: string, queryParams: IQueryParamsGetVouchers): Promise<IGetVoucherPagination> {
    const result = await instanceClient.get(key, { params: { ...queryParams } });
    return result;
  },
};

export const updateVoucher = {
  key: (id: string) => `/admin/voucher/${id}`,
  fetch: async function (url: string, data: { arg: IUpdateVoucher }): Promise<IVoucher> {
    const result = await instanceClient.put(url, data.arg);
    return result;
  },
};
