//Define type for category of product data
export type Category = {
  id: string;
  name: string;
  image: string;
};

//Define type for category state
export type CategoryState = {
  categories: Category[];
  filteredCategories: Category[];
  total: number;
  loading: boolean;
  error: string | null;
};
export type NewCategory = {
  name: string;
  image?: File;
};

export type UpdateCategory = {
  name: string;
  image?: File;
};
