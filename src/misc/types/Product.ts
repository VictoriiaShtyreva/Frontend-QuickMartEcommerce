import { Category } from "./Category";

//Define type for product data
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt?: string;
  updatedAt?: string;
};

//Define types for pagination parameters
export type PaginationParams = {
  offset: number;
  limit: number;
};

//Define initial state for products
export type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: PaginationParams;
};

//Define type for new product
export type NewProduct = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};

//Define type for update product
export type UpdateProduct = {
  title?: string;
  price?: number;
  description?: string;
  images?: string[];
};

//Define type for update data of product
export type ProductDataForUpdate = {
  id: number;
  data: {
    title?: string;
    price?: number;
    description?: string;
    category?: number;
  };
  images?: { file: File }[];
};
