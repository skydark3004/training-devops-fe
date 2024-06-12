'use client';

import { Button } from '@/components/ui/button';
import { PermissionEnum } from '@/constants/enum';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { VALUE_TO_LABEL_PERMISSIONS } from './helper';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import UpdatePermissionForm from './update-permission.component';

export type Permission = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  details: any[];
};

export const convertIdColumnToContent: any = {
  name: 'Tên',
  createdAt: 'Ngày tạo',
  status: 'Trạng thái',
  details: 'Quyền hạn',
  actions: 'Hành động',
};

export const columns = (refreshData: () => void): ColumnDef<Permission>[] => {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button className='m-[-20px] text-black' variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            <span className='font-bold'>Tên</span>
            <ArrowUpDown className='h-4' />
          </Button>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return <span className='font-bold text-black'>Ngày tạo</span>;
      },
    },
    {
      accessorKey: 'details',
      header: ({ column }) => {
        return <span className='font-bold text-black'>Quyền hạn</span>;
      },
      cell: ({ row }) => {
        const value: any = row.getValue('details');
        const formatDetails = value.map((detail: PermissionEnum) => {
          return <p>{VALUE_TO_LABEL_PERMISSIONS[detail]}</p>;
        });
        return formatDetails;
      },
    },
    {
      accessorKey: 'status',
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
      header: ({ column }) => {
        return <span className='font-bold text-black'>Hành động</span>;
      },
      cell: ({ row }) => {
        const permission = row.original;

        return (
          <Dialog>
            <DialogTrigger asChild className='cursor-pointer'>
              <span>Chỉnh sửa</span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Chỉnh sửa nhóm quyền hạn</DialogTitle>
                <UpdatePermissionForm dataPermission={permission} refreshData={refreshData}>
                  <DialogClose asChild>
                    <Button className='bg-blue-600' type='submit'>
                      Lưu
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type='button' className='bg-gray-400'>
                      Hủy
                    </Button>
                  </DialogClose>
                </UpdatePermissionForm>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];
};
