import { Category } from "./Category";

// Define type for an image object
export type Image = {
  id: string;
  productId: string;
  url: string;
};

export type ImageState = {
  images: Image[];
  loading: boolean;
  error: string | null;
};

//Define type for product data
export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  images: Image[];
  category: Category;
  categoryId: string;
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
  productDetails: { [key: string]: Product };
};

//Define type for new product
export type NewProduct = {
  title: string;
  price: number;
  description: string;
  categoryId: string;
  inventory: number;
  images: File[];
};

//Define type for form values of product create form component
export type FormValues = {
  title: string;
  price: number;
  description: string;
  inventory: number;
  categoryId: string;
  categoryName: string;
  images: File[];
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
  categoryId?: string;
};

//Define type for update data of product
export type ProductDataForUpdate = {
  id: string;
  data: {
    title?: string;
    description?: string;
    price?: number;
    categoryId?: string;
    inventory?: number;
  };
  images?: File[];
};
