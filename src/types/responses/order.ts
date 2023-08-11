import { TOrderPayment, TOrderStatus, TOrderTypeDelivery, TOrderTypeTiming } from '@/constants';
import { IUser } from '../IUser';
import { IProductCart } from '../responses/cart';

export interface IOrderItem {
  _id: string;
  user: IUser;
  email: string | null;
  name: string;
  phone: string;
  products: IProductCart[];
  number: string;
  status: TOrderStatus;
  comment: string | null;
  address: IOrderAddress | null;
  typeDelivery: TOrderTypeDelivery;
  typeTiming: TOrderTypeTiming;
  timingDate: null | string;
  restaurant: string | null;
  payment: TOrderPayment;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderAddress {
  _id: string;
  street: string;
  house?: string;
  porch?: number;
  floor?: number;
  flat?: number;
  door_phone?: number;
}
