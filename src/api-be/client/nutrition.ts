import { instanceClient } from './instance-client';
import { ICreateNutrition, IGetNutritionPagination, INutrition, IQueryParamsGetPermisions, IUpdateNutrition } from '../interface';

export const getAllNutritions = {
  key: '/admin/nutrition/list',
  fetch: async function (key: string, query: IQueryParamsGetPermisions): Promise<IGetNutritionPagination> {
    const result = await instanceClient.get(key, { params: { ...(query || {}), pageSize: -1 } });
    return result;
  },
};

export const createNutrition = {
  key: '/admin/nutrition/create',
  fetch: async function (key: string, data: { arg: ICreateNutrition }): Promise<INutrition> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const getListNutritionsPagination = {
  key: '/admin/nutrition/list',
  fetch: async function (key: string, queryParams: IQueryParamsGetPermisions): Promise<IGetNutritionPagination> {
    const result = await instanceClient.get(key, { params: { ...queryParams } });
    return result;
  },
};

export const updateNutrition = {
  key: (id: string) => `/admin/nutrition/${id}`,
  fetch: async function (url: string, data: { arg: IUpdateNutrition }): Promise<INutrition> {
    const result = await instanceClient.put(url, data.arg);
    return result;
  },
};
