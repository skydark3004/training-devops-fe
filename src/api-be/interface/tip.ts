import { IGetDetailByIdBase, IGetListPaginationBase, IQueryParamsBase } from '@/constants/interface';

export interface ITip extends IGetDetailByIdBase {
  content: string;
}

export interface ICreateTip {
  content: string;
  status: boolean;
}

export interface IQueryParamsGetTips extends IQueryParamsBase {
  keySearch?: string | undefined;
  status?: boolean | undefined | 'false' | 'true';
}

export interface IUpdateTip {
  content: string;
  status: boolean;
}

export interface IGetTipPagination extends IGetListPaginationBase {
  data: ITip[];
}
