import { INotification } from '../interface';
import { instanceServer } from './instance-server';

export const getNotificationById = (id: string): Promise<INotification> => {
  const result: any = instanceServer.get(`/admin/notification/${id}`);
  return result;
};
