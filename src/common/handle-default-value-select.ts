import { DEFAULT_VAULE_SELECT } from '@/constants/constants';

export const convertDefaultValueSelect = (value: any) => {
  if (!value || value === DEFAULT_VAULE_SELECT) return undefined;
  return value;
};
