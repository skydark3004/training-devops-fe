export interface IGoogleSheetConfig {
  sheetId: string;
  publicUrl: string;
  lastRunCronJobInTimezoneVn: string;
  eachHourToRunCronJob: number;
}

export interface IUpdateGoogleSheetConfig {
  eachHourToRunCronJob: number;
}

import { IGetDetailByIdBase } from '@/constants/interface';

export interface IWelcomeVideo extends IGetDetailByIdBase {
  first: string | null;
  second: string | null;
  third: string | null;
  sexology: string | null;
  code: 'DEFAULT';
  firstToPreview?: string | null;
  secondToPreview?: string | null;
  thirdToPreview?: string | null;
  sexologyToPreview?: string | null;
}

export interface IUpsertWelcomeVideo {
  first: string;
  second: string;
  third: string;
}
