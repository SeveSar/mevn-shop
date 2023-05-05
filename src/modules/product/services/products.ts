import type { AxiosInstance } from "axios";
import type { IProduct } from "../../../models/IProduct";
import { ProductDTO } from "../models/product.dto";

export default class ProductServices {
  private readonly $http: AxiosInstance;

  constructor($http: AxiosInstance) {
    this.$http = $http;
  }

  async fetchProducts(filters: string[]) {
    let res;
    if (filters && filters.length) {
      res = await this.$http.get<IProduct[]>("/products", {
        params: { filters },
      });
    } else {
      res = await this.$http.get<IProduct[]>("/products");
    }

    return res.data.map((product) => {
      return new ProductDTO(product);
    });
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
