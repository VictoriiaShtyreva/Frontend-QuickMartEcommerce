import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  NewProduct,
  Product,
  ProductDataForUpdate,
  ProductState,
} from "../../types/Product";
import { QueryOptions } from "../../types/QueryOptions";
import axios from "axios";

const initialState: ProductState = {
  products: [],
  product: null,
  total: 0,
  loading: false,
  error: null,
  favoriteProducts: [],
  filteredProducts: [],
  productDetails: {},
  mostPurchasedProducts: [],
};

const API_BASE_URL = process.env.REACT_APP_API_URL;
const URL = `${API_BASE_URL}/products`;

//Queries
const createQueryString = (options: QueryOptions) => {
  const params = new URLSearchParams();
  params.append("page", options.page.toString());
  params.append("pageSize", options.pageSize.toString());
  params.append("sortBy", options.sortBy);
  params.append("sortOrder", options.sortOrder);
  return params.toString();
};

//Define thunk for fetching all products
export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async (options: QueryOptions, { rejectWithValue }) => {
    try {
      const queryString = createQueryString(options);
      const response = await axios.get(`${URL}?${queryString}`);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed to fetch products");
      return rejectWithValue(error.response.data);
    }
  }
);

//Define thunk for fetching single product
export const fetchProductById = createAsyncThunk(
  "fetchProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/${id}`);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

//Define thunk for create product
export const createProduct = createAsyncThunk(
  "createProduct",
  async (newProduct: NewProduct, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", newProduct.title);
      formData.append("price", newProduct.price.toString());
      formData.append("categoryId", newProduct.categoryId);
      formData.append("description", newProduct.description);
      formData.append("inventory", newProduct.inventory.toString());
      newProduct.images.forEach((image) => {
        formData.append("Images", image);
      });

      const response = await axios.post(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

//Define thunk for update product with function for uploading images if they exist in the update data.
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (newProps: ProductDataForUpdate, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      if (newProps.data.title) formData.append("Title", newProps.data.title);
      if (newProps.data.price)
        formData.append("Price", newProps.data.price.toString());
      if (newProps.data.categoryId)
        formData.append("CategoryId", newProps.data.categoryId.toString());
      if (newProps.data.inventory)
        formData.append("Inventory", newProps.data.inventory.toString());
      if (newProps.images) {
        newProps.images.forEach((image) => {
          formData.append("Images", image);
        });
      }
      const response = await axios.patch(`${URL}/${newProps.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

//Define thunk for delete product
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

//Define thunk for mostpurchased
export const fetchMostPurchasedProducts = createAsyncThunk(
  "products/fetchMostPurchased",
  async (topNumber: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/most-purchased?topNumber=${topNumber}`
      );
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response.data.message || "Failed to fetch most purchased products"
      );
      return rejectWithValue(error.response.data);
    }
  }
);

//Define slice for products
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortProductsByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.filteredProducts.sort((a, b) => a.price - b.price);
      } else {
        state.filteredProducts.sort((a, b) => b.price - a.price);
      }
    },
    sortProductsByTitle: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        state.filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
      }
    },
    filterProductsByCategory: (state, action: PayloadAction<string>) => {
      if (action.payload === "All") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (product) => product.category.name === action.payload
        );
      }
    },
    searchProductByName: (state, action: PayloadAction<string>) => {
      const searchQuery = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery)
      );
    },
    clearSearch: (state) => {
      state.filteredProducts = state.products;
    },
    addFavoriteProduct: (
      state: ProductState,
      action: PayloadAction<Product>
    ) => {
      const { id } = action.payload;
      //Check if the product is not already in favoriteProducts
      if (!state.favoriteProducts.some((product) => product.id === id)) {
        state.favoriteProducts.push(action.payload);
        toast.success("Product added to favorites.");
        return state;
      } else {
        //Product already exists in favoriteProducts
        toast.warning("This product is already in your favorites!");
        return state;
      }
    },
    removeFavoriteProduct: (state, action: PayloadAction<string>) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (product) => product.id !== action.payload
      );
      toast.success("Product remove from favorites.");
    },
  },
  extraReducers(builder) {
    //Fetch All Products
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      //save data in Redux
      return {
        ...state,
        products: action.payload.items,
        filteredProducts: action.payload.items,
        total: action.payload.totalCount,
        loading: false,
        error: null,
      };
    });
    //loading
    builder.addCase(fetchAllProducts.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    //error
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    //Fetch Product by ID
    builder.addCase(
      fetchProductById.fulfilled,
      (state, action: PayloadAction<Product>) => {
        const product = action.payload;
        state.productDetails[product.id] = product;
        state.loading = false;
        state.error = null;
        state.product = product;
      }
    );
    builder.addCase(fetchProductById.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    //Create Product
    builder.addCase(createProduct.fulfilled, (state, action) => {
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
        error: null,
      };
    });
    builder.addCase(createProduct.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    //Update Product
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const product = action.payload;
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === product.id ? product : item
        ),
        loading: false,
        error: null,
      };
    });
    builder.addCase(updateProduct.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    //Delete Product
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const success = action.payload;
      if (success === true) {
        return {
          ...state,
          //Filter out the product with the specified id
          products: state.products.filter(
            (product) => product.id !== action.meta.arg
          ),
          loading: false,
          error: null,
        };
      }
    });
    builder.addCase(deleteProduct.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    // Handle fetchMostPurchasedProducts
    builder.addCase(fetchMostPurchasedProducts.fulfilled, (state, action) => {
      state.mostPurchasedProducts = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchMostPurchasedProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMostPurchasedProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "error";
    });
  },
});

const productReducer = productSlice.reducer;
export const {
  sortProductsByPrice,
  sortProductsByTitle,
  filterProductsByCategory,
  searchProductByName,
  clearSearch,
  addFavoriteProduct,
  removeFavoriteProduct,
} = productSlice.actions;
export default productReducer;
