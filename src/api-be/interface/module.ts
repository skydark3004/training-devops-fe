import { EnumStudyProgramCode } from '@/constants/enum';
import { IGetDetailByIdBase, IGetListPaginationBase, IQueryParamsBase } from '@/constants/interface';
import { IGetUserById } from './user';

export interface IModule extends IGetDetailByIdBase {
  name: string;
  studyProgramCode: EnumStudyProgramCode;
  createdByUserId: string;
  createdByUser: IGetUserById;
  path: string | null;
  url: string | null;
  excercises?: { id: string; name: string }[];
  index: number;
}

export interface ICreateModule {
  name: string;
  studyProgramCode: EnumStudyProgramCode;
  path: string | null;
  status: boolean;
  index: number;
}

export interface IQueryParamsGetModules extends IQueryParamsBase {
  keySearch?: string | undefined;
  studyProgramCode?: EnumStudyProgramCode | undefined;
  status?: boolean | undefined | 'false' | 'true';
}

export interface IUpdateModule {
  name: string;
  studyProgramCode: EnumStudyProgramCode;
  path: string | null;
  status: boolean;
}

export interface IGetModulePagination extends IGetListPaginationBase {
  data: IModule[];
}
