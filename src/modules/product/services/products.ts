import type { IFilter } from "@/models/IFilter";
import type { IProduct } from "../../../models/IProduct";
import { ProductDTO } from "../models/product.dto";
import type { IHttpClient } from "@/api/types";

export default class ProductServices {
  private readonly $http: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.$http = httpClient;
  }

  async fetchProducts(filters?: string[]) {
    let res;
    if (filters && filters.length) {
      res = await this.$http.makeRequest<IProduct[]>({
        url: "/products",
        method: "GET",
        config: {
          params: { filters },
        },
      });
    } else {
      res = await this.$http.makeRequest<IProduct[]>({
        url: "/products",
        method: "GET",
        headers: {
          authorization: true,
        },
      });
    }

    return res.data.map((product) => {
      return new ProductDTO(product);
    });
  }

  async fetchProductFilters() {
    const res = await this.$http.makeRequest<IFilter[]>({
      url: "/filter",
      method: "GET",
      headers: {
        authorization: true,
      },
    });

    return res.data;
  }

  async createProduct(productData: IProduct) {
    const res = await this.$http.makeRequest<IProduct>({
      url: "/products",
      data: productData,
      method: "POST",
    });
    return res.data;
  }
}
