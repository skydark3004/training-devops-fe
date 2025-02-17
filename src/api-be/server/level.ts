import { IGetLevelPagination, ILevel, IQueryParamsGetLevels } from '@/api-be/interface';
import { instanceServer } from './instance-server';

export const getLevelById = async (id: string): Promise<ILevel> => {
  const result = await instanceServer.get(`/admin/level/${id}`);
  return result;
};

export const getAllLevels = async (query?: IQueryParamsGetLevels): Promise<IGetLevelPagination> => {
  const result = await instanceServer.get(`/admin/level/list`, { params: { pageSize: -1, ...(query || {}) } });
  return result;
};
