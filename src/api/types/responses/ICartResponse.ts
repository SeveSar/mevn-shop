import type { IDoughItem, IIngredientItem, ISizeItem } from "@/models/IProduct";
import type { IDoughItemResponse, ISizeItemResponse } from "./IProductResponse";

export interface IProductCart {
  product: string;
  id: string;
  quantity: number;
  size: ISizeItem;
  dough: IDoughItem;
  ingredients: IIngredientItem[];
  totalPrice: number;
}

export interface ICartResponse {
  id: string;
  products: IProductCart[];
}
