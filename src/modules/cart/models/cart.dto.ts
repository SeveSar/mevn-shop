import type { ICartResponse, IProductCart } from '@/types/responses/cart';
import type { IDoughItem, IIngredientItem, ISizeItem } from '@/types/IProduct';

export class CartDTO {
  title: string;
  totalPrice: number;
  id: string;
  quantity: number;
  size: ISizeItem;
  dough: IDoughItem;
  imageUrl: string;
  ingredients: IIngredientItem[];
  constructor(model: IProductCart) {
    console.log(model, 'model');
    this.title = model.product.title;
    this.imageUrl = model.product.imageUrl;
    this.totalPrice = model.totalPrice;
    this.id = model.product._id;
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
