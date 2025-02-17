import { IGetCategoryPagination, ICategory, IQueryParamsGetCategorys } from '@/api-be/interface';
import { instanceServer } from './instance-server';

export const getCategoryById = async (id: string): Promise<ICategory> => {
  const result = await instanceServer.get(`/admin/category/${id}`);
  return result;
};

export const getAllCategories = async (query?: IQueryParamsGetCategorys): Promise<IGetCategoryPagination> => {
  const result = await instanceServer.get(`/admin/category/list`, { params: { pageSize: -1, ...(query || {}) } });
  return result;
};
