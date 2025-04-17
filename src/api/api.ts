import { CartService } from '@/modules/cart/services/cart';
import { ProductServices } from '@/modules/product';
import { AuthService } from '@/modules/user/services/user';

import axios from 'axios';
import { AxiosHttpClient } from './axios';
import { instance } from './axios/instances';
import { initInterceptors } from './axios/interceptors';
import { FilesServices } from './services/files';
import { OrderService } from './services/order';

const axiosHttpClient = new AxiosHttpClient(instance, initInterceptors);

export const api = {
  user: new AuthService(axiosHttpClient, axios),
  product: new ProductServices(axiosHttpClient),
  files: new FilesServices(axiosHttpClient),
  cart: new CartService(axiosHttpClient),
  order: new OrderService(axiosHttpClient),
};
