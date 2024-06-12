import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';

export const CookieUtilsClient = {
  add(key: string, value: any, options?: OptionsType) {
    return setCookie(key, value, options);
  },
  remove(key: string) {
    return deleteCookie(key);
  },
  get(key: string) {
    return getCookie(key);
  },
  hasCookie(key: string) {
    return hasCookie(key);
  },
};
