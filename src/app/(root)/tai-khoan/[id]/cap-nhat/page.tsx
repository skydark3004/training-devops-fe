import { BreadcrumbWithCustomSeparator } from '@/components/custom/BreadcrumbWithCustomSeparator';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import UpdateUserForm from './(handle-cap-nhat)/update-user-form.component';
import { getAllPermissions, getUserById } from '@/api-be/server';

interface IParams {
  params: { id: string };
}

export const metadata = {
  title: 'Chỉnh sửa tài khoản',
};

export default async function DetailUserPage(params: IParams) {
  const userId = params.params.id;
  const dataUser = await getUserById(userId);

  const permissions = await getAllPermissions();
  //console.log(permissions);
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
            <BreadcrumbLink className='font-bold text-black' href='#'>
              Chỉnh sửa thông tin người dùng
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbWithCustomSeparator>
      </div>
      <h1 className='font-bold text-2xl mt-2'>Chỉnh sửa thông tin người dùng</h1>

      <div className='bg-white rounded-xl mt-5 shadow-[0px_0px_10px_0px_silver] p-5'>
        <UpdateUserForm dataUser={dataUser} permissions={permissions.data} />
      </div>
    </>
  );
}
