import type { IProductResponse } from '@/types/responses/product';
import type { TFilterItem } from '@/types/IFilter';
import type { IDoughItem, IIngredientItem, ISizeItem } from '@/types/IProduct';

export class ProductDTO {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;

  constructor(model: IProductResponse) {
    this.id = model._id;
    this.title = model.title;
    this.price = model.price;
    this.description = model.description;
    this.imageUrl = model.imageUrl;
    this.amount = model.amount;
  }
}

export class ProductFullDTO {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  sizes: ISizeItem[];
  ingredients: IIngredientItem[];
  dough: IDoughItem[];
  filters: TFilterItem[];

  constructor(model: IProductResponse) {
    this.id = model._id;
    this.title = model.title;
    this.price = model.price;
    this.description = model.description;
    this.imageUrl = model.imageUrl;
    this.amount = model.amount;

    this.sizes = model.sizes.map((item) => {
      return {
        ...item,
        id: item._id,
      };
    });
    this.ingredients = model.ingredients.map((item) => {
      return {
        ...item,
        id: item._id,
        img: `${import.meta.env.VITE_BASE_URL}/${item.img}`,
        isActive: false,
      };
    });

    this.dough = model.dough.map((item) => {
      return {
        ...item,
        id: item._id,
      };
    });

    this.filters = model.filters.map((item) => {
      return {
        id: item._id,
        parent: item.parent,
        title: item.title,
      };
    });
  }
}
