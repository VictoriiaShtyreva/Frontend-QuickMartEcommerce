//Define type for category of product data
export type Category = {
  id: string;
  name?: string;
  image?: string;
};

//Define type for category state
export type CategoryState = {
  categories: Category[];
  total: number;
  loading: boolean;
  error: string | null;
};

export interface PaginatedCategory {
  items: Category[];
  totalCount: number;
}
