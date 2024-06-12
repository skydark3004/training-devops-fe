import { GenderTypesEnum, PermissionEnum, RoleCodeEnum, StatusEnum } from '@/constants/enum';

export interface IQueryParamsGetListUsers {
  username?: string;
  phoneNumber?: string;
  status?: StatusEnum;
  permissionId?: string;
  roleCode?: RoleCodeEnum;
  pageSize: number | string;
  page: number;
}

export interface ICreateUser {
  username: string;
  fullName: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
  permissionId: string;
  status: StatusEnum;
  description?: string | undefined;
  roleCode: RoleCodeEnum;
  gender: GenderTypesEnum;
}

export interface IGetUserById {
  id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  fullName: string;
  description: string;
  phoneNumber: string;
  gender: GenderTypesEnum;
  status: StatusEnum;
  roleCode: RoleCodeEnum;
  permission: Permission;
}

interface Permission {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  details: PermissionEnum[];
  status: StatusEnum;
}

export interface IUpdateUser {
  id: string;
  //username: string;
  fullName: string;
  password?: string;
  passwordConfirm?: string;
  phoneNumber: string;
  permissionId: string;
  status: StatusEnum;
  description?: string | undefined;
}
