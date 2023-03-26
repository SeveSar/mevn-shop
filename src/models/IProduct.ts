import type { TFilterItem } from "./IFilter";

export interface IProduct {
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
}
