import { EnumRoleCode } from '@/constants/enum';
import { IPermission } from './permission';
import { IGetDetailByIdBase, IQueryParamsBase } from '@/constants/interface';

export interface IQueryParamsGetListUsers extends IQueryParamsBase {
  username?: string;
  phoneNumber?: string;
  status?: boolean;
  permissionId?: string;
  roleCode?: EnumRoleCode;
}

export interface ICreateUser {
  username: string;
  fullName: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
  permissionId: string;
  status: boolean;
  description?: string | undefined;
  roleCode: EnumRoleCode;
}

export interface IGetUserById extends IGetDetailByIdBase {
  username: string;
  fullName: string;
  description: string;
  phoneNumber: string;
  status: boolean;
  roleCode: EnumRoleCode;
  permission: IPermission;
}

export interface IUpdateUser {
  id: string;
  //username: string;
  fullName: string;
  password?: string;
  passwordConfirm?: string;
  phoneNumber: string;
  permissionId: string;
  status: boolean;
  description?: string | undefined;
}
