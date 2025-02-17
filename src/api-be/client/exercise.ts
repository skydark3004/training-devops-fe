import { instanceClient } from './instance-client';
import { ICreateExercise, IGetExercisePagination, IExercise, IQueryParamsGetPermisions, IUpdateExercise } from '../interface';

export const getAllExercises = {
  key: '/admin/exercise/list',
  fetch: async function (key: string): Promise<IGetExercisePagination> {
    const result = await instanceClient.get(key, { params: { pageSize: -1 } });
    return result;
  },
};

export const createExercise = {
  key: '/admin/exercise/create',
  fetch: async function (key: string, data: { arg: ICreateExercise }): Promise<IExercise> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const getListExercisesPagination = {
  key: '/admin/exercise/list',
  fetch: async function (key: string, queryParams: IQueryParamsGetPermisions): Promise<IGetExercisePagination> {
    const result = await instanceClient.get(key, { params: { ...queryParams } });
    return result;
  },
};

export const updateExercise = {
  key: (id: string) => `/admin/exercise/${id}`,
  fetch: async function (url: string, data: { arg: IUpdateExercise }): Promise<IExercise> {
    const result = await instanceClient.put(url, data.arg);
    return result;
  },
};
