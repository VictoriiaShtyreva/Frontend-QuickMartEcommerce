import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import {
  NewProduct,
  Product,
  ProductDataForUpdate,
  ProductState,
  UpdateProduct,
} from "../../misc/types/Product";
import uploadFilesService from "../../components/utils/uploadFilesService";

const initialState: ProductState = {
  products: [],
  loading: false,
  error: "",
};

//Fetch data
const URL = "https://api.escuelajs.co/api/v1/products";

//Define thunk for fetching all products
export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const response: AxiosResponse<Product[]> = await axios.get(URL);
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
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      return response.data;
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
        "https://api.escuelajs.co/api/v1/products",
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
        `https://api.escuelajs.co/api/v1/products/${newProps.id}`,
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
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      return response.data;
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
    //Create Product
    //Update Product
    //Delete Product
  },
});

const productReducer = productSlice.reducer;
export const { sortProductsByPrice } = productSlice.actions;
export default productReducer;
