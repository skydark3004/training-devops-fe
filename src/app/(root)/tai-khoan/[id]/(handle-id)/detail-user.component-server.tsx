import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { convertStatusToHtml } from './helper';
import { IGetUserById } from '@/api-be/server/user/user.interface';

interface IProps {
  dataUser: IGetUserById;
  id: string;
}

export default async function DetailUserServer(props: IProps) {
  const status = convertStatusToHtml(props.dataUser?.status);
  return (
    <>
      <div className='bg-white rounded-xl mt-5 shadow-[0px_0px_10px_0px_silver] p-5'>
        <div className='grid grid-cols-1 md:grid-cols-8 gap-6'>
          <div className='col-span-4'>Email: {props.dataUser?.username}</div>
          <div className='col-span-4'>Họ và tên: {props.dataUser?.fullName}</div>
          <div className='col-span-4'>Số điện thoại: {props.dataUser?.phoneNumber}</div>
          <div className='col-span-4'>Mô tả: {props.dataUser?.description}</div>
          <div className='col-span-4'>Nhóm quyền: {props.dataUser?.permission?.name}</div>
          <div className='col-span-4'>{status}</div>
          <Link className='col-start-4 col-span-1' href={`${props.id}/cap-nhat`}>
            <Button className='bg-blue-700'>Chỉnh sửa</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
