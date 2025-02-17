import { IGetNutritionPagination, INutrition, IQueryParamsGetNutritions } from '@/api-be/interface';
import { instanceServer } from './instance-server';

export const getNutritionById = async (id: string): Promise<INutrition> => {
  const result = await instanceServer.get(`/admin/nutrition/${id}`);
  return result;
};

export const getAllNutritions = async (query?: IQueryParamsGetNutritions): Promise<IGetNutritionPagination> => {
  const result = await instanceServer.get(`/admin/nutrition/list`, { params: { pageSize: -1, ...(query || {}) } });
  return result;
};
