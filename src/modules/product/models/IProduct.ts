export interface IProduct {
  id?: string;
  title: string;
  price: number | null;
  description: string;
  imageUrl: string | File | null;
  amount: number | null;
  sizes: number[];
  category: string;
  dough: number[];
  filters: string[];
}
