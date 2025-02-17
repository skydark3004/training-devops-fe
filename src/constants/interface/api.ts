export interface IGetDetailByIdBase {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
}

export interface IQueryParamsBase {
  pageSize?: number | string;
  page?: number;
}

export interface IGetListPaginationBase {
  totalItems: number;
  page: number;
  pageSize: number | string;
  totalPage: number;
}
