import type { IDoughItem, ISizeItem } from "./IProduct";
interface ICartItem {
  price: number;
  id: string;
  quantity: number;
  size: ISizeItem | undefined;
  dough: IDoughItem | undefined;
  ingredients: string[];
}

export type TCart = ICartItem[];
