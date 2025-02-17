import { instanceClient } from './instance-client';
import { IGetFeedbackPagination, IQueryParamsGetFeedbacks } from '../interface';

export const getAllFeedbacks = {
  key: '/admin/experience-review/list',
  fetch: async function (key: string, query: IQueryParamsGetFeedbacks): Promise<IGetFeedbackPagination> {
    const result = await instanceClient.get(key, { params: { ...(query || {}), pageSize: -1 } });
    return result;
  },
};

export const getListFeedbackPagination = {
  key: '/admin/experience-review/list',
  fetch: async function (key: string, queryParams: IQueryParamsGetFeedbacks): Promise<IGetFeedbackPagination> {
    const result = await instanceClient.get(key, { params: { ...queryParams } });
    return result;
  },
};
