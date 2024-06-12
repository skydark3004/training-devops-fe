import { BreadcrumbWithCustomSeparator } from '@/components/custom/BreadcrumbWithCustomSeparator';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import DetailUserServer from './(handle-id)/detail-user.component-server';
import { getUserById } from '@/api-be/server';

interface IParams {
  params: { id: string };
}

export const metadata = {
  title: 'Thông tin chi tiết tài khoản',
};

export default async function DetailUserPage(params: IParams) {
  const userId = params.params.id;
  const dataUser = await getUserById(userId);

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
              <span>Danh sách người dùng</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>
              <span className='font-bold text-black'>Thông tin chi tiết người dùng</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbWithCustomSeparator>
      </div>
      <h1 className='font-bold text-2xl mt-2'>Thông tin chi tiết người dùng</h1>
      <DetailUserServer dataUser={dataUser} id={params.params.id} />
    </>
  );
}
