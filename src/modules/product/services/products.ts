import type { IProduct } from "../models/IProduct";
import type { AxiosInstance } from "axios";
import type { DataResponseProducts } from "@/types/DataResponseProducts";

export default class ProductServices {
  private readonly $axios: AxiosInstance;
  private readonly $http: AxiosInstance;
  constructor($http: AxiosInstance, $axios: AxiosInstance) {
    this.$axios = $axios;
    this.$http = $http;
  }
  async getAllProducts() {
    const res = await this.$axios.get<DataResponseProducts>(
      "http://localhost:3000/db/products.json"
    );
    return res.data;
  }

  async createProduct(productData: IProduct) {
    const formData = new FormData();

    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await this.$http.post<IProduct>("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
}
