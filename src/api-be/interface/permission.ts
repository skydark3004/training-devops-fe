import { EnumPermission, EnumStudyProgramCode } from '@/constants/enum';
import { IGetDetailByIdBase, IGetListPaginationBase, IQueryParamsBase } from '@/constants/interface';

export interface IPermission extends IGetDetailByIdBase {
  name: string;
  details: EnumPermission[];
}

export interface ICreatePermission {
  name: string;
  details: EnumPermission[];
  status: boolean;
}

export interface IQueryParamsGetPermisions extends IQueryParamsBase {
  name?: string;
  permissionCodes?: string;
  status?: boolean | 'true' | 'false';
  studyProgramCode?: EnumStudyProgramCode;
}

export interface IUpdatePermission {
  name: string;
  details: string[];
  status: boolean;
}

export interface IGetPermissionPagination extends IGetListPaginationBase {
  data: IPermission[];
}
