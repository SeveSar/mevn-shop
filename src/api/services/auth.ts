import type { AxiosInstance } from "axios";
import type { AuthResponse } from "@/models/response/AuthResponse";

class AuthService {
  private readonly $http: AxiosInstance;
  private readonly $axios: AxiosInstance;
  constructor(axiosInstance: AxiosInstance, axios: AxiosInstance) {
    this.$http = axiosInstance;
    this.$axios = axios;
  }
  async register(email: string, password: string) {
    const res = await this.$http.post<AuthResponse>("/auth/register", {
      email,
      password,
    });
    return res.data;
  }

  async login(email: string, password: string) {
    const res = await this.$http.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    return res.data;
  }
  async refresh() {
    return this.$axios.get<AuthResponse>("/auth/refresh", {
      baseURL: import.meta.env.VITE_BASE_URL,
      withCredentials: true,
    });
  }

  async getUsers() {
    const res = await this.$http.get<any>("/users");
    return res.data;
  }
  async logOut() {
    const res = await this.$axios.get("/auth/logout", {
      baseURL: import.meta.env.VITE_BASE_URL,
      withCredentials: true,
    });
    return res;
  }
}
export default AuthService;
