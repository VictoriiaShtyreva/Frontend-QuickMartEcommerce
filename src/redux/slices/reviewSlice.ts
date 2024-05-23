import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { QueryOptions } from "../../types/QueryOptions";
import { Review, ReviewState, ReviewCreate } from "../../types/Review";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const URL = `${API_BASE_URL}/reviews`;

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
  total: 0,
};

const createQueryString = (options: QueryOptions) => {
  const params = new URLSearchParams();
  params.append("page", options.page.toString());
  params.append("pageSize", options.pageSize.toString());
  params.append("sortBy", options.sortBy);
  params.append("sortOrder", options.sortOrder);
  return params.toString();
};

// Fetch all reviews
export const fetchAllReviews = createAsyncThunk(
  "reviews/fetchAll",
  async (options: QueryOptions, { rejectWithValue }) => {
    try {
      const queryString = createQueryString(options);
      const response = await axios.get(`${URL}?${queryString}`);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch reviews");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Fetch reviews by product ID
export const fetchReviewsByProductId = createAsyncThunk(
  "reviews/fetchByProductId",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/products/${productId}`);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch reviews by product ID"
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

// Fetch reviews by user ID
export const fetchReviewsByUserId = createAsyncThunk(
  "reviews/fetchByUserId",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/users/${userId}`);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch reviews by user ID"
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

// Create a review
export const createReview = createAsyncThunk(
  "reviews/create",
  async (reviewData: ReviewCreate, { rejectWithValue }) => {
    try {
      const response = await axios.post(URL, reviewData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create review");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Define thunk for updating a review
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async (
    {
      id,
      userId,
      rating,
      content,
    }: { id: string; userId: string; rating: number; content: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${URL}/${id}`,
        { userId, rating, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed to update review");
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a review
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (reviewId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${URL}/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return reviewId;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete review");
      return rejectWithValue(error.response?.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    sortReviewsByDate: (state, action: PayloadAction<"asc" | "desc">) => {
      state.reviews = state.reviews.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return action.payload === "asc" ? dateA - dateB : dateB - dateA;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.items;
        state.total = action.payload.totalCount;
      })
      .addCase(fetchAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchReviewsByProductId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchReviewsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviewsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        toast.success("Review created successfully");
      })
      .addCase(
        updateReview.fulfilled,
        (state, action: PayloadAction<Review>) => {
          state.loading = false;
          const index = state.reviews.findIndex(
            (review) => review.id === action.payload.id
          );
          if (index !== -1) {
            state.reviews[index] = action.payload;
          }
          toast.success("Review updated successfully");
        }
      )
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload
        );
        toast.success("Review deleted successfully");
      });
  },
});

const reviewReducer = reviewSlice.reducer;
export const { sortReviewsByDate } = reviewSlice.actions;
export default reviewReducer;
