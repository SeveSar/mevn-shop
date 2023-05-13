import type { IHttpClient } from "@/api/types/api";
import type { ICartResponse } from "@/api/types/responses/ICartResponse";

export class CartService {
  private readonly $http: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.$http = httpClient;
  }

  async addToCart(id: string, dough: string, size: string, ingredients: string[]) {
    const res = await this.$http.makeRequest<ICartResponse>({
      url: "/basket",
      method: "POST",

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
      url: "/basket",
      method: "GET",
      headers: { authorization: true },
    });

    return res.data;
  }
}
