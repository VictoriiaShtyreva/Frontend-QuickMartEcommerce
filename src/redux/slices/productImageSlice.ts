import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { ImageState } from "../../types/Product";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const URL = `${API_BASE_URL}/productImages`;

const initialState: ImageState = {
  images: [],
  loading: false,
  error: null,
};

// Async thunk for deleting images
export const deleteProductImage = createAsyncThunk(
  "productImages/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Image deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error("Failed to delete image");
      return rejectWithValue(error.response.data);
    }
  }
);

const productImageSlice = createSlice({
  name: "productImages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProductImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images = state.images.filter(
          (image) => image.id !== action.payload
        );
      })
      .addCase(deleteProductImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "error";
      });
  },
});

const productImageReducer = productImageSlice.reducer;
export default productImageReducer;
