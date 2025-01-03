import type { IHttpClient } from '@/api/types/api';
import type { ICartResponse, IProductCartResponse } from '@/types/responses/cart';
import { CartDTO } from '../models/cart.dto';

export class CartService {
  private readonly $http: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.$http = httpClient;
  }

  async addToCart(id: string, dough: string, size: string, ingredients: string[]) {
    const res = await this.$http.makeRequest<ICartResponse>({
      url: '/basket',
      method: 'POST',

      data: {
        productId: id,
        size,
        dough,
        ingredients,
      },
      headers: { authorization: true },
    });

    return res.data;
  }

  async getCart() {
    const res = await this.$http.makeRequest<ICartResponse>({
      url: '/basket',
      method: 'GET',
      headers: { authorization: true },
    });

    return {
      ...res.data,
      products: res.data.products.map(item => new CartDTO(item)),
    };
  }

  async updateProduct({
    idProduct,
    updatedProduct,
  }: {
    idProduct: string
    updatedProduct: Partial<IProductCartResponse>
  }) {
    const res = await this.$http.makeRequest<ICartResponse>({
      url: `/basket/${idProduct}`,
      method: 'PATCH',
      headers: { authorization: true },
      data: updatedProduct,
    });

    return {
      ...res.data,
      products: res.data.products.map(item => new CartDTO(item)),
    };
  }

  async removeProduct(id: string) {
    const res = await this.$http.makeRequest<ICartResponse>({
      url: `/basket/${id}`,
      method: 'DELETE',
      headers: { authorization: true },
    });

    return {
      ...res.data,
      products: res.data.products.map(item => new CartDTO(item)),
    };
  }
}
