import { IGetDetailByIdBase, IGetListPaginationBase, IQueryParamsBase } from '@/constants/interface';
import { IGetUserById } from './user';
import { IExercise } from './excercise';

export interface IFeedback extends IGetDetailByIdBase {
  userId: string;
  exerciseId: string;
  content: string;
  star: number;
  user: IGetUserById;
  exercise: IExercise;
}

export interface IQueryParamsGetFeedbacks extends IQueryParamsBase {
  keySearch?: string | undefined;
  exerciseId?: string | undefined;
  userId?: string | undefined;
}

export interface IGetFeedbackPagination extends IGetListPaginationBase {
  data: IFeedback[];
}
