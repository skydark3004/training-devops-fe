import { instanceClient } from './instance-client';
import { ICreateFaq, IGetFaqPagination, IFaq, IQueryParamsGetFaqs, IUpdateFaq } from '../interface';

export const getAllFaqs = {
  key: '/admin/faq/list',
  fetch: async function (key: string, query: IQueryParamsGetFaqs): Promise<IGetFaqPagination> {
    const result = await instanceClient.get(key, { params: { ...(query || {}), pageSize: -1 } });
    return result;
  },
};

export const createFaq = {
  key: '/admin/faq/create',
  fetch: async function (key: string, data: { arg: ICreateFaq }): Promise<IFaq> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const getListFaqPagination = {
  key: '/admin/faq/list',
  fetch: async function (key: string, queryParams: IQueryParamsGetFaqs): Promise<IGetFaqPagination> {
    const result = await instanceClient.get(key, { params: { ...queryParams } });
    return result;
  },
};

export const updateFaq = {
  key: (id: string) => `/admin/faq/${id}`,
  fetch: async function (url: string, data: { arg: IUpdateFaq }): Promise<IFaq> {
    const result = await instanceClient.put(url, data.arg);
    return result;
  },
};
