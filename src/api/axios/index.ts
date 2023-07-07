import type { AxiosInstance, AxiosResponse } from 'axios';
import type { ApiResponse, IHttpClient, IOptions } from '../types/api';
import { getAccessToken } from '@/utils/tokenHelper';

export class AxiosHttpClient implements IHttpClient {
  private $http: AxiosInstance;
  constructor(axiosInstance: AxiosInstance) {
    this.$http = axiosInstance;
  }

  makeRequest<T>({ url, method, headers, data, config }: IOptions): Promise<ApiResponse<T>> {
    const options = {
      url,
      method,
      responseType: config?.responseType || 'json',
      ...config,
    } as IOptions;

    if (headers && headers.authorization) {
      headers.authorization = `Bearer ${getAccessToken()}`;
    }

    if (data) {
      options.data = data;
    }

    return this.$http.request({ ...options, headers });
  }
}
