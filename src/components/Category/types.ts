export type Category = {
  name: string;
  photo?: string;
};

export type CategoriesResponse = {
  data: Category[];
};
