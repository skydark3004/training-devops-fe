import { BreadcrumbWithCustomSeparator } from '@/components/custom/BreadcrumbWithCustomSeparator';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import CreatePermissionForm from './(handle-tao-quyen-han)/create-permission.component';

interface IParams {
  params: { id: string };
}

export const metadata = {
  title: 'Tạo quyền hạn',
};

export default async function getAllPermissions(params: IParams) {
  return (
    <>
      <div className='mt-2'>
        <BreadcrumbWithCustomSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href='/quyen-han'>
              <span className=''>Danh sách quyền hạn</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href='/quyen-han/tao-quyen-han'>
              <span className='font-bold text-black'>Tạo quyền hạn</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbWithCustomSeparator>
      </div>
      <h1 className='font-bold text-2xl mt-2'>Tạo quyền hạn</h1>

      <div className='bg-white rounded-xl mt-5 shadow-[0px_0px_10px_0px_silver] p-5'>
        <CreatePermissionForm></CreatePermissionForm>
      </div>
    </>
  );
}
