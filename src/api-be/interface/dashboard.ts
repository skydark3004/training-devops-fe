export interface IGetOverview {
  total: {
    revenue: number;
    customers: number;
  };
  store: {
    revenue: number;
    customers: number;
  };
  bank: {
    revenue: number;
    customers: number;
  };
  average: number;
  today: {
    revenue: number;
    customers: number;
  };
}

export interface IBodyGetOverview {
  startDate: string;
  endDate: string;
}

export interface IBodyGetRevenueChart {
  year: number;
}
export interface IGetRevenueChart {
  month: number;
  total: number;
  totalBank: number;
  totalThroughStore: number;
}
