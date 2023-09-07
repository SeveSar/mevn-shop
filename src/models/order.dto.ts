import { ORDER_PAYMENT_MAP } from './../constants';
import { IProductCartResponse } from '@/types/responses/cart';
import { ORDER_STATUS_MAP, TOrderPayment, TOrderStatus, TOrderTypeDelivery, TOrderTypeTiming } from '@/constants';
import { IDoughItem, IIngredientItem, ISizeItem } from '@/types/IProduct';
import { IUser } from '@/types/IUser';
import type { IOrderAddress, IOrder } from '@/types/IOrder';
import { IProductResponse } from '@/types/responses/product';

export class OrderDTO {
  _id: string;
  user: IUser;
  email: string | null;
  name: string;
  phone: string;
  products: OrderProductDTO[];
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

  constructor(model: IOrder) {
    Object.assign(this, model);
    this.products = model.products.map((item) => {
      return new OrderProductDTO(item);
    });
  }

  getPaymentTitle() {
    return ORDER_PAYMENT_MAP[this.payment];
  }

  getStatusTitle() {
    return ORDER_STATUS_MAP[this.status];
  }
}

export class OrderProductDTO {
  product: IProductResponse;
  id: string;
  quantity: number;
  size: ISizeItem;
  dough: IDoughItem;
  ingredients: IIngredientItem[];
  totalPrice: number;
  imageUrl: string;
  basket: string;
  title: string;

  constructor(model: IProductCartResponse) {
    this.product = model.product;
    this.basket = model.basket;
    this.id = model._id;
    this.title = model.product.title;
    this.totalPrice = model.totalPrice;
    this.quantity = model.quantity;
    this.dough = model.dough;
    this.ingredients = model.ingredients;
    this.size = model.size;
    this.imageUrl = model.product.imageUrl;

    console.log(model.product.imageUrl, 'fff');
  }
}
