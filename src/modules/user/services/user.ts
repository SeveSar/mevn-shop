import type { AxiosInstance } from "axios";
import type { UserResponse } from "@/api/types/responses/IUserResponse";
import type { IHttpClient } from "@/api/types/api";
import type { TCart } from "@/models/ICart";

export class AuthService {
  private readonly $http: IHttpClient;
  private readonly $axios: AxiosInstance;

  constructor(httpClient: IHttpClient, axios: AxiosInstance) {
    this.$http = httpClient;
    this.$axios = axios;
  }
  async register(email: string, password: string) {
    const res = await this.$http.makeRequest<UserResponse>({
      url: "/auth/register",
      method: "POST",
      data: {
        email,
        password,
      },
    });
    return res.data;
  }

  async login(email: string, password: string, cart: TCart) {
    const res = await this.$http.makeRequest<UserResponse>({
      url: "/auth/login",
      method: "POST",
      data: {
        email,
        password,
        cart,
      },
    });

    return res.data;
  }

  async refresh() {
    return this.$axios.get<UserResponse>("api/auth/refresh", {
      baseURL: import.meta.env.VITE_BASE_URL,
      withCredentials: true,
    });
  }

  async getUsers() {
    const res = await this.$http.makeRequest<any>({
      url: "/users",
      method: "GET",
    });
    return res.data;
  }
  async logOut() {
    const res = await this.$axios.get("api/auth/logout", {
      baseURL: import.meta.env.VITE_BASE_URL,
      withCredentials: true,
    });
    return res;
  }
}
