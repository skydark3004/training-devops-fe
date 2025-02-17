import { EnumStudyProgramCode } from '@/constants/enum';
import { IGetDetailByIdBase, IGetListPaginationBase, IQueryParamsBase } from '@/constants/interface';
import { IExercise } from './excercise';

export interface ILevel extends IGetDetailByIdBase {
  name: string;
  totalDaysToStudy: number;
  isFree: boolean;
  index: number;
  pathThumbnail: string | null;
  pathThumbnailToPreview?: string | null;
  practiceDays: {
    id: string;
    totalExercises: number;
    index: number;
    levelId: string;
    level: ILevel;
    exercisesOfEachDay: {
      id: string;
      index: number;
      frequency: number;
      description: string;
      practiceDayId: string;
      exerciseId: string;
      exercise: IExercise;
    }[];
  }[];
}

export interface ICreateLevel {
  name: string;
  studyProgramCode: EnumStudyProgramCode;
  path: string | null;
  status: boolean;
}

export interface IQueryParamsGetLevels extends IQueryParamsBase {
  keySearch?: string | undefined;
  studyProgramCode?: EnumStudyProgramCode | undefined;
  status?: boolean | undefined | 'false' | 'true';
}

export interface IUpdateLevel {
  name: string;
  studyProgramCode: EnumStudyProgramCode;
  path: string | null;
  status: boolean;
}

export interface IGetLevelPagination extends IGetListPaginationBase {
  data: ILevel[];
}
