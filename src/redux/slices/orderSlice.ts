// src/redux/slices/orderSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { QueryOptions } from "../../types/QueryOptions";
import { Order, OrderCreateDto, OrderState } from "../../types/Order";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const URL = `${API_BASE_URL}/orders`;

const initialState: OrderState = {
  orders: [],
  total: 0,
  loading: false,
  error: null,
  filteredOrders: [],
};

// Utility function to create query string
const createQueryString = (options: QueryOptions) => {
  const params = new URLSearchParams();
  params.append("page", options.page.toString());
  params.append("pageSize", options.pageSize.toString());
  params.append("sortBy", options.sortBy);
  params.append("sortOrder", options.sortOrder);
  return params.toString();
};

// Define thunk for fetching all orders
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAll",
  async (options: QueryOptions, { rejectWithValue }) => {
    try {
      const queryString = createQueryString(options);
      const response = await axios.get(`${URL}?${queryString}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Define thunk for creating an order
export const createOrder = createAsyncThunk(
  "orders/create",
  async (orderCreateDto: OrderCreateDto, { rejectWithValue }) => {
    try {
      const response = await axios.post(URL, orderCreateDto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Order created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create order");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Define thunk for updating order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async (
    { orderId, status }: { orderId: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${URL}/${orderId}/status`,
        { newStatus: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update order status"
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

// Define thunk for deleting an order
export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (orderId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${URL}/${orderId}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return orderId;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete order");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Define thunk for canceling an order
export const cancelOrder = createAsyncThunk(
  "orders/cancel",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${URL}/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    sortOrdersByDate: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.filteredOrders.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else {
        state.filteredOrders.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    },
    sortOrdersByTotalPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.filteredOrders.sort((a, b) => a.totalPrice - b.totalPrice);
      } else {
        state.filteredOrders.sort((a, b) => b.totalPrice - a.totalPrice);
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch all orders
    builder.addCase(fetchAllOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchAllOrders.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.orders = action.payload.items;
        state.total = action.payload.totalCount;
        state.filteredOrders = action.payload.items;
        state.error = null;
      }
    );
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update order status
    builder.addCase(
      updateOrderStatus.fulfilled,
      (state, action: PayloadAction<Order>) => {
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
        state.filteredOrders = state.orders;
      }
    );

    // Delete order
    builder.addCase(
      deleteOrder.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
        state.filteredOrders = state.orders;
      }
    );

    // Create order
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      createOrder.fulfilled,
      (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.orders.push(action.payload);
        state.filteredOrders.push(action.payload);
        state.error = null;
      }
    );
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Cancel order
    builder.addCase(
      cancelOrder.fulfilled,
      (state, action: PayloadAction<Order>) => {
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
        state.filteredOrders = state.orders;
      }
    );
  },
});

const orderReducer = orderSlice.reducer;
export const { sortOrdersByDate, sortOrdersByTotalPrice } = orderSlice.actions;
export default orderReducer;
