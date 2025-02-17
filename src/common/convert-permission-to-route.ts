import { EnumPermission } from '@/constants/enum';

export const convertRouteToEnum = (value: EnumPermission) => {
  const obj = {
    [EnumPermission.PACKAGE]: 'goi-dang-ky',
    [EnumPermission.EMPLOYEE]: 'tai-khoan',
    [EnumPermission.CUSTOMER]: 'khach-hang',
    [EnumPermission.COURSE]: ['module', 'level', 'level-tinh-duc-hoc', 'bai-tap', 'danh-muc', 'dinh-duong'],
    [EnumPermission.FAQ]: 'faq',
    [EnumPermission.TIP]: 'meo',
    [EnumPermission.NOTIFCATION]: 'thong-bao',
    [EnumPermission.VOUCHER]: 'ma-giam-gia',
    [EnumPermission.PURCHASE]: 'thanh-toan',
    [EnumPermission.SETTING]: ['video-gioi-thieu', 'video-level-tinh-duc', 'cai-dat-google-sheet', 'cach-tim-co-pc'],
    [EnumPermission.FEEDBACK]: 'feedback',
  };
  return obj[value];
};
