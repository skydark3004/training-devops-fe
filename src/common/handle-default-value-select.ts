import { DEFAULT_VAULE_SELECT } from '@/constants/constants';

export const convertDefaultValueSelect = <T>(value: T | undefined) => {
  if (!value) return undefined;
  return value === DEFAULT_VAULE_SELECT ? undefined : value;
};
