'use client';

import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const QueryParamNames = ['pageParam', 'pageSizeParam'] as const;

export type QueryStates = {
  [key in (typeof QueryParamNames)[number]]?: string;
};

export const useQueryStates = (): [QueryStates, Dispatch<SetStateAction<QueryStates>>] => {
  const initParams = useSearchParams();
  const [state, setState] = useState<QueryStates>(
    QueryParamNames.map((key) => (initParams?.get(key) ? { [key]: initParams.get(key) } : {})).reduce((acc, cur) => ({ ...acc, ...cur }), {}),
  );

  useEffect(() => {
    const params = new URLSearchParams();
    QueryParamNames.filter((key) => state[key]).forEach((key) => params.set(key, state[key]!));
    const url = params.size ? `?${params.toString()}` : '';
    window.history.replaceState(window.history.state, '', url);
  }, [state]);

  return [state, setState];
};
