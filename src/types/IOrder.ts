import type { IUser } from './IUser';
import type { IProductCartResponse } from './responses/cart';

import type { TOrderPayment, TOrderStatus, TOrderTypeDelivery, TOrderTypeTiming } from '@/constants';

export interface IOrder {
  _id: string
  user: IUser
  email: string | null
  name: string
  phone: string
  products: IProductCartResponse[]
  number: string
  status: TOrderStatus
  comment: string | null
  address: IOrderAddress | null
  typeDelivery: TOrderTypeDelivery
  typeTiming: TOrderTypeTiming
  timingDate: null | string
  restaurant: string | null
  payment: TOrderPayment
  createdAt: string
  updatedAt: string
}

export interface IOrderAddress {
  _id: string
  street: string
  house?: number | null
  porch?: number | null
  floor?: number | null
  flat?: number | null
  door_phone?: number | null
}

export type IOrderCreate = Partial<Pick<IOrder, 'restaurant'>> & { address?: Omit<IOrderAddress, '_id'> } & Pick<
  IOrder,
    'email' | 'name' | 'phone' | 'payment' | 'typeDelivery' | 'typeTiming' | 'timingDate' | 'comment'
>;
