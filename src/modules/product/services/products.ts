import type { AxiosInstance } from "axios";
import type { IProduct } from "../models/IProduct";

export default class ProductServices {
  private readonly $axios: AxiosInstance;
  private readonly $http: AxiosInstance;

  constructor($http: AxiosInstance, $axios: AxiosInstance) {
    this.$axios = $axios;
    this.$http = $http;
  }
  async fetchProducts() {
    const res = await this.$http.get<IProduct>("/products");
    return res.data;
  }
  async fetchProductFilters() {
    const res = await this.$http.get("/filter");
    return res.data;
  }
  async createProduct(productData: IProduct) {
    const res = await this.$http.post<IProduct>("/products", productData);
    return res.data;
  }
}
