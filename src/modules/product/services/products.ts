import type { IHttpClient } from '@/api/types/api';
import type { IProductFull } from '@/types/IProduct';
import type { IFilterResponse } from '@/types/responses/filter';
import type { IProductResponse } from '@/types/responses/product';
import { FilterDTO } from '@/models/filter.dto';
import { ProductDTO, ProductFullDTO } from '../models';

export class ProductServices {
  private readonly $http: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.$http = httpClient;
  }

  async fetchProducts(filters?: string[]) {
    let res;
    if (filters && filters.length) {
      res = await this.$http.makeRequest<IProductResponse[]>({
        url: '/products',
        method: 'GET',
        config: {
          params: { filters },
        },
      });
    }
    else {
      res = await this.$http.makeRequest<IProductResponse[]>({
        url: '/products',
        method: 'GET',
        headers: {
          authorization: true,
        },
      });
    }
    console.log(res, 'rerere');
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

    return res.data.map(item => new FilterDTO(item));
  }

  async createProduct(productData: IProductFull) {
    const res = await this.$http.makeRequest<any>({
      url: '/products',
      data: productData,
      method: 'POST',
    });
    return res.data;
  }
}
