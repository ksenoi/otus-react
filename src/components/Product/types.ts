import { Category } from "../Category/types";

export type Product = {
  id?: string;
  name: string;
  photo?: string;
  desc?: string;
  createdAt?: Date;
  updatedAt?: Date;
  oldPrice?: number;
  price: number;
  category: Category;
  categoryId: string;
};

export type ProductsResponse = {
  data: Product[];
};
