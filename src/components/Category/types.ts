export type Category = {
  name: string;
  id: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CategoriesResponse = {
  data: Category[];
};
