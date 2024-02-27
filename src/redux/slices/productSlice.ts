import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  NewProduct,
  Product,
  ProductDataForUpdate,
  ProductState,
  UpdateProduct,
} from "../../types/Product";
import uploadFilesService from "../../utils/uploadFilesService";

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

//Fetch data
const URL = "https://api.escuelajs.co/api/v1/products";

//Define thunk for fetching all products
export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse);
      }
      //If there's no HTTP error, parse and return the response body.
      const data: Product[] = await response.json();
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
  async (id: number, { rejectWithValue }) => {
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
  async ({ id, ...newProps }: ProductDataForUpdate, { rejectWithValue }) => {
    try {
      let dataForUpdate: UpdateProduct = { ...newProps.data };
      if (newProps.images) {
        const fileData = await uploadFilesService(newProps.images);
        dataForUpdate = {
          ...newProps.data,
          images: fileData as string[],
        };
      }
      const response = await fetch(`${URL}/${id}`, {
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
  async (id: number, { rejectWithValue }) => {
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
    sortProductsByPrice: (state, action: PayloadAction<"desc" | "asc">) => {
      if (action.payload === "desc")
        state.products.sort((a, b) => b.price - a.price);
      if (action.payload === "asc")
        state.products.sort((a, b) => a.price - b.price);
    },
    searchProductByName: (state, action: PayloadAction<string>) => {
      // Filter products based on the search input
      state.products = state.products.filter((product) =>
        product.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers(builder) {
    //Fetch All Products
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      //save data in Redux
      return {
        ...state,
        products: action.payload,
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
export const { sortProductsByPrice, searchProductByName } =
  productSlice.actions;
export default productReducer;
