import { BreadcrumbWithCustomSeparator } from '@/components/custom/BreadcrumbWithCustomSeparator';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import ListPermissions from './(handle-quyen-han)/list-permission';

interface IParams {
  params: {};
}

export const metadata = {
  title: 'Danh sách quyền hạn',
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
            <BreadcrumbLink href='/tai-khoan'>
              <span className='font-bold text-black'>Danh sách quyền hạn</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbWithCustomSeparator>
      </div>
      <h1 className='font-bold text-2xl mt-2'>Danh sách quyền hạn</h1>
      <ListPermissions />
    </>
  );
}
