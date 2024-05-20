import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { Category, CategoryState } from "../../types/Category";
import { API_BASE_URL } from "../../config/config";

//Fetch data
const urlCategories = `${API_BASE_URL}/categories`;

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

//Define thunk for fetching all categories
export const fetchAllCategories = createAsyncThunk(
  "fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(urlCategories);
      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse);
      }

      const data: Category[] = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
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
        return {
          ...state,
          categories: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchAllCategories.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message ?? "error",
        };
      });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
