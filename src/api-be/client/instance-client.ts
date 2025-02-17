import { AxiosInstance } from '@/utils/axios.util';
import { APP_CONFIG } from '@/config/app.config';
import { CookieUtilsClient } from '@/utils/cookie/client';
import { AxiosError } from 'axios';

const interceptorRequest = async (config: any) => {
  const token = CookieUtilsClient.get(APP_CONFIG.ENV.KEY_ACCESS_TOKEN);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const interceptorResponseSucess = async (value: any) => {
  return value.data;
};

const interceptorResponseError = async (error: AxiosError) => {
  if (error.response?.status === 500 || error.code === 'ERR_NETWORK') {
    throw new Error('Đã có lỗi xảy ra');
  }

  const responseError = error?.response?.data;
  throw responseError;
};

export const instanceClient = new AxiosInstance(
  APP_CONFIG.ENV.BASE_URL_BACK_END,
  {},
  {
    request: interceptorRequest,
    response: {
      success: interceptorResponseSucess,
      error: interceptorResponseError,
    },
  },
);
