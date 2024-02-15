import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { Category, CategoryState } from "../../types/Category";

//Fetch data
const urlCategories = "https://api.escuelajs.co/api/v1/categories";

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: "",
};

export const fetchAllCategories = createAsyncThunk(
  "fetchAllCategories",
  async () => {
    try {
      const response: AxiosResponse<Category[]> = await axios.get(
        urlCategories
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        if (!(action.payload instanceof AxiosError)) {
          return {
            ...state,
            categories: action.payload,
            loading: false,
          };
        }
      })
      .addCase(fetchAllCategories.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
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

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
