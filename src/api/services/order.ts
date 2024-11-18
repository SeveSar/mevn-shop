import type { IHttpClient } from '../types/api';
import { OrderDTO } from './../../models/order.dto';
import type { IOrder, IOrderCreate } from '@/types/IOrder';

export class OrderService {
  $http: IHttpClient;
  constructor(httpClient: IHttpClient) {
    this.$http = httpClient;
  }

  async createOrder(body: IOrderCreate) {
    const res = await this.$http.makeRequest<{ message: string }>({
      url: '/order',
      method: 'POST',
      data: body,
      headers: { authorization: true },
    });
    return res.data;
  }

  async getOrders({ page }: { page: number }) {
    const res = await this.$http.makeRequest<{ items: IOrder[], total: number, currentPage: number }>({
      url: '/order',
      method: 'GET',
      headers: { authorization: true },
      config: {
        params: { page },
      },
    });

    return {
      items: res.data.items.map(order => new OrderDTO(order)),
      total: res.data.total,
      currentPage: res.data.currentPage,
    };
  }
}
