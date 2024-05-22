import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { CategoryState, PaginatedCategory } from "../../types/Category";
import { QueryOptions } from "../../types/QueryOptions";
import axios from "axios";

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
  "categories/fetchAll",
  async (options: QueryOptions, { rejectWithValue }) => {
    try {
      const queryString = createQueryString(options);
      const response = await axios.get(`${URL}?${queryString}`);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch categories"
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.items;
      state.total = action.payload.totalCount;
      state.error = null;
    });
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
