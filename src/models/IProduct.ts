export interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  sizes: number[];
  category: string;
  dough: number[];
  filters: TFilterItem[];
}

export type TFilterItem = {
  name: string;
  _id: string;
};
