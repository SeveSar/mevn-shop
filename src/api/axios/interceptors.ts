import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import type { UserResponse } from '../../types/responses/user';
import { useUserStore } from '@/modules/user/stores/user';
import router from '@/router';
import { api } from '../api';
import { getAccessToken, setToken } from '@/utils/localstorage';

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}
interface ConfigImplements extends AxiosRequestConfig {
  _isRetry?: boolean;
}
let refreshTokenRequest: Promise<AxiosResponse<UserResponse>> | null = null;
const errorHandler = async (error: AxiosError) => {
  const userStore = useUserStore();
  const response = error.response;
  const config = error.config as ConfigImplements;

  if (!response) {
    return Promise.reject('Unknown Error');
  }
  const { status } = response;
  switch (status) {
    case StatusCode.Unauthorized: {
      try {
        if (refreshTokenRequest === null) {
          refreshTokenRequest = api.user.refresh();
        }
        const res = await refreshTokenRequest;
        refreshTokenRequest = null;
        setToken(res.data.accessToken);
        config.headers.authorization = `Bearer ${getAccessToken()}`;
        return axios(config);
      } catch (e) {
        userStore.logOut().then(() => {
          router.push('/login');
        });
      }
    }
  }
  return Promise.reject(error);
};

const onResponseError = async (error: AxiosError): Promise<AxiosResponse> => {
  return errorHandler(error);
};

const onResponseSuccess = (successRes: AxiosResponse): AxiosResponse => {
  return successRes;
};

export default function (http: AxiosInstance) {
  http.interceptors.response.use(onResponseSuccess, onResponseError);
}
