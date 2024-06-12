'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export type User = {
  id: string;
  phoneNumber: string;
  createdAt: string;
  status: string;
  permission: string;
  username: string;
  fullName: string;
};

export const convertIdColumnToContent: any = {
  phoneNumber: 'Số điện thoại',
  createdAt: 'Ngày tham gia',
  status: 'Trạng thái',
  permission: 'Phân quyền',
  username: 'Email',
  fullName: 'Tên người dùng',
  actions: 'Hành động',
};

export const columns: ColumnDef<User>[] = [
  {
    id: 'fullName',
    accessorKey: 'fullName',
    //header: 'Tên người dùng',
    header: ({ column }) => {
      return (
        <Button className='m-[-20px] text-black' variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span className='font-bold'>Tên người dùng</span>
          <ArrowUpDown className='h-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'phoneNumber',
    //header: 'Số điện thoại',
    header: ({ column }) => {
      return <span className='font-bold text-black'>Số điện thoại</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    //header: 'Ngày tham gia',
    header: ({ column }) => {
      return <span className='font-bold text-black'>Ngày tham gia</span>;
    },
  },
  {
    accessorKey: 'username',
    //header: 'Email',
    header: ({ column }) => {
      return <span className='font-bold text-black'>Email</span>;
    },
  },
  {
    accessorKey: 'permission',
    //header: 'Phân quyền',
    header: ({ column }) => {
      return <span className='font-bold text-black'>Phân quyền</span>;
    },
  },
  {
    accessorKey: 'status',
    //header: 'Trạng thái',
    header: ({ column }) => {
      return <span className='font-bold text-black'>Trạng thái</span>;
    },
    cell: ({ row }) => {
      const value = row.getValue('status');
      return value === 'ACTIVE' ? (
        <img className='w-5' src='/assets_check_circle.svg'></img>
      ) : (
        <img className='w-5' src='/assets_icon-error.svg'></img>
      );
    },
  },
  {
    id: 'actions',
    accessorKey: 'status',
    //header: 'Hành động',
    header: ({ column }) => {
      return <span className='font-bold text-black'>Hành động</span>;
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {/*             <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            {/*             <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copy payment ID</DropdownMenuItem> */}
            <DropdownMenuItem className='cursor-pointer' onClick={() => location.assign(`/tai-khoan/${user.id}`)}>
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={() => location.assign(`/tai-khoan/${user.id}/cap-nhat`)}>
              Chỉnh sửa
            </DropdownMenuItem>
            {/*             <DropdownMenuSeparator /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
