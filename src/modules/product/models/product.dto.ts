import type { IProductResponse } from "@/api/types/responses/IProductResponse";
import type { TFilterItem } from "@/models/IFilter";
import type { IIngredientItem, ISizeItem, IDoughItem } from "@/models/IProduct";

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

    this.sizes = model.sizes.map((size) => {
      return {
        ...size,
        price: size.price,
        id: size._id,
      };
    });

    this.ingredients = model.ingredients.map((item) => {
      return {
        ...item,
        id: item.id,
        img: import.meta.env.VITE_BASE_URL + "/" + item.img,
        isActive: false,
      };
    });

    this.dough = model.dough.map((dough) => {
      return {
        ...dough,
        id: dough._id,
      };
    });

    this.filters = model.filters.map((item) => {
      return {
        id: item._id,
        ...item,
      };
    });
  }
}
