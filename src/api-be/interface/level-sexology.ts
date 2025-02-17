import { EnumStudyProgramCode, EnumTypeOfPractice } from '@/constants/enum';
import { IGetDetailByIdBase, IGetListPaginationBase, IQueryParamsBase } from '@/constants/interface';
import { IModule } from './module';

export interface ILevelSexology extends IGetDetailByIdBase {
  name: string;
  status: boolean;
  isFree: boolean;
  moduleId: string;
  index: number;
  totalDaysMustLearn: number;
  totalTimesToPractice: number | null;
  listExercises: {
    id: string;
    exerciseId: string;
    index: number;
    description: string;
  }[];
  typeOfPractice: EnumTypeOfPractice;
  module?: IModule;
  pathThumbnail: string | null;
  pathThumbnailToPreview?: string | null;
}

export interface ICreateLevelSexology {
  name: string;
  status: boolean;
  isFree: boolean;
  moduleId: string;
  index: number;
  totalDaysMustLearn: number;
  totalTimesToPractice: number | null;
  listExercises: {
    exerciseId: string;
    index: number;
    description: string;
  }[];
  typeOfPractice: EnumTypeOfPractice;
}

export interface IQueryParamsGetLevelSexologys extends IQueryParamsBase {
  keySearch?: string | undefined;
  status?: boolean | undefined | 'false' | 'true';
}

export interface IUpdateLevelSexology {
  name: string;
  status: boolean;
  moduleId: string;
  isFree: boolean;
  index: number;
  totalDaysMustLearn: number;
  totalTimesToPractice: number | null;
  listExercises: {
    exerciseId: string;
    index: number;
    description: string;
  }[];
  typeOfPractice: EnumTypeOfPractice;
}

export interface IGetLevelSexologyPagination extends IGetListPaginationBase {
  data: ILevelSexology[];
}
