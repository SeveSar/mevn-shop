import type { AxiosInstance } from "axios";
import type { DataResponseProducts } from "@/types/DataResponseProducts";

export default class ProductServices {
  private readonly $axios: AxiosInstance;
  constructor($axios: AxiosInstance) {
    this.$axios = $axios;
  }
  async getAllProducts() {
    const res = await this.$axios.get<DataResponseProducts>("db/products.json");

    return res.data;
  }
}
