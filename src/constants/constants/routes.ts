import { EnumPermission } from '../enum';
import {
  Bell,
  BookHeadphones,
  BookOpenText,
  CircleDollarSign,
  ContactRound,
  Lightbulb,
  MessageSquareWarning,
  Package,
  Settings,
  ShieldCheck,
  Ticket,
  Users,
} from 'lucide-react';

export const ROUTES = [
  {
    title: 'Gói đăng ký',
    url: '/goi-dang-ky',
    icon: Package,
    isActive: false,
    code: EnumPermission.PACKAGE,
  },
  {
    title: 'Nhân viên',
    url: '/tai-khoan',
    icon: Users,
    code: EnumPermission.EMPLOYEE,
  },
  {
    title: 'Khách hàng',
    url: '/khach-hang',
    icon: ContactRound,
    code: EnumPermission.CUSTOMER,
  },
  {
    title: 'Khóa học',
    url: '#',
    icon: BookOpenText,
    items: [
      {
        title: 'Module',
        url: '/module',
      },
      {
        title: 'Level tập luyện',
        url: '/level',
      },
      {
        title: 'Tình dục học',
        url: '/level-tinh-duc-hoc',
      },
      {
        title: 'Bài tập',
        url: '/bai-tap',
      },
      {
        title: 'Danh mục dinh dưỡng',
        url: '/danh-muc',
      },
      {
        title: 'Bài tập dinh dưỡng',
        url: '/dinh-duong',
      },
    ],
    code: EnumPermission.COURSE,
  },
  {
    title: 'Quyền hạn',
    url: '/quyen-han',
    icon: ShieldCheck,
  },
  {
    title: 'FAQ',
    url: '/faq',
    icon: BookHeadphones,
    code: EnumPermission.FAQ,
  },
  {
    title: 'Mẹo',
    url: '/meo',
    icon: Lightbulb,
    code: EnumPermission.TIP,
  },
  {
    title: 'Thông báo',
    url: '/thong-bao',
    icon: Bell,
    code: EnumPermission.NOTIFCATION,
  },
  {
    title: 'Mã giảm giá',
    url: '/ma-giam-gia',
    icon: Ticket,
    code: EnumPermission.VOUCHER,
  },
  {
    title: 'Thanh toán',
    url: '/thanh-toan',
    icon: CircleDollarSign,
    code: EnumPermission.PURCHASE,
  },
  {
    title: 'Cài đặt',
    url: '#',
    icon: Settings,
    items: [
      {
        title: 'Video giới thiệu',
        url: '/video-gioi-thieu',
      },
      {
        title: 'Video tình dục học',
        url: '/video-level-tinh-duc',
      },
      {
        title: 'Google Sheet',
        url: '/cai-dat-google-sheet',
      },
      {
        title: 'Cách tìm cơ PC',
        url: '/cach-tim-co-pc',
      },
    ],
    code: EnumPermission.SETTING,
  },
  {
    title: 'Feedback',
    url: '/feedback',
    icon: MessageSquareWarning,
    code: EnumPermission.FEEDBACK,
  },
];
