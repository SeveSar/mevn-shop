import type { TFilterItemResponse } from "./IFilterResponse";

export interface IProductResponse {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  category: string;
  sizes: ISizeItemResponse[];
  dough: IDoughItemResponse[];
  filters: TFilterItemResponse[];
  ingredients: IIngredientItemRersponse[];
}

export interface IIngredientItemRersponse {
  img: string;
  title: string;
  price: number;
  id: string;
}
export interface IDoughItemResponse {
  _id: string;
  title: string;
  price: number;
}

export interface ISizeItemResponse {
  _id: string;
  title: string;
  price: number;
}
