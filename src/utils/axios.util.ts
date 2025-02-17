/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';

interface IInterceptor {
  request?: (config: any) => any;
  response?: {
    success: (response: any) => any;
    error: (error: any) => any;
  };
}

export class AxiosInstance {
  protected api;
  constructor(_url: string, _config: any, interceptor?: IInterceptor) {
    let defaultConfig = {
      baseURL: _url,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 0,
    };

    defaultConfig = Object.assign(defaultConfig, _config);
    this.api = axios.create(defaultConfig);

    if (interceptor?.request) {
      this.api.interceptors.request.use(interceptor?.request);
    }

    if (interceptor?.response) {
      this.api.interceptors.response.use(interceptor?.response.success, interceptor?.response?.error);
    }
  }

  async get(url: string, config: AxiosRequestConfig = {}): Promise<any> {
    const defaultConfig = {
      ...config,
    };
    const request = await this.api.get(url, defaultConfig);
    return request;
  }

  async post(url: string, body: any, config = {}): Promise<any> {
    const defaultConfig = {
      ...config,
    };
    const request = await this.api.post(url, body, defaultConfig);
    return request;
  }

  async put(url: string, body: any, config = {}): Promise<any> {
    const defaultConfig = {
      ...config,
    };
    const request = await this.api.put(url, body, defaultConfig);
    return request;
  }

  async patch(url: string, body: any, config = {}): Promise<any> {
    const defaultConfig = {
      ...config,
    };
    const request = await this.api.patch(url, body, defaultConfig);
    return request;
  }

  async _delete(url: string, config = {}): Promise<any> {
    const defaultConfig = {
      ...config,
    };
    const request = await this.api.delete(url, defaultConfig);
    return request;
  }
}
