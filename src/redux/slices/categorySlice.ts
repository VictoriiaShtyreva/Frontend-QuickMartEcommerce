import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  CategoryState,
  NewCategory,
  UpdateCategory,
} from "../../types/Category";
import { QueryOptions } from "../../types/QueryOptions";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const URL = `${API_BASE_URL}/categories`;

const initialState: CategoryState = {
  categories: [],
  total: 0,
  loading: false,
  error: null,
  filteredCategories: [],
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

// Define thunk for creating a category
export const createCategory = createAsyncThunk(
  "categories/create",
  async (newCategory: NewCategory, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", newCategory.name);
      if (newCategory.image) {
        formData.append("image", newCategory.image);
      }
      const response = await axios.post(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create category");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Define thunk for updating a category
export const updateCategory = createAsyncThunk(
  "categories/update",
  async (
    { id, updateData }: { id: string; updateData: UpdateCategory },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      if (updateData.name) formData.append("name", updateData.name);
      if (updateData.image) {
        formData.append("image", updateData.image);
      }
      const response = await axios.patch(`${URL}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update category");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Define thunk for deleting a category
export const deleteCategory = createAsyncThunk(
  "categories/delete",
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
      toast.error(error.response?.data?.message || "Failed to delete category");
      return rejectWithValue(error.response?.data);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    sortCategoryByName: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.filteredCategories.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        state.filteredCategories.sort((a, b) => b.name.localeCompare(a.name));
      }
    },
    searchCategoryByName: (state, action: PayloadAction<string>) => {
      const searchQuery = action.payload.toLowerCase();
      state.filteredCategories = state.categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery)
      );
    },
    clearCategorySearch: (state) => {
      state.filteredCategories = state.categories;
    },
  },
  extraReducers: (builder) => {
    //Fetch all categories
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.items;
      state.filteredCategories = action.payload.items;
      state.total = action.payload.totalCount;
      state.error = null;
    });
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //Create a category
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
      state.filteredCategories.push(action.payload);
      state.error = null;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    //Update a category
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
        state.filteredCategories[index] = action.payload;
        state.error = null;
      }
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    //Delete a category
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
      state.filteredCategories = state.filteredCategories.filter(
        (category) => category.id !== action.payload
      );
      state.error = null;
    });
  },
});

const categoryReducer = categorySlice.reducer;
export const { sortCategoryByName, searchCategoryByName, clearCategorySearch } =
  categorySlice.actions;
export default categoryReducer;
