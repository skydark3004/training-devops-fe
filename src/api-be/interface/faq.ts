import { EnumStudyProgramCode, EnumTypeOfFaq } from '@/constants/enum';
import { IGetDetailByIdBase, IGetListPaginationBase, IQueryParamsBase } from '@/constants/interface';
import { IGetUserById } from './user';

export interface IFaq extends IGetDetailByIdBase {
  pathThumbnail: string;
  content: string;
  title: string;
  type: EnumTypeOfFaq;
  pathVideo: string;
  createdByUser: IGetUserById;
  pathThumbnailToPreview: string;
  pathVideoToPreview: string;
  index: number;
}

export interface ICreateFaq {
  title: string;
  pathThumbnail: string;
  type: EnumTypeOfFaq;
  content: string;
  pathVideo: string;
  status: boolean;
  index: number;
}

export interface IQueryParamsGetFaqs extends IQueryParamsBase {
  keySearch?: string | undefined;
  status?: boolean | undefined | 'false' | 'true';
  type?: EnumTypeOfFaq | undefined;
}

export interface IUpdateFaq {
  title: string;
  pathThumbnail: string;
  type: EnumTypeOfFaq;
  content: string;
  pathVideo: string;
  status: boolean;
  index: number;
}

export interface IGetFaqPagination extends IGetListPaginationBase {
  data: IFaq[];
}
