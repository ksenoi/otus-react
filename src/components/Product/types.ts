export type Product = {
  id: string;
  name?: string;
  photo?: string;
  desc?: string;
  oldPrice?: number;
  price?: number;
  categoryId?: string;
};

export type ProductsResponse = {
  data: Product[];
};
