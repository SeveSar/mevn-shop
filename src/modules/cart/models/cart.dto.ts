import type { IDoughItem, IIngredientItem, ISizeItem } from '@/types/IProduct';
import type { IProductCartResponse } from '@/types/responses/cart';
import type { IProductResponse } from '@/types/responses/product';

export class CartDTO {
  title: string;
  totalPrice: number;
  id: string;
  quantity: number;
  size: ISizeItem;
  dough: IDoughItem;
  imageUrl: string;
  product: IProductResponse;
  ingredients: IIngredientItem[];
  basket: string;
  constructor(model: IProductCartResponse) {
    this.title = model.product.title;
    this.basket = model.basket;
    this.product = model.product;
    this.imageUrl = model.product.imageUrl;
    this.totalPrice = model.totalPrice;
    this.id = model.product._id;
    this.quantity = model.quantity;
    this.size = model.size;
    this.dough = model.dough;
    this.ingredients = model.ingredients;
  }
}
