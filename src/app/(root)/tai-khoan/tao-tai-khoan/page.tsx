'use client';

import { BreadcrumbWithCustomSeparator } from '@/components/custom/BreadcrumbWithCustomSeparator';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import CreateUserForm from './(handle-tao-tai-khoan)/create-user-form.component';

export default function AccountPage() {
  return (
    <>
      <div className='mt-2'>
        <BreadcrumbWithCustomSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href='/tai-khoan/tao-tai-khoan'>
              <span className='font-bold text-black'>Tạo tài khoản</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbWithCustomSeparator>
      </div>
      <h1 className='font-bold text-2xl mt-2'>Tạo mới người dùng</h1>

      <div className='bg-white rounded-xl mt-5 shadow-[0px_0px_10px_0px_silver] p-5'>
        <CreateUserForm></CreateUserForm>
      </div>
    </>
  );
}
