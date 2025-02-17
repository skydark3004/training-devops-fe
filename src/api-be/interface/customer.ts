import { EnumRoleCode, EnumStatusOfPurchase, EnumTypeOfPractice, EnumTypeOfPurchase } from '@/constants/enum';
import { IGetDetailByIdBase, IQueryParamsBase } from '@/constants/interface';
import { IPackage } from './package';
import { ILevel } from './level.';
import { ILevelSexology } from './level-sexology';
import { IModule } from './module';

export interface IUpdateCustomer {
  status: boolean;
  description?: string | undefined;
}

export interface IGetDetailCustomerById extends IGetDetailByIdBase {
  username: string;
  fullName: string;
  description: string;
  phoneNumber: string;
  status: boolean;
  roleCode: EnumRoleCode;
  age: number;
  wishDuration: number | null;
  currentSexualDuration: number | null;
  currentPackage: { id: string; expiredAt: string; isUseNow: boolean; package: IPackage };
}

export interface IQueryParamsGetListCustomers extends IQueryParamsBase {
  status?: boolean | 'true' | 'false';
  roleCode?: EnumRoleCode;
  keySearch?: string;
}

export interface IGetHistorySubscribeByUserId extends IGetDetailByIdBase {
  packageId: string;
  userId: string;
  activatedAt: string;
  expiredAt: string;
  transactionId: string;
  platform: string;
  isUseNow: boolean;
  package: IPackage;
  type: EnumTypeOfPurchase;
  finalPrice: number;
  discountPrice: number;
  statusOfPurchase: EnumStatusOfPurchase;
}

export interface IGetLearningProgressByUserId {
  progressLevel: {
    totalLevels: number;
    completedLevels: number;
  };
  currentLevel: ILevel | null;
  currentLevelSexology: {
    levelSexology: ILevelSexology;
    module: IModule;
    typeOfPractice: EnumTypeOfPractice;
    id: string;
    createdAt: string;
    updatedAt: string;
    status: boolean;
    levelSexologyId: string;
    userId: string;
    isCompleted: boolean;
    totalExercises: number;
    totalDoneExercises: number;
    index: number;
    moduleId: string;
    totalDaysMustLearn: number;
    currentLearnDays: number;
    totalTimesToPractice: number;
  } | null;
  progressLevelSexology: {
    totalLevels: number;
    completedLevels: number;
  };
}
