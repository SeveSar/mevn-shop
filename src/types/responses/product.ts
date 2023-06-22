import { IDoughItem, IIngredientItem, IProduct, ISizeItem, IProductBase } from '@/types/IProduct';
import { TFilterItemResponse } from './filter';

export interface IProductResponse extends IProductBase {
  sizes: ISizeItem[];
  dough: IDoughItem[];
  filters: TFilterItemResponse[];
  ingredients: Omit<IIngredientItem, 'isActive'>[];
}
