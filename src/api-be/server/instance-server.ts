import { AxiosInstance } from '@/utils/axios.util';
import ENV from '@/config/env.config';
import { APP_CONFIG } from '@/config/app.config';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

const interceptorRequest = async (config: any) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(APP_CONFIG.ENV.KEY_ACCESS_TOKEN);
  const token = cookie?.value;

  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const interceptorResponseSucess = async (value: any) => {
  return value.data;
};

const interceptorResponseError = async (error: any) => {
  return notFound();
};

export const instanceServer = new AxiosInstance(
  ENV.BASE_URL_BACK_END,
  {},
  {
    request: interceptorRequest,
    response: {
      success: interceptorResponseSucess,
      error: interceptorResponseError,
    },
  },
);
