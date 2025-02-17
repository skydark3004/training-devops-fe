'use client';

import React, { useState } from 'react';
import { SidebarItem } from './sidebar-item';
import Link from 'next/link';
import { CookieUtilsClient } from '@/utils/cookie/client';
import { APP_CONFIG } from '@/config/app.config';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context';
import { EnumPermission, EnumRoleCode } from '@/constants/enum';
import { arrayNormalToObject } from '@/lib/array.util';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  Bell,
  BookHeadphones,
  BookOpenText,
  CircleDollarSign,
  ContactRound,
  Lightbulb,
  LogOut,
  Package,
  Settings,
  ShieldCheck,
  Ticket,
  Users,
  Video,
} from 'lucide-react';

export const Sidebar = () => {
  const { dataContext } = useUserContext();

  const router = useRouter();
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (item: any) => {
    setOpenItem(openItem === item ? null : item);
  };

  const logOut = () => {
    CookieUtilsClient.remove('accessToken');
    CookieUtilsClient.remove('inforUser');
    router.push('/dang-nhap');
  };

  const convertPermission = arrayNormalToObject(dataContext?.permission?.details || []);

  if (!dataContext)
    return (
      <>
        <div className='w-50 h-screen bg-white border-r min-w-[200px]'>
          <div className='flex items-center justify-between p-4'>
            <nav className='mt-5'>
              <Skeleton circle={true} count={3} />
            </nav>
          </div>
        </div>
      </>
    );

  return (
    <div className='w-50 h-screen bg-white border-r min-w-[200px]'>
      <div className='flex items-center justify-between p-4'></div>
      <nav className='mt-5'>
        {(() => {
          if (dataContext?.roleCode === EnumRoleCode.ADMIN || dataContext?.roleCode === EnumRoleCode.SUPER_ADMIN) {
            return (
              <>
                <Link href={'/goi-dang-ky'} style={{ display: 'block' }}>
                  <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
                    <Settings size={20} className='inline-block mr-2' />
                    Quản lý gói đăng ký
                  </div>
                </Link>

                <Link href={'/tai-khoan'} style={{ display: 'block' }}>
                  <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
                    <Users size={20} className='inline-block mr-2' /> Quản lý nhân viên
                  </div>
                </Link>

                <Link href={'/khach-hang'} style={{ display: 'block' }}>
                  <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
                    <ContactRound size={20} className='inline-block mr-2' /> Quản lý khách hàng
                  </div>
                </Link>

                <SidebarItem
                  icon={<BookOpenText size={20} className='inline-block mr-2' />}
                  title='Quản lý khóa học'
                  isOpen={openItem === 'reports'}
                  toggle={() => toggleItem('reports')}>
                  <Link href={'/module'}>
                    <div className='font-semibold p-2 hover:bg-gray-200 cursor-pointer'>Module</div>
                  </Link>
                  <Link href={'/level'}>
                    <div className='font-semibold p-2 hover:bg-gray-200 cursor-pointer'>Level tập luyện</div>
                  </Link>
                  <Link href={'/level-tinh-duc-hoc'}>
                    <div className='font-semibold p-2 hover:bg-gray-200 cursor-pointer'>Level tình dục học</div>
                  </Link>
                  <Link href={'/bai-tap'}>
                    <div className='font-semibold p-2 hover:bg-gray-200 cursor-pointer'>Bài tập</div>
                  </Link>
                  <Link href={'/dinh-duong'}>
                    <div className='font-semibold p-2 hover:bg-gray-200 cursor-pointer'>Bài tập dinh dưỡng</div>
                  </Link>
                  <Link href={'/danh-muc'}>
                    <div className='font-semibold p-2 hover:bg-gray-200 cursor-pointer'>Danh mục dinh dưỡng</div>
                  </Link>
                </SidebarItem>

                <Link href={'/quyen-han'} style={{ display: 'block' }}>
                  <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
                    <ShieldCheck size={20} className='inline-block mr-2' /> Quản lý quyền hạn
                  </div>
                </Link>

                <SidebarItem
                  icon={<Video size={20} className='inline-block mr-2' />}
                  title='Quản lý Video'
                  isOpen={openItem === 'videos'}
                  toggle={() => toggleItem('videos')}>
                  <Link href={'/video-gioi-thieu'} style={{ display: 'block' }}>
                    <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>Giới thiệu</div>
                  </Link>
                  <Link href={'/video-level-tinh-duc'} style={{ display: 'block' }}>
                    <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>Tâm lý tình dục</div>
                  </Link>
                </SidebarItem>

                <Link href={'/faq'} style={{ display: 'block' }}>
                  <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
                    <BookHeadphones size={20} className='inline-block mr-2' />
                    Quản lý FAQ
                  </div>
                </Link>

                <Link href={'/meo'} style={{ display: 'block' }}>
                  <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
                    <Lightbulb size={20} className='inline-block mr-2' />
                    Quản lý mẹo
                  </div>
                </Link>

                <Link href={'/thong-bao'} style={{ display: 'block' }}>
                  <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
                    <Bell size={20} className='inline-block mr-2' />
                    Quản lý thông báo
                  </div>
                </Link>

                <Link href={'/ma-giam-gia'} style={{ display: 'block' }}>
                  <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
                    <Ticket size={20} className='inline-block mr-2' />
                    Quản lý mã giảm giá
                  </div>
                </Link>

                <Link href={'/thanh-toan'} style={{ display: 'block' }}>
                  <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
                    <CircleDollarSign size={20} className='inline-block mr-2' />
                    Quản lý thanh toán
                  </div>
                </Link>

                <Link href={'/cai-dat-google-sheet'} style={{ display: 'block' }}>
                  <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
                    <Settings size={20} className='inline-block mr-2' />
                    Cài đặt Google Sheet
                  </div>
                </Link>
              </>
            );
          }

          if (dataContext?.roleCode === EnumRoleCode.EMPLOYEE) {
            return (
              <>
                {convertPermission[EnumPermission.PACKAGE] && (
                  <Link href={'/goi-dang-ky'} style={{ display: 'block' }}>
                    <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
                      <Settings size={20} className='inline-block mr-2' />
                      Quản lý gói đăng ký
                    </div>
                  </Link>
                )}

                {convertPermission[EnumPermission.EMPLOYEE] && (
                  <Link href={'/tai-khoan'} style={{ display: 'block' }}>
                    <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
                      <Users size={20} className='inline-block mr-2' /> Quản lý nhân viên
                    </div>
                  </Link>
                )}

                {convertPermission[EnumPermission.CUSTOMER] && (
                  <Link href={'/khach-hang'} style={{ display: 'block' }}>
                    <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
                      <Users size={20} className='inline-block mr-2' /> Quản lý khách hàng
                    </div>
                  </Link>
                )}

                {convertPermission[EnumPermission.COURSE] && (
                  <SidebarItem
                    icon={<BookOpenText size={20} className='inline-block mr-2' />}
                    title='Quản lý khóa học'
                    isOpen={openItem === 'reports'}
                    toggle={() => toggleItem('reports')}>
                    <Link href={'/module'}>
                      <div className='font-semibold p-2 hover:bg-gray-200 cursor-pointer'>Module</div>
                    </Link>
                    <Link href={'/level'}>
                      <div className='font-semibold p-2 hover:bg-gray-200 cursor-pointer'>Level tập luyện</div>
                    </Link>
                    <Link href={'/level-tinh-duc-hoc'}>
                      <div className='font-semibold p-2 hover:bg-gray-200 cursor-pointer'>Level tình dục học</div>
                    </Link>
                    <Link href={'/bai-tap'}>
                      <div className='font-semibold p-2 hover:bg-gray-200 cursor-pointer'>Bài tập</div>
                    </Link>
                    <Link href={'/dinh-duong'}>
                      <div className='font-semibold p-2 hover:bg-gray-200 cursor-pointer'>Bài tập dinh dưỡng</div>
                    </Link>
                    <Link href={'/danh-muc'}>
                      <div className='font-semibold p-2 hover:bg-gray-200 cursor-pointer'>Danh mục dinh dưỡng</div>
                    </Link>
                  </SidebarItem>
                )}

                {convertPermission[EnumPermission.VOUCHER] && (
                  <Link href={'/ma-giam-gia'} style={{ display: 'block' }}>
                    <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
                      <Ticket size={20} className='inline-block mr-2' />
                      Quản lý mã giảm giá
                    </div>
                  </Link>
                )}
              </>
            );
          }

          return <></>;
        })()}
      </nav>
      <div onClick={logOut} className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
        <LogOut size={20} className='inline-block mr-2' />
        Đăng xuất
      </div>
    </div>
  );
};
