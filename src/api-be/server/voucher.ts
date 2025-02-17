import { IVoucher } from '../interface';
import { instanceServer } from './instance-server';

export const getVoucherById = (id: string): Promise<IVoucher> => {
  const result: any = instanceServer.get(`/admin/voucher/${id}`);
  return result;
};
