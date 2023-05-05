import type {
  IProduct,
  IIngredientItemDTO,
  ISizeItemDTO,
  IDoughItemDTO,
} from "@/models/IProduct";

export class ProductDTO {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  sizes: ISizeItemDTO[];
  ingredients: IIngredientItemDTO[];
  dough: IDoughItemDTO[];

  constructor(model: IProduct) {
    this.id = model.id;
    this.title = model.title;
    this.price = model.price;
    this.description = model.description;
    this.imageUrl = model.imageUrl;
    this.amount = model.amount;
    this.sizes = model.sizes.map((size) => {
      return {
        ...size,
        id: size._id,
      };
    });

    this.ingredients = model.ingredients.map((item) => {
      return {
        ...item,
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
  }
}
