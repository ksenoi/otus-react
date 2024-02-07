export type Category = {
  name: string;
  photo?: string;
  id: string;
};

export type CategoriesResponse = {
  data: Category[];
};
