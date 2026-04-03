import type { TFilterItem } from './IFilter';

export interface IProductBase {
  title: string
  price: number
  description: string
  imageUrl: string
  amount: number
  id: string
}

export interface IIngredientItemBase {
  price: number
  title: string
  img: string
}
export interface IProductFull extends IProductBase {
  id: string
  ingredients: IIngredientItem[]
  dough: IDoughItem[]
  sizes: ISizeItem[]
  filters: TFilterItem[]
  category: string
}

export interface IIngredientItem extends IIngredientItemBase {
  isActive: boolean
  id: string
}

export interface IDoughItem {
  id: string
  title: string
  price: number
}

export interface ISizeItem {
  id: string
  title: string
  price: number
  size: number
}
