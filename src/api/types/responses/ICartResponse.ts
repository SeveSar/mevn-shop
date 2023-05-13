import type { IDoughItemResponse, ISizeItemResponse } from "./IProductResponse";

interface IProductCart {
  product: string;
  _id: string;
  quantity: number;
  size: ISizeItemResponse;
  dough: IDoughItemResponse;
  ingredients: string[];
}

export interface ICartResponse {
  _id: string;
  quantity: number;
  totalPrice: number;
  products: IProductCart[];
}
