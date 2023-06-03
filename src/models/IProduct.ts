import type { IProductResponse, IIngredientItemResponse } from '@/api/types/responses/product';
import { TFilterItem } from './IFilter';

export interface IProduct extends IProductResponse {
  ingredients: IIngredientItem[];
  dough: IDoughItem[];
  sizes: ISizeItem[];
  filters: TFilterItem[];
}

export interface IIngredientItem extends IIngredientItemResponse {
  isActive: boolean;
  img: string;
  id: string;
}

export interface IDoughItem {
  id: string;
  title: string;
  price: number;
}

export interface ISizeItem {
  id: string;
  title: string;
  price: number;
}
