import { Category } from "./Category";

// Define type for an image object
export type Image = {
  id: string;
  productId: string;
  url: string;
};

//Define type for product data
export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  images: Image[];
  category: Category;
  inventory: number;
};

export interface PaginatedProducts {
  items: Product[];
  totalCount: number;
}

//Define initial state for products
export type ProductState = {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  favoriteProducts: Product[];
  filteredProducts: Product[];
};

//Define type for new product
export type NewProduct = {
  title: string;
  price: number;
  description: string;
  categoryId: string;
  images: Image[];
};

//Define type for form values of product create form component
export type FormValues = {
  title: string;
  price: number;
  description: string;
  categoryId: string;
  categoryName: string;
  images: Image[];
};

//Define type for formData in UploadProduct.tsx
export type FormDataValues = {
  [key: string]: string | number;
};

//Define type for update product
export type UpdateProduct = {
  id?: string;
  title?: string;
  price?: number;
  description?: string;
  images?: Image[];
  categoryId?: number;
};

//Define type for update data of product
export type ProductDataForUpdate = {
  id: string;
  data: {
    title?: string;
    price?: number;
    description?: string;
    categoryId?: number;
    [key: string]: unknown;
  };
  images?: { file: File }[];
};
