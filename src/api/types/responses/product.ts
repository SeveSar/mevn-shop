import { IDoughItem, ISizeItem } from '@/models/IProduct';
import type { TFilterItemResponse } from './filter';

export interface IProductResponse {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  category: string;
  sizes: ISizeItem[];
  dough: IDoughItem[];
  filters: TFilterItemResponse[];
  ingredients: IIngredientItemResponse[];
}

export interface IIngredientItemResponse {
  img: string;
  title: string;
  price: number;
  id: string;
}
