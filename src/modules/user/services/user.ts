import type { AxiosInstance } from 'axios';
import type { UserResponse } from '@/types/responses/user';
import type { IHttpClient } from '@/api/types/api';
import type { TCart } from '@/types/ICart';
import { setToken } from '@/utils/localstorage';

export class AuthService {
  private readonly $http: IHttpClient;
  private readonly $axios: AxiosInstance;

  constructor(httpClient: IHttpClient, axios: AxiosInstance) {
    this.$http = httpClient;
    this.$axios = axios;
  }

  async register(email: string, password: string) {
    const res = await this.$http.makeRequest<UserResponse>({
      url: '/auth/register',
      method: 'POST',
      data: {
        email,
        password,
      },
    });
    return res.data;
  }

  async login(email: string, password: string, cart: TCart | null) {
    const body = {
      email,
      password,
    } as { email: string, password: string, cart?: null | TCart };

    if (cart) {
      body.cart = cart;
    }
    const res = await this.$http.makeRequest<UserResponse>({
      url: '/auth/login',
      method: 'POST',
      data: body,
    });

    return res.data;
  }

  async refresh() {
    const { data } = await this.$axios.get<UserResponse>('api/auth/refresh', {
      baseURL: import.meta.env.VITE_BASE_URL,
      withCredentials: true,
    });
    setToken(data.accessToken);
    return data;
  }

  async logOut() {
    const res = await this.$axios.get('api/auth/logout', {
      baseURL: import.meta.env.VITE_BASE_URL,
      withCredentials: true,
    });
    return res;
  }
}
