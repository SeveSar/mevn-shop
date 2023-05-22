import type { ICartResponse, IProductCart } from "@/api/types/responses/ICartResponse";
import type { IDoughItem, IIngredientItem, ISizeItem } from "@/models/IProduct";

export class CartDTO {
  totalPrice: number;
  id: string;
  quantity: number;
  size: ISizeItem;
  dough: IDoughItem;
  ingredients: IIngredientItem[];
  constructor(model: IProductCart) {
    this.totalPrice = model.totalPrice;
    this.id = model.product;
    this.quantity = model.quantity;
    this.size = model.size;
    this.dough = model.dough;
    this.ingredients = model.ingredients.map((item) => {
      return {
        ...item,
        isActive: false,
      };
    });
  }
}
