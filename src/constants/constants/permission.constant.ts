import { EnumPermission } from '@/constants/enum';

export const LIST_PERMISSIONS = [
  { value: EnumPermission.PACKAGE, label: 'Gói đăng ký' },
  { value: EnumPermission.EMPLOYEE, label: 'Nhân viên' },
  { value: EnumPermission.CUSTOMER, label: 'Khách hàng' },
  { value: EnumPermission.COURSE, label: 'Khóa học' },
  { value: EnumPermission.FAQ, label: 'FAQ' },
  { value: EnumPermission.TIP, label: 'Mẹo' },
  { value: EnumPermission.NOTIFCATION, label: 'Thông báo' },
  { value: EnumPermission.VOUCHER, label: 'Mã giảm giá' },
  { value: EnumPermission.PURCHASE, label: 'Thanh toán' },
  { value: EnumPermission.SETTING, label: 'Cài đặt' },
  { value: EnumPermission.FEEDBACK, label: 'Feedback' },
];
