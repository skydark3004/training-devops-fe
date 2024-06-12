'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEFAULT_VAULE_SELECT } from '@/constants/constants';
import { StatusEnum } from '@/constants/enum';
import { Search } from 'lucide-react';
import { ChangeEvent } from 'react';

export interface IProps {
  handleSelectOnChangePermissions: (id: string) => void;
  handleSelectOnChangeStatus: (value: StatusEnum) => void;
  handleOnChangeSearchUsername: (event: ChangeEvent<HTMLInputElement>) => void;
  handleOnChangeSearchPhoneNumber: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClickButtonSearch: () => void;
  listPermissions: any[];
}

export default function FilterUser(props: IProps) {
  return (
    <div className='bg-white rounded-xl mt-5 shadow-[0px_0px_10px_0px_silver] p-5'>
      <div className='grid grid-cols-7 gap-10'>
        <div className='col-span-1'>
          <h2 className='font-bold'>Tên đăng nhập</h2>
        </div>
        <div className='col-span-3'>
          <h2 className='font-bold'>Số điện thoại</h2>
        </div>
        <div className='col-span-1'>
          <h2 className='font-bold'>Trạng thái</h2>
        </div>
        <div className='col-span-1'>
          <h2 className='font-bold'>Phân quyền</h2>
        </div>
      </div>

      <div className='grid grid-cols-7 gap-10'>
        <div className='col-span-1'>
          <Input onChange={props.handleOnChangeSearchUsername} placeholder='Tìm theo tên đăng nhập' />
        </div>
        <div className='col-span-1'>
          <Input onChange={props.handleOnChangeSearchPhoneNumber} placeholder='Tìm theo số điện thoại' />
        </div>
        <div className='col-span-2'>
          <Button onClick={props.handleClickButtonSearch} style={{ backgroundColor: '#1677FF' }}>
            <Search className='mr-2 h-4 w-4' /> Tìm kiếm
          </Button>
        </div>
        <div className='col-span-1'>
          <Select onValueChange={props.handleSelectOnChangeStatus}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Tất cả' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={DEFAULT_VAULE_SELECT}>Tất cả</SelectItem>
                <SelectItem value={StatusEnum.ACTIVE}>Hoạt động</SelectItem>
                <SelectItem value={StatusEnum.INACTIVE}>Dừng hoạt động</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='col-span-1'>
          <Select onValueChange={props.handleSelectOnChangePermissions}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Tất cả' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={DEFAULT_VAULE_SELECT}>Tất cả</SelectItem>
                {props.listPermissions.map((value: any) => (
                  <SelectItem key={value?.id} value={value?.id}>
                    {value?.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
