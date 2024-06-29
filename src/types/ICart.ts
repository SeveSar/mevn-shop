import type { IDoughItem, IIngredientItem, ISizeItem } from './IProduct';

export interface ICartItem {
  totalPrice: number
  id: string
  quantity: number
  size: ISizeItem
  dough: IDoughItem
  ingredients: IIngredientItem[]
  title: string
  imageUrl: string
  basket?: string
}

export type TCart = ICartItem[];
