import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  Category,
  CategoryState,
  PaginatedCategory,
} from "../../types/Category";
import { QueryOptions } from "../../types/QueryOptions";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const URL = `${API_BASE_URL}/categories`;

const initialState: CategoryState = {
  categories: [],
  total: 0,
  loading: false,
  error: null,
};

//Queries
const createQueryString = (options: QueryOptions) => {
  const params = new URLSearchParams();
  params.append("page", options.page.toString());
  params.append("pageSize", options.pageSize.toString());
  params.append("sortBy", options.sortBy);
  params.append("sortOrder", options.sortOrder);
  return params.toString();
};

//Define thunk for fetching all categories
export const fetchAllCategories = createAsyncThunk(
  "fetchAllCategories",
  async (options: QueryOptions, { rejectWithValue }) => {
    try {
      const queryString = createQueryString(options);
      const response = await fetch(`${URL}?${queryString}`);
      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse);
      }
      const data: PaginatedCategory = await response.json();
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
          categories: action.payload.items,
          total: action.payload.totalCount,
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
