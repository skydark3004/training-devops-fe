import { IGetDetailByIdBase, IGetListPaginationBase, IQueryParamsBase } from '@/constants/interface';
import { ICategory } from './category';

export interface INutrition extends IGetDetailByIdBase {
  name: string;
  categoryId: string;
  index: number;
  pathThumbnail: string | null;
  pathThumbnailToPreview?: string | null;
  category: ICategory;
  description: string;
  content: string;
  isFree: boolean;
}

export interface ICreateNutrition {
  name: string;
  categoryId: string;
  index: number;
  pathThumbnail: string | null;
  status: boolean;
  isFree: boolean;
}

export interface IQueryParamsGetNutritions extends IQueryParamsBase {
  keySearch?: string | undefined;
  status?: boolean | undefined | 'false' | 'true';
}

export interface IUpdateNutrition {
  name: string;
  categoryId: string;
  index: number;
  pathThumbnail: string | null;
  status: boolean;
  content: string;
  description: string;
  isFree: boolean;
}

export interface IGetNutritionPagination extends IGetListPaginationBase {
  data: INutrition[];
}
