import type { IDoughItem, IIngredientItem, ISizeItem } from "./IProduct";
interface ICartItem {
  totalPrice: number;
  id: string;
  quantity: number;
  size: ISizeItem;
  dough: IDoughItem;
  ingredients: IIngredientItem[];
}

export type TCart = ICartItem[];
