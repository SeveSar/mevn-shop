import type { IDoughItem, IIngredientItem, IProduct, ISizeItem } from '@/types/IProduct';
import type { IProductResponse } from './product';

export interface IProductCart {
  product: Omit<IProductResponse, 'id'> & { _id: string };
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
