import { EnumExerciseType, EnumStudyProgramCode } from '@/constants/enum';
import { IGetDetailByIdBase, IGetListPaginationBase, IQueryParamsBase } from '@/constants/interface';
import { IGetUserById } from './user';
import { IModule } from './module';
import { IFeedback } from './feedback';

export interface IExercise extends IGetDetailByIdBase {
  name: string;
  exerciseType: EnumExerciseType;
  description: string;
  thumbnail?: string | null;
  guideVideos: string[];
  moduleId: string;
  module: IModule;
  details?: any;
  thumbnailToPreview?: string;
  guideVideosToPreview: string[];
  experienceReviews: IFeedback[];
}

export interface ICreateExercise {
  name: string;
  exerciseType: EnumExerciseType;
  description: string;
  thumbnail: string | null;
  guideVideos: string[];
  moduleId: string;
  details: any;
  status: boolean;
}

export interface IQueryParamsGetExercises extends IQueryParamsBase {
  keySearch?: string | undefined;
  studyProgramCode?: EnumStudyProgramCode | undefined;
  moduleId?: string | undefined;
}

export interface IUpdateExercise {
  name: string;
  exerciseType: EnumExerciseType;
  description: string;
  status: boolean;
  moduleId: string;
  details: any;

  addGuideVideos: string[] | undefined;
  deleteGuideVideos: string[] | undefined;

  isDeletedThumbnail: boolean;
  addThumbnail: string | undefined;
}

export interface IGetExercisePagination extends IGetListPaginationBase {
  data: IExercise[];
}
