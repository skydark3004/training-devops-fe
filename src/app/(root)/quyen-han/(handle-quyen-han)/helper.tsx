import { PermissionEnum } from '@/constants/enum';
import { IResponsePagination } from '@/constants/interface';
import moment from 'moment';

export const LIST_LABEL_PERMISSIONS = [
  'Quản lý nhân viên',
  'Quản lý khách hàng',
  'Quản lý khóa học',
  'Quản lý gói thành viên',
  'Quản lý mã giảm gián',
];

export const LABEL_TO_VALUE_PERMISSIONS: any = {
  'Quản lý nhân viên': PermissionEnum.EMPLOYEE,
  'Quản lý khách hàng': PermissionEnum.CUSTOMER,
  'Quản lý khóa học': PermissionEnum.COURSE,
  'Quản lý gói thành viên': PermissionEnum.PACKAGE,
  'Quản lý mã giảm giá': PermissionEnum.VOUCHER,
};

export const VALUE_TO_LABEL_PERMISSIONS: any = {
  [PermissionEnum.EMPLOYEE]: 'Quản lý nhân viên',
  [PermissionEnum.CUSTOMER]: 'Quản lý khách hàng',
  [PermissionEnum.COURSE]: 'Quản lý khóa học',
  [PermissionEnum.PACKAGE]: 'Quản lý gói thành viên',
  [PermissionEnum.VOUCHER]: 'Quản lý mã giảm gián',
};

export const convertLabelPermissionToValue = (values: any[]) => {
  const result = values.map((el) => LABEL_TO_VALUE_PERMISSIONS[el]);
  return result;
};

export const convertValuePermissionToLabel = (values: any[]) => {
  const result = values.map((el) => VALUE_TO_LABEL_PERMISSIONS[el]);
  return result;
};

export const formatListPermissions = (data: IResponsePagination) => {
  const formatData = data.data.map((el: any) => {
    return {
      id: el.id,
      name: el.name,
      details: el.details,
      createdAt: moment(el).format('DD-MM-YYYY'),
      status: el.status,
    };
  });
  return formatData;
};
