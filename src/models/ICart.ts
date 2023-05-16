import type { IDoughItem, ISizeItem } from "./IProduct";
interface ICartItem {
  totalPrice: number;
  _id?: string;
  quantity: number;
  size: ISizeItem | undefined;
  dough: IDoughItem | undefined;
  ingredients: string[];
}

export type TCart = ICartItem[];
