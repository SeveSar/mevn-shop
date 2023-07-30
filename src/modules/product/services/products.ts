import type { IProductResponse } from '@/types/responses/product';
import { ProductDTO, ProductFullDTO } from '../models/product.dto';
import type { IHttpClient } from '@/api/types/api';
import type { IProduct, IProductBase } from '@/types/IProduct';
import type { IFilterResponse } from '@/types/responses/filter';
import { FilterDTO } from '@/types/dtos/filter.dto';

export class ProductServices {
  private readonly $http: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.$http = httpClient;
  }

  async fetchProducts(filters?: string[]): Promise<IProductBase[]> {
    let res;
    if (filters && filters.length) {
      res = await this.$http.makeRequest<IProductBase[]>({
        url: '/products',
        method: 'GET',
        config: {
          params: { filters },
        },
      });
    } else {
      res = await this.$http.makeRequest<IProductBase[]>({
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

  async fetchProductById(id: string): Promise<ProductFullDTO> {
    const res = await this.$http.makeRequest<IProductResponse>({
      url: `/products/${id}`,
      method: 'GET',
      headers: {
        authorization: true,
      },
    });

    return new ProductFullDTO(res.data);
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
