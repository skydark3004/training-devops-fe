import { PermissionEnum, StatusEnum } from '@/constants/enum';

export interface IPermission {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  details: PermissionEnum[];
  status: string;
}

export interface ICreatePermission {
  name: string;
  details: PermissionEnum[];
  status: StatusEnum;
}

export interface IQueryParamsGetPermisions {
  name?: string;
  permissionCodes?: string;
  status?: StatusEnum;
  pageSize: number | string;
  page: number;
}

export interface IUpdatePermission {
  id: string;
  name: string;
  details: string[];
  status: StatusEnum;
}
