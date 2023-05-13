import type {
  IProductResponse,
  IIngredientItemRersponse,
  IDoughItemResponse,
  ISizeItemResponse,
} from "@/api/types/responses/IProductResponse";

export interface IProduct extends IProductResponse {
  ingredients: IIngredientItem[];
  dough: IDoughItem[];
  sizes: ISizeItem[];
}

export interface IIngredientItem extends IIngredientItemRersponse {
  isActive: boolean;
  img: string;
  id: string;
}

export interface IDoughItem extends IDoughItemResponse {
  id: string;
}

export interface ISizeItem extends ISizeItemResponse {
  id: string;
}
