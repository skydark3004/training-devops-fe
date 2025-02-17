import { IGetDetailCustomerById, IGetHistorySubscribeByUserId, IGetLearningProgressByUserId } from '../interface';
import { instanceServer } from './instance-server';

export const getCustomerById = (id: string): Promise<IGetDetailCustomerById> => {
  const result: any = instanceServer.get(`/admin/customer/${id}`);
  return result;
};

export const getHistorySubscribeByUserId = (userId: string): Promise<IGetHistorySubscribeByUserId[]> => {
  const result: any = instanceServer.get(`/admin/customer/${userId}/history-subscribe`);
  return result;
};

export const getLearningProgressBUserId = (userId: string): Promise<IGetLearningProgressByUserId> => {
  const result: any = instanceServer.get(`/admin/customer/${userId}/learning-progress`);
  return result;
};
