import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './data-table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import PaginationCustom from './pagination';
import { Dispatch } from 'react';

interface IProps {
  data: any[];
  convertIdColumnToContent: any;
  columns: ColumnDef<any, any>[];
  totalPage: number;
  currentPage: number;
  paramsToQuery: any;
  setParamsToQuery: Dispatch<any>;
  listPageSize?: number[];
}

export function TablePagination({
  data,
  convertIdColumnToContent,
  columns,
  totalPage,
  currentPage,
  paramsToQuery,
  setParamsToQuery,
  listPageSize,
}: IProps) {
  const pageSizeOptions = listPageSize || [10, 15, 20, 5];

  return (
    <>
      <DataTable columns={columns} data={data} convertIdColumnToContent={convertIdColumnToContent} />
      <div className='mt-5 grid grid-cols-12'>
        <div className='col-span-1'>
          <Select
            onValueChange={(pageSize) => {
              setParamsToQuery({ ...paramsToQuery, pageSize, page: 1 });
            }}>
            <SelectTrigger className='w-[130px]'>
              <SelectValue placeholder={`${pageSizeOptions.at(0)}/Trang`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {pageSizeOptions.map((pageSize) => {
                  return (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                      {pageSize} / Trang
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='col-start-9 col-span-4'>
          <PaginationCustom
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={(page) => {
              setParamsToQuery({ ...paramsToQuery, page });
            }}
          />
        </div>
      </div>
    </>
  );
}
