import axios from 'axios';
import { instance } from './axios/instances';
import { AxiosHttpClient } from './axios';

import { FilesServices } from './services/files';
import { OrderService } from './services/order';
import { AuthService } from '@/modules/user/services/user';
import { ProductServices } from '@/modules/product';
import { CartService } from '@/modules/cart/services/cart';

const axiosHttpClient = new AxiosHttpClient(instance);

export const api = {
  user: new AuthService(axiosHttpClient, axios),
  product: new ProductServices(axiosHttpClient),
  files: new FilesServices(axiosHttpClient),
  cart: new CartService(axiosHttpClient),
  order: new OrderService(axiosHttpClient),
};
