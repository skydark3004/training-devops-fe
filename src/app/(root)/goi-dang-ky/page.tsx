import { BreadcrumbWithCustomSeparator } from '@/components/custom/BreadcrumbWithCustomSeparator';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import ListPackagesPagination from './(handle-dang-ky)/list-pagination.component';

interface IParams {
  params: {};
}

export const metadata = {
  title: 'Danh sách gói đăng ký',
};

export default async function PackagePage(params: IParams) {
  return (
    <>
      <div className='mt-2'>
        <BreadcrumbWithCustomSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href='/goi-dang-ky'>
              <span className='font-bold text-black'>Danh sách gói đăng ký</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbWithCustomSeparator>
      </div>
      <h1 className='font-bold text-2xl mt-2'>Danh sách gói đăng ký</h1>
      <ListPackagesPagination />
    </>
  );
}
