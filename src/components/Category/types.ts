export type Category = {
  name: string;
  photo?: string;
  id: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CategoriesResponse = {
  data: Category[];
};
