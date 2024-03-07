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

//Define initial state for products
export type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
  favoriteProducts: Product[];
};

//Define type for new product
export type NewProduct = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};

//Define type for form values of product create form component
export type FormValues = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  categoryName: string;
  images: string[];
};

//Define type for formData in UploadProduct.tsx
export type FormDataValues = {
  [key: string]: string | number;
};

//Define type for update product
export type UpdateProduct = {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  images?: string[];
  categoryId?: number;
};

//Define type for update data of product
export type ProductDataForUpdate = {
  id: number;
  data: {
    title?: string;
    price?: number;
    description?: string;
    categoryId?: number;
    [key: string]: unknown;
  };
  images?: { file: File }[];
};
