import type { IProductResponse } from './product';
import type { IDoughItem, IIngredientItem, ISizeItem } from '@/types/IProduct';

export interface IProductCartResponse {
  product: IProductResponse
  basket: string
  _id: string
  quantity: number
  size: ISizeItem
  dough: IDoughItem
  ingredients: IIngredientItem[]
  totalPrice: number
}

export interface ICartResponse {
  id: string
  products: IProductCartResponse[]
}
