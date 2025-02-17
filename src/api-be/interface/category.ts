import { EnumStudyProgramCode } from '@/constants/enum';
import { IGetDetailByIdBase, IGetListPaginationBase, IQueryParamsBase } from '@/constants/interface';

export interface ICategory extends IGetDetailByIdBase {
  name: string;
}

export interface ICreateCategory {
  name: string;
  status: boolean;
}

export interface IQueryParamsGetCategorys extends IQueryParamsBase {
  keySearch?: string | undefined;
  status?: boolean | undefined | 'false' | 'true';
}

export interface IUpdateCategory {
  name: string;
  status: boolean;
}

export interface IGetCategoryPagination extends IGetListPaginationBase {
  data: ICategory[];
}
