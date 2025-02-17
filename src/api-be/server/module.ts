import { IGetModulePagination, IModule, IQueryParamsGetModules } from '@/api-be/interface';
import { instanceServer } from './instance-server';

export const getModuleById = async (id: string): Promise<IModule> => {
  const result = await instanceServer.get(`/admin/module/${id}`);
  return result;
};

export const getAllModules = async (query?: IQueryParamsGetModules): Promise<IGetModulePagination> => {
  const result = await instanceServer.get(`/admin/module/list`, { params: { pageSize: -1, ...(query || {}) } });
  return result;
};
