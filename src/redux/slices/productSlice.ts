import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  NewProduct,
  PaginatedProducts,
  Product,
  ProductDataForUpdate,
  ProductState,
  UpdateProduct,
} from "../../types/Product";
import { QueryOptions } from "../../types/QueryOptions";

const initialState: ProductState = {
  products: [],
  total: 0,
  loading: false,
  error: null,
  favoriteProducts: [],
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
      const response = await fetch(`${URL}?${queryString}`);
      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse);
      }
      //If there's no HTTP error, parse and return the response body.
      const data: PaginatedProducts = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

//Define thunk for fetching single product
export const fetchProductById = createAsyncThunk(
  "fetchProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/${id}`);
      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse);
      }
      //If there's no HTTP error, parse and return the response body.
      const data: Product = await response.json();
      return { data, id };
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

//Define thunk for create product
export const createProduct = createAsyncThunk(
  "createProduct",
  async (newProduct: NewProduct, { rejectWithValue }) => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse);
      }
      //If there's no HTTP error, parse and return the response body.
      const data: Product = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

//Define thunk for update product with function for uploading images if they exist in the update data.
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (newProps: ProductDataForUpdate, { rejectWithValue }) => {
    try {
      let dataForUpdate: UpdateProduct = { ...newProps.data };
      if (newProps.images) {
        dataForUpdate = {
          ...newProps.data,
        };
      }
      const response = await fetch(`${URL}/${newProps.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForUpdate),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse);
      }
      //If there's no HTTP error, parse and return the response body.
      const data: Product = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

//Define thunk for delete product
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse);
      }
      const data: boolean = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
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
        state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products.sort((a, b) => b.price - a.price);
      }
    },
    sortProductsByTitle: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.products.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        state.products.sort((a, b) => b.title.localeCompare(a.title));
      }
    },
    searchProductByName: (state, action: PayloadAction<string>) => {
      //Filter products based on the search input
      state.products = state.products.filter((product) =>
        product.title.toLowerCase().includes(action.payload.toLowerCase())
      );
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
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        products: state.products.filter((product) => product.id !== id),
        loading: false,
        error: null,
      };
    });
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
  },
});

const productReducer = productSlice.reducer;
export const {
  sortProductsByPrice,
  sortProductsByTitle,
  searchProductByName,
  addFavoriteProduct,
  removeFavoriteProduct,
} = productSlice.actions;
export default productReducer;
