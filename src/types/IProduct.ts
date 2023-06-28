import { TFilterItem } from './IFilter';

export interface IProductBase {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  category: string;
}
export interface IProduct extends IProductBase {
  ingredients: IIngredientItem[];
  dough: IDoughItem[];
  sizes: ISizeItem[];
  filters: TFilterItem[];
}

export interface IProductMainPage {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
}

export interface IIngredientItem {
  isActive: boolean;
  img: string;
  id: string;
  price: number;
  title: string;
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
  size: number;
}
