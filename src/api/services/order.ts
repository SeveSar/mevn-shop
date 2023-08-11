import { IHttpClient } from '../types/api';

export class OrderService {
  $http: IHttpClient;
  constructor(httpClient: IHttpClient) {
    this.$http = httpClient;
  }

  async createOrder(body: any) {
    const res = await this.$http.makeRequest({
      url: '/order',
      method: 'POST',
      data: body,
      headers: { authorization: true },
    });
    return res.data;
  }

  async getOrders() {
    const res = await this.$http.makeRequest({
      url: '/order',
      method: 'GET',
      headers: { authorization: true },
    });
    console.log(res.data, 'data,');

    return res.data;
  }
}
