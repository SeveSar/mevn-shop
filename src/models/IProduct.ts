import type { TFilterItem } from "./IFilter";

export interface IProductDTO {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  sizes: [
    {
      title: string;
      price: number;
      _id: string;
    }
  ];
  category: string;
  dough: [
    {
      _id: string;
      title: string;
      price: number;
    }
  ];
  filters: TFilterItem[];
  ingredients: [
    {
      img: string;
      title: string;
      price: number;
      _id: string;
    }
  ];
}

export interface IProduct extends IProductDTO {
  ingredients: [
    {
      img: string;
      title: string;
      price: number;
      _id: string;
      id: string;
      isActive: boolean;
    }
  ];
  dough: [
    {
      _id: string;
      id: string;
      title: string;
      price: number;
    }
  ];
  sizes: [
    {
      title: string;
      price: number;
      _id: string;
      id: string;
    }
  ];
}
