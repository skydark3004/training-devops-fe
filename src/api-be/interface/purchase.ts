import { EnumStatusOfPurchase, EnumTypeOfPurchase } from '@/constants/enum';
import { IGetDetailByIdBase, IGetListPaginationBase, IQueryParamsBase } from '@/constants/interface';
import { IGetDetailCustomerById } from './customer';
import { IPackage } from './package';
import { IVoucher } from './voucher';

export interface IPurchase extends IGetDetailByIdBase {
  packageId: string;
  userId: string;
  activatedAt: string;
  expiredAt: string;
  transactionId: string;
  voucherId: string;
  platform: string;
  isUseNow: boolean;
  type: EnumTypeOfPurchase;
  finalPrice: number;
  discountPrice: number;
  statusOfPurchase: EnumStatusOfPurchase;
  user: IGetDetailCustomerById;
  package: IPackage;
  voucher: IVoucher;
}

export interface IQueryParamsGetPurchases extends IQueryParamsBase {
  keySearch?: string | undefined;
  statusOfPurchase?: EnumStatusOfPurchase;
}

export interface IUpdatePurchase {
  statusOfPurchase: EnumStatusOfPurchase;
}

export interface IGetPurchasePagination extends IGetListPaginationBase {
  data: IPurchase[];
}
