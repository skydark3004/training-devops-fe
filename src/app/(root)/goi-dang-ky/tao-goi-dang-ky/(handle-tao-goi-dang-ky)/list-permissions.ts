import { PermissionEnum } from '@/constants/enum';

export const LIST_PERMISSIONS = [
  { value: PermissionEnum.EMPLOYEE, label: 'Quản lý nhân viên' },
  { value: PermissionEnum.CUSTOMER, label: 'Quản lý khách hàng' },
  { value: PermissionEnum.COURSE, label: 'Quản lý khóa học' },
  { value: PermissionEnum.PACKAGE, label: 'Quản lý gói thành viên' },
  { value: PermissionEnum.VOUCHER, label: 'Quản lý mã giảm giá' },
];
