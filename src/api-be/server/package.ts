import { IGetPackagePagination, IPackage, IQueryParamsGetPackages } from '@/api-be/interface';
import { instanceServer } from './instance-server';

export const getPackageById = async (id: string): Promise<IPackage> => {
  const result: any = await instanceServer.get(`/admin/package/${id}`);
  return result;
};

export const getAllPackages = async (query?: IQueryParamsGetPackages): Promise<IGetPackagePagination> => {
  const result = await instanceServer.get(`/admin/package/list`, { params: { pageSize: -1, ...(query || {}) } });
  return result;
};
