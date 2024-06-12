'use client';

import React, { useState } from 'react';
import { SidebarItem } from './sidebar-item';
import Link from 'next/link';
import { CookieUtilsClient } from '@/utils/cookie/client';
import { APP_CONFIG } from '@/config/app.config';
import { useRouter } from 'next/navigation';

export const Sidebar = () => {
  const router = useRouter();
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (item: any) => {
    setOpenItem(openItem === item ? null : item);
  };

  const logOut = () => {
    CookieUtilsClient.remove(APP_CONFIG.ENV.KEY_ACCESS_TOKEN);
    router.push('/dang-nhap');
  };

  return (
    <div className='w-64 h-screen bg-white border-r'>
      <div className='flex items-center justify-between p-4'></div>
      <nav className='mt-5'>
        <div className='p-2 hover:bg-gray-200 cursor-pointer'>
          <p className='font-bold text-[#323641]'>Dashboard</p>
        </div>
        {/*  <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer text-[#323641]'>Quản lý thanh toán</div> */}
        <Link href={'/goi-dang-ky'} style={{ display: 'block' }}>
          <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>Quản lý gói đăng ký</div>
        </Link>
        {/*         <SidebarItem title='Quản lý gói đăng ký' isOpen={openItem === 'subscriptions'} toggle={() => toggleItem('subscriptions')}>
          <div className='p-2 hover:bg-gray-100 cursor-pointer'>Danh sách gói</div>
          <div className='p-2 hover:bg-gray-100 cursor-pointer'>Tạo mới gói</div>
        </SidebarItem> */}
        <Link href={'/khach-hang'} style={{ display: 'block' }}>
          <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>Quản lý khách hàng</div>
        </Link>
        {/*         <SidebarItem title='Quản lý khách hàng' isOpen={openItem === 'customers'} toggle={() => toggleItem('customers')}>
          <div className='p-2 hover:bg-gray-100 cursor-pointer'>Danh sách khách hàng</div>
          <div className='p-2 hover:bg-gray-100 cursor-pointer'>Tạo mới khách hàng</div>
        </SidebarItem> */}
        <Link href={'/tai-khoan'} style={{ display: 'block' }}>
          <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>Quản lý nhân viên</div>
        </Link>
        {/*         <SidebarItem title='Quản lý người dùng' isOpen={openItem === 'users'} toggle={() => toggleItem('users')}>
          <Link href={'/tai-khoan'} style={{ display: 'block' }}>
            <div className='p-2 hover:bg-gray-100 cursor-pointer'>Danh sách người dùng</div>
          </Link>

          <Link href={'/tai-khoan/tao-tai-khoan'} style={{ display: 'block' }}>
            <div className='p-2 hover:bg-gray-100 cursor-pointer'> Tạo mới người dùng</div>
          </Link>
        </SidebarItem> */}
        <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>Quản lý khóa học</div>
        <Link href={'/quyen-han'} style={{ display: 'block' }}>
          <div className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>Quản lý quyền hạn</div>
        </Link>

        {/*         <SidebarItem title='Báo cáo' isOpen={openItem === 'reports'} toggle={() => toggleItem('reports')}>
          <div className='p-2 hover:bg-gray-100 cursor-pointer'>Báo cáo tháng</div>
          <div className='p-2 hover:bg-gray-100 cursor-pointer'>Báo cáo năm</div>
        </SidebarItem> */}
        {/*         <SidebarItem title='Cài đặt' isOpen={openItem === 'settings'} toggle={() => toggleItem('settings')}>
          <div className='p-2 hover:bg-gray-100 cursor-pointer'>Cài đặt chung</div>
          <div className='p-2 hover:bg-gray-100 cursor-pointer'>Cài đặt tài khoản</div>
        </SidebarItem> */}
      </nav>
      <div onClick={logOut} className='font-bold p-2 hover:bg-gray-200 cursor-pointer'>
        Đăng xuất
      </div>
    </div>
  );
};
