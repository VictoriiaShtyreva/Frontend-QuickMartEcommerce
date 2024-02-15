import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import {
  NewProduct,
  PaginationParams,
  Product,
  ProductDataForUpdate,
  ProductState,
  UpdateProduct,
} from "../../misc/types/Product";
import uploadFilesService from "../../utils/uploadFilesService";
import { RootState } from "../../misc/types/type";

const initialState: ProductState = {
  products: [],
  loading: false,
  error: "",
  pagination: {
    offset: 0,
    limit: 20,
  },
};

//Fetch data
const URL = "https://api.escuelajs.co/api/v1/products";

//Define thunk for fetching all products
export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async (paginationParams: PaginationParams) => {
    try {
      const response: AxiosResponse<Product[]> = await axios.get(URL, {
        params: paginationParams,
      });
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

//Define thunk for fetching single product
export const fetchProductById = createAsyncThunk(
  "fetchProductById",
  async (id: number) => {
    try {
      const response: AxiosResponse<Product[]> = await axios.get(
        `${URL}/${id}`
      );
      return { data: response.data, id };
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

//Define thunk for create product
export const createProduct = createAsyncThunk(
  "createProduct",
  async (newProduct: NewProduct) => {
    try {
      const response: AxiosResponse<Product[]> = await axios.post(
        URL,
        newProduct
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

//Define thunk for update product with function for uploading images if they exist in the update data.
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (newProps: ProductDataForUpdate) => {
    try {
      //Initialize with existing data
      let dataForUpdate: UpdateProduct = { ...newProps.data };
      if (newProps.images) {
        const fileData = await uploadFilesService(newProps.images);
        dataForUpdate = {
          ...newProps.data,
          images: fileData as string[],
        };
      } else {
        dataForUpdate = {
          ...newProps.data,
        };
      }
      // Make the PUT request to update the product
      const { data } = await axios.put<Product[]>(
        `${URL}/${newProps.id}`,
        dataForUpdate
      );
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

//Define thunk for delete product
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id: number) => {
    try {
      const response: AxiosResponse<Product[]> = await axios.delete(
        `${URL}/${id}`
      );
      return { data: response.data, id };
    } catch (e) {
      let error = e as AxiosError;
      return error;
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
    setPagination: (state, action: PayloadAction<PaginationParams>) => {
      state.pagination = action.payload;
    },
  },
  extraReducers(builder) {
    //Fetch All Products
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      //save data in Redux
      if (!(action.payload instanceof AxiosError)) {
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      }
    });
    //loading
    builder.addCase(fetchAllProducts.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    //error
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    //Fetch Product by ID
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        const { id } = action.payload;
        return {
          ...state,
          products: state.products.filter((product) => product.id !== id),
          loading: false,
        };
      }
    });
    builder.addCase(fetchProductById.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.loading = false;
        state.error = action.payload.message;
      }
    });
    //Create Product
    builder.addCase(createProduct.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      }
    });
    builder.addCase(createProduct.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    //Update Product
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        //The updated product is the first item in the array returned by the API.
        const product = action.payload[0];
        return {
          ...state,
          loading: false,
          products: state.products.map((item) =>
            item.id === product.id ? product : item
          ),
        };
      }
    });
    builder.addCase(updateProduct.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    //Delete Product
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        const { id } = action.payload;
        return {
          ...state,
          loading: false,
          products: state.products.filter((product) => product.id !== id),
        };
      }
    });
    builder.addCase(deleteProduct.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
  },
});

export const selectPagination = (state: RootState) => state.products.pagination;

const productReducer = productSlice.reducer;
export const { sortProductsByPrice, setPagination } = productSlice.actions;
export default productReducer;
