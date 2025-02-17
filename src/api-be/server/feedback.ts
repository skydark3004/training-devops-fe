import { IGetFeedbackPagination } from '../interface';
import { instanceServer } from './instance-server';

export async function getFeedbacksOfCustomer(userId: string): Promise<IGetFeedbackPagination> {
  const result = await instanceServer.get('admin/experience-review/list', { params: { userId, pageSize: -1 } });
  return result;
}
