import { AxiosInstance } from '@/utils/axios.util';
import { APP_CONFIG } from '@/config/app.config';
import { CookieUtilsClient } from '@/utils/cookie/client';

const interceptorRequest = async (config: any) => {
  const token = CookieUtilsClient.get(APP_CONFIG.ENV.KEY_ACCESS_TOKEN);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

export const instanceClient = new AxiosInstance(APP_CONFIG.ENV.BASE_URL_BACK_END, {}, { request: interceptorRequest });
