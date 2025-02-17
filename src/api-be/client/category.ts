import { instanceClient } from './instance-client';
import { ICreateCategory, IGetCategoryPagination, ICategory, IQueryParamsGetPermisions, IUpdateCategory } from '../interface';

export const getAllCategories = {
  key: '/admin/category/list',
  fetch: async function (key: string, query: IQueryParamsGetPermisions): Promise<IGetCategoryPagination> {
    const result = await instanceClient.get(key, { params: { ...(query || {}), pageSize: -1 } });
    return result;
  },
};

export const createCategory = {
  key: '/admin/category/create',
  fetch: async function (key: string, data: { arg: ICreateCategory }): Promise<ICategory> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const getListCategoriesPagination = {
  key: '/admin/category/list',
  fetch: async function (key: string, queryParams: IQueryParamsGetPermisions): Promise<IGetCategoryPagination> {
    const result = await instanceClient.get(key, { params: { ...queryParams } });
    return result;
  },
};

export const updateCategory = {
  key: (id: string) => `/admin/category/${id}`,
  fetch: async function (url: string, data: { arg: IUpdateCategory }): Promise<ICategory> {
    const result = await instanceClient.put(url, data.arg);
    return result;
  },
};
