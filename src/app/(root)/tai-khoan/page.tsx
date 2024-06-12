'use client';
import { BreadcrumbWithCustomSeparator } from '@/components/custom/BreadcrumbWithCustomSeparator';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { DataTable } from '../../../components/custom/data-table';
import { columns, convertIdColumnToContent } from './(handle-tai-khoan)/column';
import FilterUser from './(handle-tai-khoan)/filter.component';
import { ILoading, useLoadingStore } from '@/store';
import useSWR from 'swr';
import { getListUsers } from '@/api-be/client/user/user.api';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ToastError, convertDefaultValueSelect } from '@/common';
import { formatListUsers } from './(handle-tai-khoan)/helper';
import { getAllPermissions } from '@/api-be/client/permission/permission.api';
import { IQueryParamsGetListUsers } from '@/api-be/client/user/user.interface';
import { StatusEnum } from '@/constants/enum';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

import PaginationCustom from '@/components/custom/pagination';
import { OPTIONS_FETCHER_ONLY_GET_ONE_TIME } from '@/config/swr.config';

export default function AccountPage() {
  const setLoading = useLoadingStore((state: ILoading) => state.setIsLoading);

  const [permissions, setPermissions] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  const inputSearchUsername = useRef<undefined | string>(undefined);
  function handleOnChangeSearchUsername(event: ChangeEvent<HTMLInputElement>) {
    inputSearchUsername.current = event.target.value;
  }

  const inputSearchPhoneNumber = useRef<undefined | string>(undefined);
  function handleOnChangeSearchPhoneNumber(event: ChangeEvent<HTMLInputElement>) {
    inputSearchPhoneNumber.current = event.target.value;
  }

  const selectStatusRef = useRef<undefined | StatusEnum>(undefined);
  function handleSelectOnChangeStatus(status: StatusEnum) {
    selectStatusRef.current = status;
  }

  const selectPageSizeRef = useRef<string>('10');
  function handleSelectOnChangePageSize(pageSize: string) {
    selectPageSizeRef.current = pageSize;
    getUsers.mutate(() => {
      setLoading(false);
    });
    setLoading(true);
  }

  const selectPermissionRef = useRef<undefined | string>(undefined);
  function handleSelectOnChangePermissions(id: string) {
    selectPermissionRef.current = id;
  }

  // PERMISSIONS
  const getPermissions = useSWR(getAllPermissions.key, getAllPermissions.fetch, {
    ...OPTIONS_FETCHER_ONLY_GET_ONE_TIME,
    onSuccess(data, key, config) {
      setPermissions(data.data);
    },
    onError(err, key, config) {
      ToastError(err.message);
    },
  });

  // USER
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const handlePageChange = (page: number) => {
    setPage(page);
    /*     getUsers.mutate(() => setLoading(false));
    setLoading(true); */
  };

  const getUsers = useSWR(
    getListUsers.key,
    (url) => {
      const queryParams: IQueryParamsGetListUsers = {
        username: inputSearchUsername.current,
        phoneNumber: inputSearchPhoneNumber.current,
        status: convertDefaultValueSelect(selectStatusRef.current),
        permissionId: convertDefaultValueSelect(selectPermissionRef.current),
        pageSize: selectPageSizeRef.current,
        page: page,
      };
      return getListUsers.fetch(url, queryParams);
    },
    {
      ...OPTIONS_FETCHER_ONLY_GET_ONE_TIME,
      onSuccess(data, key, config) {
        const formatData = formatListUsers(data);
        setDataUser(formatData);
        setTotalPage(data.totalPage);
      },
      onError(err, key, config) {
        ToastError(err.message);
      },
    },
  );

  function handleClickButtonSearch() {
    setPage(1);
    getUsers.mutate(() => setLoading(false));
    setLoading(true);
  }

  useEffect(() => {
    if (getUsers.isLoading || getPermissions.isLoading) {
      setLoading(true);
    }
    if (getUsers.data && getPermissions.data) {
      setLoading(false);
    }
  }, [getPermissions.isLoading, getUsers.isLoading]);

  useEffect(() => {
    if (getUsers.data) {
      getUsers.mutate(() => setLoading(false));
      setLoading(true);
    }
  }, [page]);

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
              <span className='font-bold text-black'>Danh sách người dùng</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbWithCustomSeparator>
      </div>

      <h1 className='font-bold text-2xl mt-2'>Danh sách người dùng</h1>

      <FilterUser
        listPermissions={permissions}
        handleSelectOnChangePermissions={handleSelectOnChangePermissions}
        handleSelectOnChangeStatus={handleSelectOnChangeStatus}
        handleOnChangeSearchUsername={handleOnChangeSearchUsername}
        handleOnChangeSearchPhoneNumber={handleOnChangeSearchPhoneNumber}
        handleClickButtonSearch={handleClickButtonSearch}
      />

      <div className='bg-white rounded-xl mt-5 shadow-[0px_0px_10px_0px_silver] p-5'>
        <div className='ml-5 mr-5'>
          <DataTable columns={columns} data={dataUser} convertIdColumnToContent={convertIdColumnToContent} />
          <div className='mt-5 grid grid-cols-12'>
            <div className='col-span-1'>
              <Select onValueChange={handleSelectOnChangePageSize}>
                <SelectTrigger className='w-[130px]'>
                  <SelectValue placeholder='10/Trang' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={'10'}>10/Trang</SelectItem>
                    <SelectItem value={'15'}>15/Trang</SelectItem>
                    <SelectItem value={'20'}>20/Trang</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/*             <div className='col-start-2 col-span-1'>
              <Input placeholder='Số trang' type='number' />
            </div> */}
            <div className='col-start-10 col-span-3'>
              <PaginationCustom currentPage={page} totalPage={totalPage} onPageChange={handlePageChange}></PaginationCustom>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
