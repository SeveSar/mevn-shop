import type { TFilterItemResponse } from './filter';
import type { IDoughItem, IIngredientItemBase, IProductBase, ISizeItem } from '@/types/IProduct';

export interface IProductResponse extends IProductBase {
  _id: string
  sizes: (Omit<ISizeItem, 'id'> & { _id: string })[]
  dough: (Omit<IDoughItem, 'id'> & { _id: string })[]
  filters: TFilterItemResponse[]
  ingredients: (IIngredientItemBase & { _id: string })[]
}
