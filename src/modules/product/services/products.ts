import type { IFilterResponse } from "@/api/types/responses/IFilterResponse";
import type { IProductResponse } from "@/api/types/responses/IProductResponse";
import { ProductDTO } from "../models/product.dto";
import type { IHttpClient } from "@/api/types/api";
import type { IProduct } from "@/models/IProduct";

export class ProductServices {
  private readonly $http: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.$http = httpClient;
  }

  async fetchProducts(filters?: string[]): Promise<IProduct[]> {
    let res;
    if (filters && filters.length) {
      res = await this.$http.makeRequest<IProductResponse[]>({
        url: "/products",
        method: "GET",
        config: {
          params: { filters },
        },
      });
    } else {
      res = await this.$http.makeRequest<IProductResponse[]>({
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
    const res = await this.$http.makeRequest<IFilterResponse[]>({
      url: "/filter",
      method: "GET",
      headers: {
        authorization: true,
      },
    });

    return res.data;
  }

  async createProduct(productData: IProductResponse) {
    const res = await this.$http.makeRequest<IFilterResponse>({
      url: "/products",
      data: productData,
      method: "POST",
    });
    return res.data;
  }
}
