import { EnumDiscountUnit } from '@/constants/enum';
import { IGetDetailByIdBase, IGetListPaginationBase, IQueryParamsBase } from '@/constants/interface';

export interface IVoucher extends IGetDetailByIdBase {
  code: string;
  quantity: number;
  usedQuantity: number;
  remainingQuantity: number;
  startDate: string;
  endDate: string;
  description: string;
  discountUnit: EnumDiscountUnit;
  discountValue: number;
}

export interface ICreateVoucher {
  code: string;
  quantity: number;
  startDate: string;
  endDate: string;
  description: string;
  status: boolean;
  discountUnit: EnumDiscountUnit;
  discountValue: number;
}

export interface IQueryParamsGetVouchers extends IQueryParamsBase {
  keySearch?: string | undefined;
  status?: boolean | undefined | 'false' | 'true';
}

export interface IUpdateVoucher {
  code: string;
  quantity: number;
  startDate: string;
  endDate: string;
  description: string;
  status: boolean;
  discountUnit: EnumDiscountUnit;
  discountValue: number;
}

export interface IGetVoucherPagination extends IGetListPaginationBase {
  data: IVoucher[];
}
