export type Category = {
  name: string;
  photo?: string;
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CategoriesResponse = {
  data: Category[];
};
