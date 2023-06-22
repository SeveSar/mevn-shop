import type { IProductResponse } from '@/types/responses/product';
import { ProductDTO, ProductOneDTO } from '../models/product.dto';
import type { IHttpClient } from '@/api/types/api';
import type { IProduct, IProductMainPage } from '@/types/IProduct';
import { IFilterResponse } from '@/types/responses/filter';
import { FilterDTO } from '@/types/dtos/filter.dto';

export class ProductServices {
  private readonly $http: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.$http = httpClient;
  }

  async fetchProducts(filters?: string[]): Promise<IProductMainPage[]> {
    let res;
    if (filters && filters.length) {
      res = await this.$http.makeRequest<IProductMainPage[]>({
        url: '/products',
        method: 'GET',
        config: {
          params: { filters },
        },
      });
    } else {
      res = await this.$http.makeRequest<IProductMainPage[]>({
        url: '/products',
        method: 'GET',
        headers: {
          authorization: true,
        },
      });
    }

    return res.data.map((product) => {
      return new ProductDTO(product);
    });
  }

  async fetchProduct(id: string): Promise<IProduct> {
    console.log(id, 'id');
    const res = await this.$http.makeRequest<IProductResponse>({
      url: `/products/${id}`,
      method: 'GET',
      headers: {
        authorization: true,
      },
    });

    return new ProductOneDTO(res.data);
  }

  async fetchProductFilters() {
    const res = await this.$http.makeRequest<IFilterResponse[]>({
      url: '/filter',
      method: 'GET',
      headers: {
        authorization: true,
      },
    });

    return res.data.map((item) => new FilterDTO(item));
  }

  async createProduct(productData: IProductResponse) {
    const res = await this.$http.makeRequest<any>({
      url: '/products',
      data: productData,
      method: 'POST',
    });
    return res.data;
  }
}
