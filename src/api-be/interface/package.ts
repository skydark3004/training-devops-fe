import { EnumDiscountUnit, EnumDurationUnit, EnumPriceUnit } from '@/constants/enum';
import { IGetDetailByIdBase, IGetListPaginationBase, IQueryParamsBase } from '@/constants/interface';

export interface ICreatePackage {
  name: string;
  durationValue: number; // thời hạn sử dụng
  durationUnit: EnumDurationUnit;
  priceUnit: EnumPriceUnit;
  originalPrice: number; // giá gốc
  discountValue: number; // số % giảm giá
  isShowDiscount: boolean;
  description: string;
  status: boolean;
  discountUnit: EnumDiscountUnit;
}

export interface IQueryParamsGetPackages extends IQueryParamsBase {
  name?: string;
  keySearch?: string;
  status?: boolean;
}

export interface IUpdatePackage {
  name: string;
  durationValue: number; // thời hạn sử dụng
  durationUnit: EnumDurationUnit;
  priceUnit: EnumPriceUnit;
  originalPrice: number; // giá gốc
  discountValue: number; // số % giảm giá
  isShowDiscount: boolean;
  description: string;
  status: boolean;
  discountUnit: EnumDiscountUnit;
}

export interface IPackage extends IGetDetailByIdBase {
  name: string;
  durationValue: number; // thời hạn sử dụng
  durationUnit: EnumDurationUnit;
  priceUnit: EnumPriceUnit;
  originalPrice: number; // giá gốc
  discountValue: number; // số % giảm giá
  isShowDiscount: boolean;
  description: string;
  discountUnit: EnumDiscountUnit;
  priceAfterDiscount: number;
  code: 'FREE' | null;
}

export interface IGetPackagePagination extends IGetListPaginationBase {
  data: IPackage[];
}
