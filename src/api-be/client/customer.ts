import { IGetDetailCustomerById, IQueryParamsGetListCustomers, IUpdateCustomer } from '../interface';
import { instanceClient } from './instance-client';

import { EnumRoleCode } from '@/constants/enum';

export const getCustomerById = {
  key: '/admin/customer',
  fetch: function (key: string, id: string) {
    const url = `${key}/${id}`;
    return instanceClient.get(url);
  },
};

export const updateCustomer = {
  key: (id: string) => `/admin/customer/${id}`,
  fetch: async function (url: string, data: { arg: IUpdateCustomer }): Promise<IGetDetailCustomerById> {
    return await instanceClient.put(url, data.arg);
  },
};

export const getListCustomers = {
  key: '/admin/customer/list-customer',
  fetch: async function (key: string, queryParams: IQueryParamsGetListCustomers) {
    return await instanceClient.get(key, { params: queryParams });
  },
};
