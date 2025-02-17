import { EnumTypeOfNotification } from '@/constants/enum';
import { IGetDetailByIdBase, IGetListPaginationBase, IQueryParamsBase } from '@/constants/interface';

export interface INotification extends IGetDetailByIdBase {
  title: string;
  date: string;
  description: string;
  pathThumbnail: string;
  totalLikes: number;
  type: EnumTypeOfNotification;
  pathThumbnailToPreview: string;
}

export interface ICreateNotification {
  title: string;
  date: string;
  description: string;
  pathThumbnail: string;
  type: EnumTypeOfNotification;
  pathThumbnailToPreview: string;
  status: boolean;
}

export interface IQueryParamsGetNotifications extends IQueryParamsBase {
  keySearch?: string | undefined;
  status?: boolean | undefined | 'false' | 'true';
  type?: EnumTypeOfNotification | undefined;
}

export interface IUpdateNotification {
  title: string;
  date: string;
  description: string;
  pathThumbnail: string;
  type: EnumTypeOfNotification;
  pathThumbnailToPreview: string;
  status: boolean;
}

export interface IGetNotificationPagination extends IGetListPaginationBase {
  data: INotification[];
}
