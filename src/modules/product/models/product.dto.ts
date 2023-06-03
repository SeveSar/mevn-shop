import type { IProductResponse } from '@/api/types/responses/product';
import type { TFilterItem } from '@/models/IFilter';
import type { IIngredientItem, ISizeItem, IDoughItem } from '@/models/IProduct';

export class ProductDTO {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  category: string;
  sizes: ISizeItem[];
  ingredients: IIngredientItem[];
  dough: IDoughItem[];
  filters: TFilterItem[];

  constructor(model: IProductResponse) {
    this.id = model.id;
    this.title = model.title;
    this.price = model.price;
    this.description = model.description;
    this.imageUrl = model.imageUrl;
    this.amount = model.amount;
    this.category = model.category;

    this.sizes = model.sizes;

    this.ingredients = model.ingredients.map((item) => {
      return {
        ...item,
        id: item.id,
        img: import.meta.env.VITE_BASE_URL + '/' + item.img,
        isActive: false,
      };
    });

    this.dough = model.dough;

    this.filters = model.filters.map((item) => {
      return {
        id: item._id,
        parent: item.parent,
        title: item.title,
      };
    });
  }
}
