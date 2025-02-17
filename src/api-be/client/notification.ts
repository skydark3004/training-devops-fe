import { instanceClient } from './instance-client';
import { ICreateNotification, IGetNotificationPagination, INotification, IQueryParamsGetNotifications, IUpdateNotification } from '../interface';

export const getAllNotifications = {
  key: '/admin/notification/list',
  fetch: async function (key: string, query: IQueryParamsGetNotifications): Promise<IGetNotificationPagination> {
    const result = await instanceClient.get(key, { params: { ...(query || {}), pageSize: -1 } });
    return result;
  },
};

export const createNotification = {
  key: '/admin/notification/create',
  fetch: async function (key: string, data: { arg: ICreateNotification }): Promise<INotification> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const getListNotificationPagination = {
  key: '/admin/notification/list',
  fetch: async function (key: string, queryParams: IQueryParamsGetNotifications): Promise<IGetNotificationPagination> {
    const result = await instanceClient.get(key, { params: { ...queryParams } });
    return result;
  },
};

export const updateNotification = {
  key: (id: string) => `/admin/notification/${id}`,
  fetch: async function (url: string, data: { arg: IUpdateNotification }): Promise<INotification> {
    const result = await instanceClient.put(url, data.arg);
    return result;
  },
};
