import { PermissionEnum } from '@/constants/enum';

export interface IPermission {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  details: PermissionEnum[];
  status: string;
}

export interface IGetAllPermissions {
  data: IPermission[];
  totalItems: number;
  page: number;
  totalPage: number;
}
