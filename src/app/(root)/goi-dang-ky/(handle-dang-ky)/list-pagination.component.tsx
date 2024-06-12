'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusEnum } from '@/constants/enum';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { DataTable } from '@/components/custom/data-table';
import { columns, convertIdColumnToContent } from './column';
import PaginationCustom from '@/components/custom/pagination';
import FilterPermissions from './filter-permission';
import useSWR from 'swr';
import { getListPermissions } from '@/api-be/client/permission/permission.api';
import { IQueryParamsGetPermisions } from '@/api-be/client/permission/permission.interface';
import { ToastError, convertDefaultValueInputString, convertDefaultValueSelect } from '@/common';
import { OPTIONS_FETCHER_ONLY_GET_ONE_TIME } from '@/config/swr.config';
import { ILoading, useLoadingStore } from '@/store';
import { formatListPermissions } from './helper';

interface IProps {}

export default function ListPermissions(props: IProps) {
  const setLoading = useLoadingStore((state: ILoading) => state.setIsLoading);
  const [listPermissions, setListPermissions] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const inputSearchName = useRef<string>('');
  function handleOnChangeSearchName(event: ChangeEvent<HTMLInputElement>) {
    inputSearchName.current = event.target.value;
  }

  const selectStatusRef = useRef<undefined | StatusEnum>(undefined);
  function handleSelectOnChangeStatus(status: StatusEnum) {
    selectStatusRef.current = status;
  }

  const selectDetailPermissionsRef = useRef<any[]>([]);
  function handleSelectOnChangeDetailPermissions(details: any) {
    selectDetailPermissionsRef.current = details;
  }

  const handleOnClickSearchButton = async () => {
    setPage(1);
    await requestToGetListPermissions();
  };

  const requestToGetListPermissions = async () => {
    try {
      setLoading(true);
      const result = await getAllPermissions.mutate();
      setListPermissions(formatListPermissions(result));
    } catch (error: any) {
      ToastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const selectPageSizeRef = useRef<string>('10');
  function handleSelectOnChangePageSize(pageSize: string) {
    selectPageSizeRef.current = pageSize;
    setPage(1);
  }

  const getAllPermissions = useSWR(
    getListPermissions.key,
    (url) => {
      const queryParams: IQueryParamsGetPermisions = {
        name: convertDefaultValueInputString(inputSearchName.current),
        permissionCodes: selectDetailPermissionsRef.current.length ? JSON.stringify(selectDetailPermissionsRef.current) : undefined,
        status: convertDefaultValueSelect(selectStatusRef.current),
        pageSize: selectPageSizeRef.current,
        page: page,
      };
      return getListPermissions.fetch(url, queryParams);
    },
    {
      ...OPTIONS_FETCHER_ONLY_GET_ONE_TIME,
      onSuccess(data, key, config) {
        setListPermissions(formatListPermissions(data));
        setTotalPage(data.totalPage);
      },
      onError(err, key, config) {
        ToastError(err.message);
      },
    },
  );

  useEffect(() => {
    setLoading(getAllPermissions.isLoading);
  }, [getAllPermissions.isLoading]);

  useEffect(() => {
    if (getAllPermissions.data) {
      requestToGetListPermissions();
    }
  }, [page]);

  return (
    <>
      <FilterPermissions
        handleOnClickSearchButton={handleOnClickSearchButton}
        handleOnChangeSearchName={handleOnChangeSearchName}
        handleSelectOnChangeStatus={handleSelectOnChangeStatus}
        handleSelectOnChangeDetailPermissions={handleSelectOnChangeDetailPermissions}
      />

      <div className='bg-white rounded-xl mt-5 shadow-[0px_0px_10px_0px_silver] p-5'>
        <div className='ml-5 mr-5'>
          <DataTable columns={columns(getAllPermissions.mutate)} data={listPermissions} convertIdColumnToContent={convertIdColumnToContent} />
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
                    <SelectItem value={'5'}>5/Trang</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='col-start-10 col-span-3'>
              {<PaginationCustom currentPage={page} totalPage={totalPage} onPageChange={setPage}></PaginationCustom>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
