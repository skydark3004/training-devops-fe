import { IGetLevelSexologyPagination, ILevelSexology, IQueryParamsGetLevelSexologys } from '@/api-be/interface';
import { instanceServer } from './instance-server';

export const getLevelSexologyById = async (id: string): Promise<ILevelSexology> => {
  const result = await instanceServer.get(`/admin/level-sexology/${id}`);
  return result;
};

export const getAllLevelSexologys = async (query?: IQueryParamsGetLevelSexologys): Promise<IGetLevelSexologyPagination> => {
  const result = await instanceServer.get(`/admin/level-sexology/list`, { params: { pageSize: -1, ...(query || {}) } });
  return result;
};
