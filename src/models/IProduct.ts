import type { TFilterItem } from "./IFilter";

export interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  category: string;
  sizes: ISizeItem[];
  dough: IDoughItem[];
  filters: TFilterItem[];
  ingredients: IIngredientItem[];
}

export interface IIngredientItem {
  img: string;
  title: string;
  price: number;
  _id: string;
}
export interface IDoughItem {
  _id: string;
  title: string;
  price: number;
}

export interface ISizeItem {
  title: string;
  price: number;
  _id: string;
}

export interface IIngredientItemDTO extends IIngredientItem {
  isActive: boolean;
  img: string;
}

export interface IDoughItemDTO extends IDoughItem {
  id: string;
}

export interface ISizeItemDTO extends ISizeItem {
  id: string;
}

export interface IProductDTO extends IProduct {
  ingredients: IIngredientItemDTO[];
  dough: IDoughItemDTO[];
  sizes: ISizeItemDTO[];
}
