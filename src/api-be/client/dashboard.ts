import { instanceClient } from './instance-client';
import { IBodyGetOverview, IBodyGetRevenueChart, IGetOverview, IGetRevenueChart } from '../interface';

export const getOverview = {
  key: '/admin/dashboard/overview',
  fetch: async function (key: string, body: IBodyGetOverview): Promise<IGetOverview> {
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const getRevenueChart = {
  key: '/admin/dashboard/get-revenue',
  fetch: async function (key: string, body: IBodyGetRevenueChart): Promise<IGetRevenueChart[]> {
    const result = await instanceClient.post(key, body);
    return result;
  },
};
