import { IFaq, IGetFaqPagination, IQueryParamsGetFaqs } from '../interface';
import { instanceServer } from './instance-server';

export const getFaqById = (id: string): Promise<IFaq> => {
  const result: any = instanceServer.get(`/admin/faq/${id}`);
  return result;
};

export async function getAllFaqs(query?: IQueryParamsGetFaqs): Promise<IGetFaqPagination> {
  const result = await instanceServer.get('admin/faq/list', { params: { ...(query || {}), pageSize: -1 } });
  return result;
}
