import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { UserResponse } from '../../types/responses/user';
import { useUserStore } from '@/modules/user/stores/user';
import router from '@/router';
import { getAccessToken } from '@/utils/localstorage';
import axios from 'axios';
import { api } from '../api';

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}
interface ConfigImplements extends AxiosRequestConfig {
  _isRetry?: boolean
}
let refreshTokenRequest: Promise<UserResponse> | null = null;

async function errorHandler(error: AxiosError) {
  const userStore = useUserStore();
  const response = error.response;
  const config = error.config as ConfigImplements;

  if (!response) {
    return Promise.reject(new Error('Unknown Error'));
  }
  const { status } = response;
  switch (status) {
    case StatusCode.Unauthorized: {
      try {
        if (refreshTokenRequest === null) {
          refreshTokenRequest = api.user.refresh();
        }
        await refreshTokenRequest;
        refreshTokenRequest = null;
        if (config.headers) {
          config.headers.authorization = `Bearer ${getAccessToken()}`;
        }
        return axios(config);
      }
      catch (e) {
        userStore.logOut().then(() => {
          router.push('/login');
        });
      }
    }
  }
  return Promise.reject(error);
}

async function onResponseError(error: AxiosError) {
  return errorHandler(error);
}

function onResponseSuccess(successRes: AxiosResponse) {
  return successRes;
}

export default function (http: AxiosInstance) {
  http.interceptors.response.use(onResponseSuccess, onResponseError);
}
