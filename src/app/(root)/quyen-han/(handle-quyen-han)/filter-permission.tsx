'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/select-box';

import { DEFAULT_VAULE_SELECT } from '@/constants/constants';
import { StatusEnum } from '@/constants/enum';
import { Search } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { LIST_PERMISSIONS } from '../tao-quyen-han/(handle-tao-quyen-han)/list-permissions';
import { convertLabelPermissionToValue } from './helper';
import { useRouter } from 'next/navigation';

export interface IProps {
  handleOnClickSearchButton: () => void;
  handleOnChangeSearchName: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectOnChangeStatus: (value: StatusEnum) => void;
  handleSelectOnChangeDetailPermissions: (details: any) => void;
}

export default function FilterPermissions(props: IProps) {
  const router = useRouter();

  const [value, setValue] = useState<any[]>([]);

  const onChangeValue = (value: any[]) => {
    setValue(value);

    props.handleSelectOnChangeDetailPermissions(convertLabelPermissionToValue(value));
  };
  return (
    <div className='bg-white rounded-xl mt-5 shadow-[0px_0px_10px_0px_silver] p-8'>
      <div className='grid grid-cols-7 gap-10'>
        <div className='col-span-2'>
          <h2 className='font-bold'>Tên nhóm quyền hạn</h2>
        </div>

        <div className='col-span-2'>
          <h2 className='font-bold'>Trạng thái</h2>
        </div>
        <div className='col-span-3'>
          <h2 className='font-bold'>Phân quyền</h2>
        </div>
      </div>

      <div className='grid grid-cols-7 gap-10'>
        <div className='col-span-2'>
          <Input placeholder='........' onChange={props.handleOnChangeSearchName} />
        </div>

        {/*         <div className='col-start-2 col-span-2'>
          <Button onClick={props.handleOnClickSearchButton} style={{ backgroundColor: '#1677FF' }}>
            <Search className='mr-2 h-4 w-6' /> Tìm kiếm
          </Button>
        </div> */}
        <div className='col-span-2'>
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

        <MultiSelector values={value} onValuesChange={onChangeValue} loop className='col-span-3'>
          <MultiSelectorTrigger>
            <MultiSelectorInput className='w-full' placeholder='Chọn các quyền hạn' />
          </MultiSelectorTrigger>
          <MultiSelectorContent>
            <MultiSelectorList>
              {LIST_PERMISSIONS.map((value) => {
                return (
                  <MultiSelectorItem key={value.value} value={value.label}>
                    {value.label}
                  </MultiSelectorItem>
                );
              })}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
      </div>
      <div className='grid grid-cols-12 gap-10 mt-5'>
        <Button className='col-span-2 bg-blue-600' onClick={props.handleOnClickSearchButton}>
          <Search className='mr-2 h-4 w-6' /> Tìm kiếm
        </Button>

        <Button
          className='col-span-3 bg-green-700'
          onClick={() => {
            router.push('/quyen-han/tao-quyen-han');
          }}>
          Thêm mới nhóm quyền hạn
        </Button>
      </div>
      {/*       <div className='grid grid-cols-7'>
        <Button onClick={props.handleOnClickSearchButton} style={{ backgroundColor: '#1677FF' }}>
          <Search className='mr-2 h-4 w-6' /> Tìm kiếm
        </Button>

        <Button className='ml-10' onClick={props.handleOnClickSearchButton} style={{ backgroundColor: '#1677FF' }}>
          Thêm mới nhóm quyền hạn
        </Button>
      </div> */}
    </div>
  );
}
