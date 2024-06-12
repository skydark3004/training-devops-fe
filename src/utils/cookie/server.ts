import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export const CookieUtilsServer = {
  add(key: string, value: any, options: Partial<ResponseCookie>) {
    return cookies().set(key, value, options);
  },
  remove(key: string) {
    return cookies().delete(key);
  },
  get(key: string) {
    return cookies().get(key);
  },
  hasCookie(key: string) {
    return cookies().has(key);
  },
};
